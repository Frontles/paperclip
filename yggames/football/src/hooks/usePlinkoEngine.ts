import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { GameConfig } from "@/constants/gameConfig";

// ─── Config ───────────────────────────────────────────────────
// Not: gameConfig'i değiştirince görmek için bu dosyayı da kaydet veya uygulamayı yeniden başlat
const GOAL_H = 40;
const BR = GameConfig.ballRadius;
const PR = GameConfig.pegRadius;
const G = GameConfig.gravity;
const DAMP = GameConfig.bounceDamping;
const RAND = GameConfig.ballBounceRandomness;
const POST_W = GameConfig.postWidth;
const GOAL_W_PCT = GameConfig.goalWidthPercent;
const DZ_TOP = GameConfig.dropZoneTop;
const DZ_R_FRAC = GameConfig.dropZoneRadiusFraction;
const DZ_GAP = GameConfig.dropZoneGapBalls;

// ─── Types ────────────────────────────────────────────────────
export interface PegPosition {
  x: number;
  y: number;
}
export interface GoalZoneBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface BallRenderState {
  x: number;
  y: number;
  color: string;
  badge?: string | null;
}
interface V2 {
  x: number;
  y: number;
  vx: number;
  vy: number;
  inDropZone: boolean;
}

export interface UsePlinkoEngineOptions {
  canvasWidth: number;
  canvasHeight: number;
  homeColor: string;
  awayColor: string;
  homeTeamName: string;
  awayTeamName: string;
  homeBadge?: string | null;
  awayBadge?: string | null;
  onGoal: (teamName: string) => void;
  onBallBounce?: () => void;
  isRunning: boolean;
}

export interface PlinkoEngineResult {
  balls: BallRenderState[];
  pegs: PegPosition[];
  goalZone: GoalZoneBounds;
  resetBalls: () => void;
}

// ─── Yardımcı Fonksiyonlar ─────────────────────────────────────
function dz(w: number) {
  const r = w * DZ_R_FRAC;
  const gap = Math.asin(Math.min((DZ_GAP * BR * 2) / (2 * r), 0.99));
  return { cx: w / 2, cy: DZ_TOP, r, gap };
}

function makePegs(w: number, h: number): PegPosition[] {
  const out: PegPosition[] = [];
  const pad = PR + 4;

  // Satırlar: 2,3,4,5,6,5,4 — aşağıdan yukarıya yerleştirilir
  // En alttaki 4'lü satır kalenin hemen önünde
  const rows = [2, 3, 4, 5, 6, 5, 4];
  const maxN = 6; // 6'lı satır tam genişlik kaplayacak

  // Alt sınır: kalenin hemen üstü (4'lünün iki dış peg'i kale kenarına yakın)
  const bot = h - GOAL_H - PR - 6;
  // Satırlar arası Y mesafesi
  const dy = (BR + PR) * 2.8;
  // Üst sınır: en alttaki satırdan yukarı doğru hesapla
  // rows.length - 1 = 6 satır aralığı

  for (let ri = 0; ri < rows.length; ri++) {
    const n = rows[ri];
    // Aşağıdan yukarıya: son satır (index 6) bot'ta, ilk satır (index 0) en yukarda
    const y = bot - (rows.length - 1 - ri) * dy;
    const extraPad = n === 5 ? BR * 0.5 : 0;
    const rw = (w - (pad + extraPad) * 2) * (n / maxN);
    const sx = (w - rw) / 2;
    const g = n > 1 ? rw / (n - 1) : 0;
    for (let c = 0; c < n; c++) {
      out.push({ x: n > 1 ? sx + c * g : w / 2, y });
    }
  }

  return out;
}

function newBall(w: number, side: "home" | "away"): V2 {
  const d = dz(w);
  const offset = d.r * 0.35;
  return {
    x: side === "home" ? d.cx - offset : d.cx + offset,
    y: d.cy,
    vx: (Math.random() - 0.5) * 2,
    vy: 0,
    inDropZone: true,
  };
}

// ─── FİZİK MOTORU ──────────────────────────────────────────────
function resolveStaticCollision(
  b: V2,
  cx: number,
  cy: number,
  radius: number,
): boolean {
  const dx = b.x - cx;
  const dy = b.y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist >= radius || dist === 0) return false;

  const overlap = radius - dist + 1.5; // buffer to prevent re-entry next frame
  const nx = dx / dist;
  const ny = dy / dist;

  b.x += nx * overlap;
  b.y += ny * overlap;

  const vn = b.vx * nx + b.vy * ny;
  if (vn < 0) {
    b.vx -= (1 + DAMP) * vn * nx;
    b.vy -= (1 + DAMP) * vn * ny;
  }
  return true;
}

function resolveDynamicCollision(b1: V2, b2: V2, radius: number): boolean {
  const dx = b1.x - b2.x;
  const dy = b1.y - b2.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist >= radius || dist === 0) return false;

  const overlap = radius - dist;
  const nx = dx / dist;
  const ny = dy / dist;

  b1.x += nx * (overlap / 2);
  b1.y += ny * (overlap / 2);
  b2.x -= nx * (overlap / 2);
  b2.y -= ny * (overlap / 2);

  const rvx = b1.vx - b2.vx;
  const rvy = b1.vy - b2.vy;
  const velAlongNormal = rvx * nx + rvy * ny;

  if (velAlongNormal > 0) return false;

  const j = -(1 + DAMP) * velAlongNormal;
  const impulse = j / 2;

  b1.vx += impulse * nx;
  b1.vy += impulse * ny;
  b2.vx -= impulse * nx;
  b2.vy -= impulse * ny;

  return true;
}

function resolveDropZoneInnerWall(
  b: V2,
  dzp: ReturnType<typeof dz>,
  radius: number,
) {
  if (!b.inDropZone) return;

  const dx = b.x - dzp.cx;
  const dy = b.y - dzp.cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist + radius > dzp.r && dist > 0.01) {
    const ang = Math.atan2(dy, dx);
    const hp = Math.PI / 2;

    if (ang > hp - dzp.gap && ang < hp + dzp.gap) {
      if (dist > dzp.r) {
        b.inDropZone = false;
      }
    } else {
      const nx = dx / dist;
      const ny = dy / dist;
      b.x = dzp.cx + nx * (dzp.r - radius - 1.5);
      b.y = dzp.cy + ny * (dzp.r - radius - 1.5);

      const vn = b.vx * nx + b.vy * ny;
      if (vn > 0) {
        b.vx -= (1 + DAMP) * vn * nx;
        b.vy -= (1 + DAMP) * vn * ny;
      }
    }
  }
}

// ─── Hook ─────────────────────────────────────────────────────
export function usePlinkoEngine({
  canvasWidth: W,
  canvasHeight: H,
  homeColor,
  awayColor,
  homeTeamName,
  awayTeamName,
  homeBadge,
  awayBadge,
  onGoal,
  onBallBounce,
  isRunning,
}: UsePlinkoEngineOptions): PlinkoEngineResult {
  const pegs = useMemo(() => (W > 0 && H > 0 ? makePegs(W, H) : []), [W, H]);

  const goal = useMemo<GoalZoneBounds>(() => {
    // KALE %5 KÜÇÜLTÜLDÜ (0.95 çarpanı eklendi)
    const gw = W * GOAL_W_PCT * 0.95;
    return { x: (W - gw) / 2, y: H - GOAL_H, width: gw, height: GOAL_H };
  }, [W, H]);

  const ballsRef = useRef<[V2, V2]>([
    { x: -100, y: -100, vx: 0, vy: 0, inDropZone: true },
    { x: -100, y: -100, vx: 0, vy: 0, inDropZone: true },
  ]);

  const cbs = useRef({
    onGoal,
    onBallBounce,
    teams: [homeTeamName, awayTeamName],
  });
  cbs.current = { onGoal, onBallBounce, teams: [homeTeamName, awayTeamName] };

  const [renderBalls, setRenderBalls] = useState<
    [BallRenderState, BallRenderState]
  >([
    { x: -100, y: -100, color: homeColor },
    { x: -100, y: -100, color: awayColor },
  ]);

  useEffect(() => {
    if (W > 0 && H > 0) {
      ballsRef.current[0] = newBall(W, "home");
      ballsRef.current[1] = newBall(W, "away");
    }
  }, [W, H]);

  const updatePhysics = useCallback(() => {
    if (W <= 0 || H <= 0) return;

    const dzp = dz(W);
    const sides: ("home" | "away")[] = ["home", "away"];

    // KALE DİREKLERİNİN X KOORDİNATLARI
    const leftPostX = goal.x + POST_W;
    const rightPostX = goal.x + goal.width - POST_W;

    ballsRef.current.forEach((b, i) => {
      // 1. Yerçekimi & Hareket
      b.vy += G;
      b.x += b.vx;
      b.y += b.vy;

      // 2. Halka İçi
      resolveDropZoneInnerWall(b, dzp, BR);

      // 3. Yan Duvarlar
      if (b.x < BR) {
        b.x = BR;
        b.vx = Math.abs(b.vx) * DAMP;
      }
      if (b.x > W - BR) {
        b.x = W - BR;
        b.vx = -Math.abs(b.vx) * DAMP;
      }

      // 4. Çiviler ve KALE DİREKLERİ ile Çarpışma
      let hitPeg = false;

      // Normal çiviler
      pegs.forEach((peg) => {
        if (resolveStaticCollision(b, peg.x, peg.y, BR + PR)) hitPeg = true;
      });

      // Kale direkleri (Çivi gibi sekmeleri için fizik motoruna dahil ettik)
      if (resolveStaticCollision(b, leftPostX, goal.y, BR + POST_W / 2))
        hitPeg = true;
      if (resolveStaticCollision(b, rightPostX, goal.y, BR + POST_W / 2))
        hitPeg = true;

      if (hitPeg && cbs.current.onBallBounce) cbs.current.onBallBounce();

      // 5. Gol & Korner Kontrolü
      if (b.y + BR >= goal.y) {
        if (b.x > leftPostX && b.x < rightPostX && b.vy > 0) {
          // Top direklerin arasından, yukarıdan aşağıya geçiyor
          if (b.y - BR > goal.y) {
            // Topun tamamı kale çizgisini geçti → GOL!
            cbs.current.onGoal(cbs.current.teams[i]);
            ballsRef.current[0] = newBall(W, "home");
            ballsRef.current[1] = newBall(W, "away");
          }
        } else if (b.x < goal.x || b.x > goal.x + goal.width) {
          // Saha dışı (korner bölgesi) — kale genişliğinin dışında
          // Top kale çizgisinin altına düşerse respawn
          if (b.y > goal.y + BR) {
            ballsRef.current[i] = newBall(W, sides[i]);
          }
        }
      }

      // 6. Sınır Dışına Düşme
      if (b.y > H + BR * 2) {
        ballsRef.current[i] = newBall(W, sides[i]);
      }

      // 7. Sıkışmayı önleme
      if (Math.abs(b.vx) < 0.02 && Math.abs(b.vy) < 0.02) b.vy = 0.3;
    });

    // 8. Topların birbiriyle çarpışması
    const [b1, b2] = ballsRef.current;
    if (resolveDynamicCollision(b1, b2, BR * 2)) {
      if (cbs.current.onBallBounce) cbs.current.onBallBounce();
    }

    setRenderBalls([
      {
        x: ballsRef.current[0].x,
        y: ballsRef.current[0].y,
        color: homeColor,
        badge: homeBadge,
      },
      {
        x: ballsRef.current[1].x,
        y: ballsRef.current[1].y,
        color: awayColor,
        badge: awayBadge,
      },
    ]);
  }, [W, H, pegs, goal, homeColor, awayColor, homeBadge, awayBadge]);

  // Fizik loop — 60fps via setInterval(16ms)
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(updatePhysics, 16);
    return () => clearInterval(id);
  }, [isRunning, updatePhysics]);

  // Topları dropzone'a resetle (devre arası vs için)
  const resetBalls = useCallback(() => {
    if (W <= 0) return;
    ballsRef.current[0] = newBall(W, "home");
    ballsRef.current[1] = newBall(W, "away");
  }, [W]);

  return { balls: renderBalls, pegs, goalZone: goal, resetBalls };
}
