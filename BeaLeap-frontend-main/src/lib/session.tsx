let teamSession: { team_name: string; password: string } | null = null;

export function setTeamSession(team_name: string, password: string) {
  teamSession = { team_name, password };
}

export function getTeamSession() {
  return teamSession;
}