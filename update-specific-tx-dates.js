const db = require('better-sqlite3')('local.db');

const updates = [
    { id: '94dcbe73-12e0-4b6e-b254-edcbe411b294', date: 'Feb 19, 2026, 12:30 PM' },
    { id: 'e51cf486-7122-4b93-87aa-eaa44472f8a0', date: 'Feb 18, 2026, 06:30 AM' },
    { id: '95123ad6-866a-44a8-ae9e-cff45df0dae4', date: 'Feb 18, 2026, 02:30 AM' }
];

const stmt = db.prepare('UPDATE transactions SET created_at = ? WHERE id = ?');

for (const u of updates) {
    stmt.run(u.date, u.id);
    console.log('Updated', u.id, 'to', u.date);
}
