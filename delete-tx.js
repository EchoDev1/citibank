const db = require('better-sqlite3')('local.db');

const txs = db.prepare(`
  SELECT t.id, t.description, t.amount, t.status, a.balance, u.email
  FROM transactions t
  JOIN accounts a ON t.account_id = a.id
  JOIN users u ON a.user_id = u.id
  WHERE u.email = 'iamharriswalter@gmail.com' 
    AND t.description LIKE '%Sandra Maxwell%'
`).all();

console.log("Found transactions:", txs);

if (txs.length > 0) {
    for (const tx of txs) {
        console.log("Deleting tx:", tx.id);
        db.prepare('DELETE FROM transactions WHERE id = ?').run(tx.id);
    }
    console.log("Deleted.");
} else {
    console.log("No transactions found.");
}
