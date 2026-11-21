const API_BASE = 'http://localhost:5000/api';

export async function analyzeConversation(conversation) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ conversation })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to analyze conversation.');
  }

  return data.data;
}

export async function fetchSamples() {
  const response = await fetch(`${API_BASE}/samples`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to load samples.');
  }
  return data.data;
}

export async function fetchTactics() {
  const response = await fetch(`${API_BASE}/tactics`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to load tactics.');
  }
  return data.data;
}

export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (err) {
    return false;
  }
}
