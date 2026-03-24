import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { useMatchStore } from '@/stores/matchStore';
import { useSettingsStore } from '@/stores/settingsStore';
import {
  useSquadStore,
  FORMATIONS,
  FORMATION_POSITIONS,
  autoPick11,
  type Formation,
} from '@/stores/squadStore';
import { useI18n } from '@/hooks/useI18n';
import { useSound } from '@/hooks/useSound';
import type { Player, Team, PositionGroup } from '@/types/index';

const { width: SCREEN_W } = Dimensions.get('window');
const PITCH_W = SCREEN_W - 40;
const PITCH_H = PITCH_W * 1.3;

const DURATION_OPTIONS = [30, 45, 60, 75, 90, 105, 120] as const;

// ─── Helpers ─────────────────────────────────────────────────

function posGroupColor(g: string): string {
  switch (g) {
    case 'GK': return '#F59E0B';
    case 'DEF': return '#3B82F6';
    case 'MID': return '#10B981';
    case 'FWD': return '#EF4444';
    default: return '#888';
  }
}

function posGroupLabel(g: string): string {
  switch (g) {
    case 'GK': return 'GK';
    case 'DEF': return 'DEF';
    case 'MID': return 'MID';
    case 'FWD': return 'FWD';
    default: return g;
  }
}

// ─── Player Picker Modal ─────────────────────────────────────

interface PickerProps {
  visible: boolean;
  slotIndex: number;
  slotGroup: PositionGroup;
  players: Player[];
  currentPlayerId: number | null;
  assignedIds: Set<number>;
  onSelect: (player: Player) => void;
  onClose: () => void;
}

function PlayerPickerModal({
  visible,
  slotIndex,
  slotGroup,
  players,
  currentPlayerId,
  assignedIds,
  onSelect,
  onClose,
}: PickerProps) {
  // Show players matching position group first, then others
  const sorted = useMemo(() => {
    const matching = players
      .filter(p => p.positionGroup === slotGroup)
      .sort((a, b) => b.stats.overall - a.stats.overall);
    const others = players
      .filter(p => p.positionGroup !== slotGroup)
      .sort((a, b) => b.stats.overall - a.stats.overall);
    return [...matching, ...others];
  }, [players, slotGroup]);

  const renderItem = useCallback(({ item: p }: { item: Player }) => {
    const isCurrent = p.id === currentPlayerId;
    const isUsed = assignedIds.has(p.id) && !isCurrent;
    const isMatch = p.positionGroup === slotGroup;

    return (
      <TouchableOpacity
        style={[
          pickerStyles.row,
          isCurrent && pickerStyles.rowCurrent,
          isUsed && pickerStyles.rowUsed,
        ]}
        onPress={() => !isUsed && onSelect(p)}
        activeOpacity={isUsed ? 1 : 0.7}
        disabled={isUsed}
      >
        {/* Position badge */}
        <View style={[pickerStyles.posBadge, { backgroundColor: posGroupColor(p.positionGroup) }, !isMatch && pickerStyles.posBadgeOff]}>
          <Text style={pickerStyles.posText}>{p.position}</Text>
        </View>

        {/* Info */}
        <View style={pickerStyles.info}>
          <Text style={[pickerStyles.name, isUsed && pickerStyles.nameUsed]} numberOfLines={1}>
            {p.name}
          </Text>
          <View style={pickerStyles.metaRow}>
            <Text style={pickerStyles.meta}>{p.nation}</Text>
            <Text style={pickerStyles.metaDot}>·</Text>
            <Text style={pickerStyles.meta}>{p.age}</Text>
          </View>
        </View>

        {/* OVR */}
        <Text style={[pickerStyles.ovr, isUsed && pickerStyles.ovrUsed]}>{p.stats.overall}</Text>

        {/* Status */}
        {isCurrent ? (
          <View style={pickerStyles.currentBadge}>
            <Text style={pickerStyles.currentText}>✓</Text>
          </View>
        ) : isUsed ? (
          <View style={pickerStyles.usedBadge}>
            <Text style={pickerStyles.usedText}>XI</Text>
          </View>
        ) : (
          <View style={pickerStyles.selectBadge}>
            <Text style={pickerStyles.selectText}>+</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }, [currentPlayerId, assignedIds, slotGroup, onSelect]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={pickerStyles.overlay}>
        <Animated.View entering={FadeInUp.duration(300)} style={pickerStyles.sheet}>
          {/* Handle */}
          <View style={pickerStyles.handle} />

          {/* Header */}
          <View style={pickerStyles.header}>
            <View style={[pickerStyles.headerBadge, { backgroundColor: posGroupColor(slotGroup) }]}>
              <Text style={pickerStyles.headerBadgeText}>{posGroupLabel(slotGroup)}</Text>
            </View>
            <Text style={pickerStyles.headerTitle}>{slotGroup === 'GK' ? 'Goalkeeper' : `${posGroupLabel(slotGroup)} Position`}</Text>
            <TouchableOpacity onPress={onClose} style={pickerStyles.closeBtn} activeOpacity={0.7}>
              <Text style={pickerStyles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Recommended label */}
          <Text style={pickerStyles.recLabel}>
            {slotGroup === 'GK' ? 'GOALKEEPERS' : `RECOMMENDED — ${posGroupLabel(slotGroup)}`}
          </Text>

          {/* List */}
          <FlatList
            data={sorted}
            keyExtractor={p => String(p.id)}
            renderItem={renderItem}
            contentContainerStyle={pickerStyles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={pickerStyles.separator} />}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0f2a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(125,206,160,0.15)',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(125,206,160,0.3)',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  headerBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  headerBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
  headerTitle: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  recLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  separator: {
    height: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    gap: 10,
  },
  rowCurrent: {
    backgroundColor: 'rgba(125,206,160,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.3)',
  },
  rowUsed: {
    opacity: 0.35,
  },
  posBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    minWidth: 36,
    alignItems: 'center',
  },
  posBadgeOff: {
    opacity: 0.5,
  },
  posText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  nameUsed: {
    color: Colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  meta: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  metaDot: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  ovr: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '900',
    width: 32,
    textAlign: 'center',
  },
  ovrUsed: {
    color: Colors.textMuted,
  },
  currentBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentText: {
    color: '#0d2818',
    fontSize: 13,
    fontWeight: '900',
  },
  usedBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usedText: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
  },
  selectBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: 'rgba(125,206,160,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

// ─── Mini Pitch (Tappable) ───────────────────────────────────

function InteractivePitch({
  formation,
  slotPlayers,
  teamColor,
  onSlotPress,
}: {
  formation: Formation;
  slotPlayers: (Player | null)[];
  teamColor: string;
  onSlotPress: (slotIndex: number) => void;
}) {
  const positions = FORMATION_POSITIONS[formation];

  return (
    <View style={[pitchStyles.pitch, { width: PITCH_W, height: PITCH_H }]}>
      {/* Pitch markings */}
      <View style={pitchStyles.centerLine} />
      <View style={pitchStyles.centerCircle} />
      <View style={pitchStyles.penaltyBoxTop} />
      <View style={pitchStyles.penaltyBoxBottom} />
      <View style={pitchStyles.goalTop} />
      <View style={pitchStyles.goalBottom} />

      {positions.map((pos, i) => {
        const player = slotPlayers[i];
        const isEmpty = !player;
        const dotSize = 42;
        const bgColor = isEmpty
          ? 'rgba(255,255,255,0.08)'
          : pos.group === 'GK'
            ? '#F59E0B'
            : teamColor;

        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => onSlotPress(i)}
            style={[
              pitchStyles.slotTouch,
              {
                width: dotSize + 20,
                height: dotSize + 18,
                left: (pos.x / 100) * PITCH_W - (dotSize + 20) / 2,
                top: (pos.y / 100) * PITCH_H - (dotSize + 18) / 2,
              },
            ]}
          >
            <Animated.View
              entering={FadeIn.delay(i * 30).duration(250)}
              style={[
                pitchStyles.playerDot,
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: bgColor,
                  borderColor: isEmpty ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.35)',
                  borderStyle: isEmpty ? 'dashed' : 'solid',
                },
              ]}
            >
              {isEmpty ? (
                <Text style={pitchStyles.emptyPlus}>+</Text>
              ) : (
                <Text style={pitchStyles.playerOvr}>{player.stats.overall}</Text>
              )}
            </Animated.View>
            <Text style={pitchStyles.playerName} numberOfLines={1}>
              {isEmpty ? posGroupLabel(pos.group) : player.name.split(' ').pop()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const pitchStyles = StyleSheet.create({
  pitch: {
    backgroundColor: 'rgba(30, 100, 50, 0.45)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(125,206,160,0.2)',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 56,
    height: 56,
    borderRadius: 28,
    marginLeft: -28,
    marginTop: -28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  penaltyBoxTop: {
    position: 'absolute',
    top: 0,
    left: '25%',
    width: '50%',
    height: '13%',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  penaltyBoxBottom: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    width: '50%',
    height: '13%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  goalTop: {
    position: 'absolute',
    top: 0,
    left: '38%',
    width: '24%',
    height: '4%',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  goalBottom: {
    position: 'absolute',
    bottom: 0,
    left: '38%',
    width: '24%',
    height: '4%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  slotTouch: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerDot: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 2,
  },
  emptyPlus: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 20,
    fontWeight: '300',
  },
  playerOvr: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  playerName: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
    width: 62,
    textAlign: 'center',
  },
});

// ─── Tab Button ──────────────────────────────────────────────

function TabButton({
  label,
  active,
  onPress,
  badge,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  badge?: string | null;
}) {
  return (
    <TouchableOpacity
      style={[tabStyles.tab, active && tabStyles.tabActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {badge ? (
        <Image source={{ uri: badge }} style={tabStyles.badge} resizeMode="contain" />
      ) : null}
      <Text style={[tabStyles.label, active && tabStyles.labelActive]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const tabStyles = StyleSheet.create({
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: 'rgba(125,206,160,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.25)',
  },
  badge: {
    width: 24,
    height: 24,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  labelActive: {
    color: Colors.textPrimary,
  },
});

// ─── Screen ──────────────────────────────────────────────────

export default function PreMatchScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { play } = useSound();
  const homeTeam = useMatchStore((s) => s.homeTeam)!;
  const awayTeam = useMatchStore((s) => s.awayTeam)!;
  const selectedMode = useMatchStore((s) => s.selectedMode);

  // Settings
  const matchDuration = useSettingsStore((s) => s.matchDuration);
  const setMatchDuration = useSettingsStore((s) => s.setMatchDuration);
  const extraTimeEnabled = useSettingsStore((s) => s.extraTimeEnabled);
  const setExtraTimeEnabled = useSettingsStore((s) => s.setExtraTimeEnabled);

  // Squad store
  const { saveSquad, getSquad } = useSquadStore();

  // Active tab
  const [activeTab, setActiveTab] = useState<'home' | 'away'>('home');
  const currentTeam = activeTab === 'home' ? homeTeam : awayTeam;

  // Formation per team
  const [homeFormation, setHomeFormation] = useState<Formation>('4-3-3');
  const [awayFormation, setAwayFormation] = useState<Formation>('4-3-3');
  const formation = activeTab === 'home' ? homeFormation : awayFormation;
  const setFormation = activeTab === 'home' ? setHomeFormation : setAwayFormation;

  // Slot assignments: slotIndex → Player for each team
  // Each array has exactly 11 entries (or nulls for empty)
  const [homeSlots, setHomeSlots] = useState<(Player | null)[]>(Array(11).fill(null));
  const [awaySlots, setAwaySlots] = useState<(Player | null)[]>(Array(11).fill(null));
  const slots = activeTab === 'home' ? homeSlots : awaySlots;
  const setSlots = activeTab === 'home' ? setHomeSlots : setAwaySlots;

  // Assigned player IDs for current team
  const assignedIds = useMemo(() => {
    const ids = new Set<number>();
    for (const p of slots) {
      if (p) ids.add(p.id);
    }
    return ids;
  }, [slots]);

  // Filled count
  const filledCount = useMemo(() => slots.filter(Boolean).length, [slots]);
  const homeFilledCount = useMemo(() => homeSlots.filter(Boolean).length, [homeSlots]);
  const awayFilledCount = useMemo(() => awaySlots.filter(Boolean).length, [awaySlots]);

  // Player picker modal state
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerSlotIndex, setPickerSlotIndex] = useState(0);
  const [pickerSlotGroup, setPickerSlotGroup] = useState<PositionGroup>('FWD');

  // Load saved squads or auto-pick on mount
  useEffect(() => {
    const loadTeamSlots = (team: Team, form: Formation, setF: (f: Formation) => void, setSl: (s: (Player | null)[]) => void) => {
      const saved = getSquad(team.name);
      if (saved) {
        const teamIds = new Set(team.players.map(p => p.id));
        const validIds = saved.starterIds.filter(id => teamIds.has(id));
        if (validIds.length === 11) {
          setF(saved.formation);
          const positions = FORMATION_POSITIONS[saved.formation];
          // Map saved IDs to slots by matching position groups
          const playerMap = new Map(team.players.map(p => [p.id, p]));
          const savedPlayers = validIds.map(id => playerMap.get(id)!);
          // Reorder to match formation slots
          const ordered = assignPlayersToSlots(savedPlayers, positions);
          setSl(ordered);
          return;
        }
      }
      // Auto pick
      const auto = autoPick11(team.players, form);
      const positions = FORMATION_POSITIONS[form];
      setSl(assignPlayersToSlots(auto, positions));
    };

    loadTeamSlots(homeTeam, homeFormation, setHomeFormation, setHomeSlots);
    loadTeamSlots(awayTeam, awayFormation, setAwayFormation, setAwaySlots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeTeam.name, awayTeam.name]);

  // Slot press → open picker
  const handleSlotPress = useCallback((slotIndex: number) => {
    play('button_tap');
    const positions = FORMATION_POSITIONS[formation];
    setPickerSlotIndex(slotIndex);
    setPickerSlotGroup(positions[slotIndex].group);
    setPickerVisible(true);
  }, [formation, play]);

  // Select player from picker
  const handlePlayerSelect = useCallback((player: Player) => {
    play('button_tap');
    setSlots(prev => {
      const next = [...prev];
      // If player is already assigned to another slot, swap
      const existingIdx = next.findIndex(p => p?.id === player.id);
      if (existingIdx !== -1) {
        next[existingIdx] = next[pickerSlotIndex]; // put current to old spot (can be null)
      }
      next[pickerSlotIndex] = player;
      return next;
    });
    setPickerVisible(false);
  }, [pickerSlotIndex, setSlots, play]);

  // Change formation
  const cycleFormation = useCallback((dir: 1 | -1) => {
    play('button_tap');
    const idx = FORMATIONS.indexOf(formation);
    const next = FORMATIONS[(idx + dir + FORMATIONS.length) % FORMATIONS.length];
    setFormation(next);
    // Re-pick for new formation
    const auto = autoPick11(currentTeam.players, next);
    const positions = FORMATION_POSITIONS[next];
    setSlots(assignPlayersToSlots(auto, positions));
  }, [formation, setFormation, setSlots, currentTeam, play]);

  // Start match
  const startBtnScale = useSharedValue(1);
  const startBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: startBtnScale.value }],
  }));

  const canStart = homeFilledCount === 11 && awayFilledCount === 11;

  const handleStart = useCallback(() => {
    if (!canStart) return;
    play('button_tap');

    // Save squads
    const homeIds = homeSlots.filter(Boolean).map(p => p!.id);
    const awayIds = awaySlots.filter(Boolean).map(p => p!.id);
    saveSquad(homeTeam.name, homeFormation, homeIds);
    saveSquad(awayTeam.name, awayFormation, awayIds);

    // Update match store with selected starters
    const { setHomeTeam, setAwayTeam } = useMatchStore.getState();
    setHomeTeam({ ...homeTeam, players: homeSlots.filter(Boolean) as Player[] });
    setAwayTeam({ ...awayTeam, players: awaySlots.filter(Boolean) as Player[] });

    if (selectedMode) {
      router.replace(`/game/${selectedMode}` as any);
    }
  }, [canStart, homeSlots, awaySlots, homeFormation, awayFormation, homeTeam, awayTeam, selectedMode, saveSquad, play, router]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#081a10', '#0f2a1a', '#0a1f14']} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path d="M15 18l-6-6 6-6" stroke={Colors.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titleText}>{t('preMatch.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Team tabs */}
        <View style={styles.teamTabs}>
          <TabButton
            label={homeTeam.teamShort || homeTeam.name.slice(0, 3).toUpperCase()}
            active={activeTab === 'home'}
            onPress={() => setActiveTab('home')}
            badge={homeTeam.badge}
          />
          <TabButton
            label={awayTeam.teamShort || awayTeam.name.slice(0, 3).toUpperCase()}
            active={activeTab === 'away'}
            onPress={() => setActiveTab('away')}
            badge={awayTeam.badge}
          />
        </View>

        {/* Formation selector */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>{t('preMatch.formation')}</Text>
          <View style={styles.formationRow}>
            <TouchableOpacity onPress={() => cycleFormation(-1)} style={styles.formArrow}>
              <Text style={styles.formArrowText}>◀</Text>
            </TouchableOpacity>
            <View style={styles.formBadge}>
              <Text style={styles.formText}>{formation}</Text>
            </View>
            <TouchableOpacity onPress={() => cycleFormation(1)} style={styles.formArrow}>
              <Text style={styles.formArrowText}>▶</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Interactive Pitch */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <InteractivePitch
            formation={formation}
            slotPlayers={slots}
            teamColor={currentTeam.primaryColor}
            onSlotPress={handleSlotPress}
          />
        </Animated.View>

        {/* Starter count */}
        <View style={styles.starterCount}>
          <Text style={[styles.starterCountText, filledCount !== 11 && { color: Colors.redCard }]}>
            {filledCount}/11 {t('preMatch.selected')}
          </Text>
          <Text style={styles.tapHint}>{t('preMatch.tapToChange')}</Text>
        </View>

        {/* Match Settings */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>{t('preMatch.matchSettings')}</Text>

          {/* Duration */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>{t('preMatch.duration')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.durationScroll}>
              {DURATION_OPTIONS.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.durChip, matchDuration === d && styles.durChipActive]}
                  onPress={() => { play('button_tap'); setMatchDuration(d as any); }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.durChipText, matchDuration === d && styles.durChipTextActive]}>
                    {d}s
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Extra time */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>{t('preMatch.extraTime')}</Text>
            <TouchableOpacity
              style={[styles.toggleBtn, extraTimeEnabled && styles.toggleBtnActive]}
              onPress={() => { play('button_tap'); setExtraTimeEnabled(!extraTimeEnabled); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.toggleText, extraTimeEnabled && styles.toggleTextActive]}>
                {extraTimeEnabled ? t('settings.on') : t('settings.off')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Start Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPressIn={() => { startBtnScale.value = withSpring(0.95); }}
          onPressOut={() => { startBtnScale.value = withSpring(1); }}
          onPress={handleStart}
          disabled={!canStart}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.startBtn, startBtnStyle, !canStart && styles.startBtnDisabled]}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.startGradient}
            >
              <Text style={styles.startText}>{t('preMatch.kickOff')}</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Player Picker Modal */}
      <PlayerPickerModal
        visible={pickerVisible}
        slotIndex={pickerSlotIndex}
        slotGroup={pickerSlotGroup}
        players={currentTeam.players}
        currentPlayerId={slots[pickerSlotIndex]?.id ?? null}
        assignedIds={assignedIds}
        onSelect={handlePlayerSelect}
        onClose={() => setPickerVisible(false)}
      />
    </SafeAreaView>
  );
}

// ─── Assign players to formation slots ───────────────────────

function assignPlayersToSlots(
  players: Player[],
  positions: Array<{ x: number; y: number; group: PositionGroup }>,
): (Player | null)[] {
  const result: (Player | null)[] = Array(positions.length).fill(null);
  const used = new Set<number>();

  // First pass: assign matching position groups
  for (let i = 0; i < positions.length; i++) {
    const group = positions[i].group;
    const match = players.find(p => p.positionGroup === group && !used.has(p.id));
    if (match) {
      result[i] = match;
      used.add(match.id);
    }
  }

  // Second pass: fill remaining with unassigned players
  for (let i = 0; i < positions.length; i++) {
    if (!result[i]) {
      const remaining = players.find(p => !used.has(p.id));
      if (remaining) {
        result[i] = remaining;
        used.add(remaining.id);
      }
    }
  }

  return result;
}

// ─── Styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(125,206,160,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 3,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },

  teamTabs: { flexDirection: 'row', gap: 8, marginBottom: 16 },

  section: { marginBottom: 20 },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  formationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  formArrow: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(125,206,160,0.08)',
    borderWidth: 1, borderColor: 'rgba(125,206,160,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  formArrowText: { color: Colors.primary, fontSize: 12 },
  formBadge: {
    paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12,
    backgroundColor: 'rgba(125,206,160,0.1)',
    borderWidth: 1, borderColor: 'rgba(125,206,160,0.25)',
  },
  formText: { color: Colors.textPrimary, fontSize: 20, fontWeight: '900', letterSpacing: 2 },

  starterCount: { alignItems: 'center', marginVertical: 12 },
  starterCountText: { color: Colors.primary, fontSize: 13, fontWeight: '700' },
  tapHint: { color: Colors.textMuted, fontSize: 11, marginTop: 4 },

  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  settingLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600', minWidth: 80 },
  durationScroll: { gap: 6, paddingLeft: 4 },
  durChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  durChipActive: { backgroundColor: 'rgba(125,206,160,0.15)', borderColor: Colors.primary },
  durChipText: { color: Colors.textMuted, fontSize: 13, fontWeight: '700' },
  durChipTextActive: { color: Colors.textPrimary },

  toggleBtn: {
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  toggleBtnActive: { backgroundColor: 'rgba(125,206,160,0.15)', borderColor: Colors.primary },
  toggleText: { color: Colors.textMuted, fontSize: 13, fontWeight: '700' },
  toggleTextActive: { color: Colors.textPrimary },

  bottomBar: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8 },
  startBtn: {
    borderRadius: 14, overflow: 'hidden', elevation: 8,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 12,
  },
  startBtnDisabled: { opacity: 0.4 },
  startGradient: { paddingVertical: 16, alignItems: 'center' },
  startText: { fontSize: 16, fontWeight: '900', color: '#0d2818', letterSpacing: 3 },
});
