const db = require('better-sqlite3')('local.db');

const txs = db.prepare(`
  SELECT t.id, t.created_at, t.description
  FROM transactions t
  JOIN accounts a ON t.account_id = a.id
  JOIN users u ON a.user_id = u.id
  WHERE u.email = 'iamharriswalter@gmail.com' AND t.status = 'completed'
`).all();

const stmt = db.prepare('UPDATE transactions SET created_at = ? WHERE id = ?');

for (const tx of txs) {
    stmt.run('N/A', tx.id);
    console.log('Updated to N/A:', tx.id);
}

console.log('All completed txs for this user updated to N/A');
