const db = require('better-sqlite3')('local.db');

const txs = db.prepare(`
  SELECT t.id, t.description, t.status, t.created_at, t.amount
  FROM transactions t
  JOIN accounts a ON t.account_id = a.id
  JOIN users u ON a.user_id = u.id
  WHERE u.email = 'iamharriswalter@gmail.com' AND t.status = 'failed'
`).all();

console.log(txs);
