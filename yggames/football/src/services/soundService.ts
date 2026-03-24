import { Audio } from "expo-av";

export type SoundKey =
  | "ball_bounce"
  | "goal_scored"
  | "whistle_start"
  | "whistle_end"
  | "red_card"
  | "button_tap"
  | "crowd_ambient";

type SoundMap = Partial<Record<SoundKey, Audio.Sound>>;

const SOUND_FILES: Record<SoundKey, number> = {
  ball_bounce: require("@/assets/sounds/ball_bounce.wav"),
  goal_scored: require("@/assets/sounds/goal_scored.mp3"),
  whistle_start: require("@/assets/sounds/whistle_start.mp3"),
  // KNOWN LIMITATION (BUG-5): whistle_end.wav is ~14 MB uncompressed WAV.
  // Should be re-encoded to whistle_end.mp3 targeting ~100 KB (e.g. ffmpeg -i whistle_end.wav -b:a 64k whistle_end.mp3).
  // ffmpeg not available in current build environment — replace asset manually.
  whistle_end: require("@/assets/sounds/whistle_end.wav"),
  red_card: require("@/assets/sounds/button_tap.mp3"),
  button_tap: require("@/assets/sounds/button_tap.mp3"),
  // No dedicated crowd_ambient asset — using button_tap as a silent placeholder until real asset is added.
  crowd_ambient: require("@/assets/sounds/button_tap.mp3"),
};

const BALL_BOUNCE_THROTTLE_MS = 100;

class SoundService {
  private sounds: SoundMap = {};
  private lastBallBounceAt = 0;

  async preload(): Promise<void> {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    await Promise.all(
      (Object.entries(SOUND_FILES) as [SoundKey, number][]).map(
        async ([key, file]) => {
          try {
            const { sound } = await Audio.Sound.createAsync(file, {
              shouldPlay: false,
            });
            this.sounds[key] = sound;
          } catch {
            // Sound file missing — silently skip (placeholder assets)
          }
        },
      ),
    );
  }

  async play(key: SoundKey, enabled: boolean): Promise<void> {
    if (!enabled) return;

    if (key === "ball_bounce") {
      const now = Date.now();
      if (now - this.lastBallBounceAt < BALL_BOUNCE_THROTTLE_MS) return;
      this.lastBallBounceAt = now;
    }

    const sound = this.sounds[key];
    if (!sound) return;

    try {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch {
      // Playback error — ignore
    }
  }

  async startAmbient(enabled: boolean): Promise<void> {
    if (!enabled) return;
    const sound = this.sounds.crowd_ambient;
    // If the ambient sound resolves to the same asset as goal_scored, skip playback
    // to avoid the goal celebration sound playing on loop as ambient.
    if (!sound || SOUND_FILES.crowd_ambient === SOUND_FILES.goal_scored) return;
    try {
      await sound.setIsLoopingAsync(true);
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch {
      // ignore
    }
  }

  async preloadOne(key: SoundKey): Promise<void> {
    if (this.sounds[key]) return;
    const file = SOUND_FILES[key];
    try {
      const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: false });
      this.sounds[key] = sound;
    } catch {
      // Sound file missing — silently skip
    }
  }

  async stopAmbient(): Promise<void> {
    const sound = this.sounds.crowd_ambient;
    if (!sound) return;
    try {
      await sound.stopAsync();
    } catch {
      // ignore
    }
  }

  async unload(): Promise<void> {
    await Promise.all(
      Object.values(this.sounds).map((s) => s?.unloadAsync().catch(() => null)),
    );
    this.sounds = {};
  }
}

export const soundService = new SoundService();
