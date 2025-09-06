// my-app/src/api.js
const BASE = "/api"; // Vite proxy rewrites /api -> http://localhost:3000

const j = async (u, o) => {
  const r = await fetch(u, o);
  if (r.status === 304) {
    // force a fresh fetch
    const rr = await fetch(u, { cache: "reload" });
    if (!rr.ok) throw new Error(`${rr.status} ${rr.statusText}`);
    return rr.json();
  }
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.status === 204 ? null : r.json();
};

// ---------- GAMES ----------
export const listGames   = () => j(`${BASE}/games`);
export const getGame     = (id) => j(`${BASE}/games/${id}`);
export const createGame  = (data) =>
  j(`${BASE}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data) // omit id to auto-assign, or pass your own string id
  });
export const updateGame  = (id, data) =>
  j(`${BASE}/games/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
export const replaceGame = (id, data) =>
  j(`${BASE}/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data })
  });
export const deleteGame  = (id) =>
  j(`${BASE}/games/${id}`, { method: "DELETE" });

// Add a playerId into game.players (dedupe)
export const addPlayerToGame = async (gameId, playerId) => {
  const game = await getGame(gameId);
  const players = Array.isArray(game.players) ? game.players : [];
  if (!players.includes(playerId)) players.push(playerId);
  return updateGame(gameId, { players });
};

// ---------- PLAYERS ----------
export const listPlayers   = () => j(`${BASE}/players`);
export const getPlayer     = (id) => j(`${BASE}/players/${id}`);
export const createPlayer  = (data) =>
  j(`${BASE}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data) // omit id to auto-assign, or pass your own string id
  });
export const updatePlayer  = (id, data) =>
  j(`${BASE}/players/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
export const replacePlayer = (id, data) =>
  j(`${BASE}/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data })
  });
export const deletePlayer  = (id) =>
  j(`${BASE}/players/${id}`, { method: "DELETE" });

// ---------- Convenience: create + attach ----------
export const createPlayerAndJoinGame = async (playerData, gameId) => {
  const created = await createPlayer(playerData);
  await addPlayerToGame(gameId, created.id);
  return created;
};