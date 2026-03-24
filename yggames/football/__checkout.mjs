const API_KEY = process.env.PAPERCLIP_API_KEY;
const API_URL = process.env.PAPERCLIP_API_URL || 'http://127.0.0.1:3100';
const RUN_ID = process.env.PAPERCLIP_RUN_ID;
const TASK_ID = process.env.PAPERCLIP_TASK_ID;
const AGENT_ID = process.env.PAPERCLIP_AGENT_ID;

const res = await fetch(`${API_URL}/api/issues/${TASK_ID}/checkout`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'X-Paperclip-Run-Id': RUN_ID,
  },
  body: JSON.stringify({ agentId: AGENT_ID, expectedStatuses: ['todo', 'backlog', 'blocked', 'in_progress'] }),
});
const data = await res.json();
console.log('Status:', res.status, JSON.stringify(data));
