const db = require('better-sqlite3')('local.db');

const txs = db.prepare(`
  SELECT t.id, t.description, t.status, t.created_at, t.amount, a.id as account_id
  FROM transactions t
  JOIN accounts a ON t.account_id = a.id
  JOIN users u ON a.user_id = u.id
  WHERE u.email = 'iamharriswalter@gmail.com'
    AND t.created_at LIKE '2026-02-23 16:40%'
`).all();

console.log('Transactions to update:', txs);

const stmt = db.prepare('UPDATE transactions SET created_at = ? WHERE id = ?');

// We will update these explicitly to 'Invalid Date' string in the DB text column
for (const tx of txs) {
    stmt.run('Invalid Date', tx.id);
    console.log('Updated:', tx.id);
}

console.log('Done.');
