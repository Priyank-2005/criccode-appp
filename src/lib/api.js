const BASE_URL = 'http://localhost:5000/api';

/**
 * Handles API responses, throwing an error if the status is not ok (200-299).
 * @param {Response} res The fetch response object.
 * @returns {Promise<any>} The parsed JSON data.
 */
const handleResponse = async (res) => {
  if (!res.ok) {
    try {
      const error = await res.json();
      // Use the error message from the backend if available
      throw new Error(error.message || `HTTP error! Status: ${res.status}`);
    } catch (e) {
      // Handle cases where the backend didn't return valid JSON error structure
      throw new Error(`API request failed with status: ${res.status}`);
    }
  }
  return res.json();
}

// --- Player Functions ---

/**
 * Fetches all players from the backend.
 * @returns {Promise<Array<Player>>}
 */
export async function fetchPlayers() {
  const res = await fetch(`${BASE_URL}/players`);
  return handleResponse(res);
}

// --- Team Functions ---

/**
 * Fetches all teams, including populated players.
 * @returns {Promise<Array<Team>>}
 */
export async function fetchTeams() {
  const res = await fetch(`${BASE_URL}/teams`);
  return handleResponse(res);
}

// --- Tournament Functions ---

/**
 * Fetches a list of all tournaments.
 * @returns {Promise<Array<Tournament>>}
 */
export async function fetchTournaments() {
  const res = await fetch(`${BASE_URL}/tournaments`);
  return handleResponse(res);
}

/**
 * Fetches a single tournament by ID, including its associated matches.
 * @param {string} id The Tournament ID.
 * @returns {Promise<Tournament>}
 */
export async function fetchTournamentById(id) {
  const res = await fetch(`${BASE_URL}/tournaments/${id}`);
  return handleResponse(res);
}

// --- Match Functions ---

/**
 * Fetches all matches, used primarily for the Home Page dashboard.
 * @returns {Promise<Array<Match>>}
 */
export async function fetchMatches() {
  const res = await fetch(`${BASE_URL}/matches`);
  return handleResponse(res);
}

/**
 * Fetches a single match by ID, including the ball-by-ball scorecard.
 * @param {string} id The Match ID.
 * @returns {Promise<Match>}
 */
export async function fetchMatchById(id) {
  const res = await fetch(`${BASE_URL}/matches/${id}`);
  return handleResponse(res);
}

/**
 * Posts a score update (ball-by-ball) to the backend.
 * NOTE: This is intended for an admin/scorer interface.
 * @param {string} id The Match ID.
 * @param {object} updateData Score details (over, ball, batsmanId, bowlerId, runs, wicket)
 * @returns {Promise<Match>} The updated match object.
 */
export async function updateMatchScore(id, updateData) {
  const res = await fetch(`${BASE_URL}/matches/${id}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  return handleResponse(res);
}

// --- Placeholder/Unimplemented Functions (for future backend features) ---

/**
 * Fetches ranking/points table data for a tournament.
 * (Requires backend calculation logic)
 * @param {string} tournamentId
 * @returns {Promise<Array<RankingEntry>>}
 */
export async function fetchTournamentRankings(tournamentId) {
    const res = await fetch(`${BASE_URL}/tournaments/${tournamentId}/rankings`);
    return handleResponse(res);
}

/**
 * Fetches player stats (e.g., most runs, most wickets) for a tournament.
 * (Requires backend aggregation logic)
 * @param {string} tournamentId
 * @returns {Promise<Array<StatEntry>>}
 */
export async function fetchTournamentStats(tournamentId) {
    const res = await fetch(`${BASE_URL}/tournaments/${tournamentId}/stats`);
    return handleResponse(res);
}

// These are placeholders until the backend routes are built for them:
export async function fetchVenues(tournamentId) {
    const res = await fetch(`${BASE_URL}/tournaments/${tournamentId}/venues`);
    return handleResponse(res);
}
