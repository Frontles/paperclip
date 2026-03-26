import { COMPETITION_META, type CompetitionType } from '@/constants/competitionMeta';
import leagueMetaData from '@/constants/leagueMeta.json';

const leagueMeta = leagueMetaData as Record<string, { badge: string; logo: string; name?: string }>;

export function getMatchBadge(
  competitionType: CompetitionType | null,
  homeLeague: string | undefined,
  awayLeague: string | undefined,
): string | null {
  if (!competitionType || competitionType === 'friendly') {
    // Gösteri maçı: aynı ligdeyse lig logosu, farklıysa yok
    if (homeLeague && homeLeague === awayLeague) {
      return leagueMeta[homeLeague]?.badge ?? null;
    }
    return null;
  }
  return COMPETITION_META[competitionType].badge;
}
