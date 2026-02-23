const db = require('better-sqlite3')('local.db');

const txs = db.prepare(`
  SELECT t.id, t.description, t.status, t.created_at, t.amount, t.type
  FROM transactions t
  JOIN accounts a ON t.account_id = a.id
  JOIN users u ON a.user_id = u.id
  WHERE u.email = 'iamharriswalter@gmail.com'
`).all();

console.log(JSON.stringify(txs, null, 2));
