import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useMatchStore } from '@/stores/matchStore';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/constants/colors';
import { useSound } from '@/hooks/useSound';

// ─── Team Badge ──────────────────────────────────────────────

interface TeamBadgeProps {
  name: string;
  badge?: string | null;
  color?: string;
  teamShort?: string | null;
}

function TeamBadge({ name, badge, color, teamShort }: TeamBadgeProps) {
  return (
    <View style={styles.teamBadgeContainer}>
      {badge ? (
        <Image source={{ uri: badge }} style={styles.teamBadgeImg} resizeMode="contain" />
      ) : (
        <View style={[styles.teamBadgeFallback, { backgroundColor: color || Colors.surface }]}>
          <Text style={styles.teamBadgeText}>
            {teamShort || name.slice(0, 3).toUpperCase()}
          </Text>
        </View>
      )}
      <Text style={styles.teamBadgeName} numberOfLines={1}>
        {teamShort || name.slice(0, 3).toUpperCase()}
      </Text>
    </View>
  );
}

// ─── Mode Card ───────────────────────────────────────────────

interface ModeCardProps {
  icon: string;
  title: string;
  description: string;
  active: boolean;
  onPress?: () => void;
}

function ModeCard({ icon, title, description, active, onPress }: ModeCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, !active && styles.cardDisabled]}
      onPress={onPress}
      disabled={!active}
      activeOpacity={active ? 0.8 : 1}
    >
      {active && (
        <LinearGradient
          colors={['rgba(26,71,42,0.6)', 'rgba(26,71,42,0.3)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Text style={styles.cardIcon}>{icon}</Text>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, !active && styles.cardTitleDisabled]}>{title}</Text>
        <Text style={[styles.cardDescription, !active && styles.cardDescriptionDisabled]}>
          {description}
        </Text>
      </View>
      {active ? (
        <View style={styles.playBadge}>
          <Text style={styles.playBadgeText}>▶</Text>
        </View>
      ) : (
        <View style={styles.lockBadge}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── Screen ──────────────────────────────────────────────────

export default function ModeSelectScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { play } = useSound();
  const homeTeam = useMatchStore((s) => s.homeTeam);
  const awayTeam = useMatchStore((s) => s.awayTeam);
  const setSelectedMode = useMatchStore((s) => s.setSelectedMode);

  const handleMode = (mode: 'plinko' | 'arena' | 'keeper-clash') => {
    play('button_tap');
    setSelectedMode(mode);
    router.push('/team-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', top: 52, left: 16, zIndex: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(125,206,160,0.1)', alignItems: 'center', justifyContent: 'center' }}
        activeOpacity={0.7}
      >
        <Text style={{ color: Colors.primary, fontSize: 18 }}>‹</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        {homeTeam && awayTeam ? (
          <>
            <TeamBadge
              name={homeTeam.name}
              badge={homeTeam.badge}
              color={homeTeam.primaryColor}
              teamShort={homeTeam.teamShort}
            />
            <View style={styles.vsContainer}>
              <Text style={styles.vs}>{t('modeSelect.vs')}</Text>
            </View>
            <TeamBadge
              name={awayTeam.name}
              badge={awayTeam.badge}
              color={awayTeam.primaryColor}
              teamShort={awayTeam.teamShort}
            />
          </>
        ) : (
          <Text style={styles.screenTitle}>{t('modeSelect.title')}</Text>
        )}
      </View>

      {homeTeam && awayTeam ? (
        <Text style={styles.screenTitle}>{t('modeSelect.title')}</Text>
      ) : null}

      {/* Mode Cards */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ModeCard
          icon="🎱"
          title={t('modeSelect.plinkoTitle')}
          description={t('modeSelect.plinkoDescription')}
          active
          onPress={() => handleMode('plinko')}
        />
        <ModeCard
          icon="🏟️"
          title={t('modeSelect.arenaTitle')}
          description={t('modeSelect.arenaDescription')}
          active
          onPress={() => handleMode('arena')}
        />
        <ModeCard
          icon="🧤"
          title={t('modeSelect.keeperClashTitle')}
          description={t('modeSelect.keeperClashDescription')}
          active
          onPress={() => handleMode('keeper-clash')}
        />
        <ModeCard
          icon="⚡"
          title={t('modeSelect.blitzTitle')}
          description={t('modeSelect.comingSoon')}
          active={false}
        />
        <ModeCard
          icon="🏆"
          title={t('modeSelect.tournamentTitle')}
          description={t('modeSelect.comingSoon')}
          active={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 20,
  },
  teamBadgeContainer: {
    alignItems: 'center',
    gap: 6,
  },
  teamBadgeImg: {
    width: 64,
    height: 64,
  },
  teamBadgeFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(125,206,160,0.3)',
  },
  teamBadgeText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  teamBadgeName: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  vsContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(125,206,160,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.2)',
  },
  vs: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  screenTitle: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 3,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,71,42,0.3)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(45,106,79,0.3)',
    gap: 16,
    overflow: 'hidden',
  },
  cardDisabled: {
    backgroundColor: 'rgba(74,74,74,0.15)',
    borderColor: 'rgba(74,74,74,0.2)',
    opacity: 0.5,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardTitleDisabled: {
    color: Colors.textMuted,
  },
  cardDescription: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  cardDescriptionDisabled: {
    color: Colors.textMuted,
  },
  playBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(125,206,160,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.3)',
  },
  playBadgeText: {
    color: Colors.primary,
    fontSize: 14,
  },
  lockBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 16,
  },
});
