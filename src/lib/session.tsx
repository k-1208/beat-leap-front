// lib/session.ts

// ✅ Save team login info in sessionStorage
export function saveTeamSession(team_name: string, password: string, server_session: string) {
  if (typeof window === "undefined") return; // only run client-side

  sessionStorage.setItem("team_name", team_name);
  sessionStorage.setItem("password", password);
  sessionStorage.setItem("server_session", server_session);
}

// ✅ Retrieve saved session data
export function getTeamSession() {
  if (typeof window === "undefined") return null;

  const team_name = sessionStorage.getItem("team_name");
  const password = sessionStorage.getItem("password");
  const server_session = sessionStorage.getItem("server_session");

  if (!team_name || !password || !server_session) return null;

  return { team_name, password, server_session };
}

// ✅ Clear session when logging out
export function clearTeamSession() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem("team_name");
  sessionStorage.removeItem("password");
  sessionStorage.removeItem("server_session");
}