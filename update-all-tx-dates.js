const db = require('better-sqlite3')('local.db');

const updates = [
    { id: 'becf1ea8-2e2f-465e-b11c-748b1309c5b6', date: 'Mar 12, 2024, 12:00 AM' },
    { id: '244c7d10-5592-40e0-9d7e-40c3018439b8', date: 'Apr 1, 2024, 09:00 PM' },
    { id: '0ffb007e-d261-443b-bd3f-8d70fb84e32d', date: 'Jun 18, 2024, 06:06 AM' },
    { id: '494dcf31-adde-4d46-a120-367e90b5eed4', date: 'Jul 27, 2024, 12:35 PM' },
    { id: '4ced5044-a0ab-49d7-b815-924d59cd4a80', date: 'Jan 1, 2025, 12:00 AM' },
    { id: 'c612c8a6-5b19-4d5a-82ce-ec8cd2bf2391', date: 'Jun 22, 2025, 11:28 PM' },
    { id: '708d2824-cf3c-489a-882e-04069e47df32', date: 'Oct 28, 2025, 05:00 PM' },
    { id: '2277870c-862c-4880-8afd-40f76e361ede', date: 'Dec 31, 2025, 07:00 AM' },
    { id: '0ea6454f-dc52-4f98-af8d-13787e37f87a', date: 'Jan 11, 2026, 02:26 PM' },
    { id: 'db49d87c-2a0c-4b3d-88ef-80e726fef174', date: 'Jan 1, 2026, 12:40 AM' },
    { id: '94dcbe73-12e0-4b6e-b254-edcbe411b294', date: 'Feb 19, 2026, 04:30 AM' },
    { id: 'e51cf486-7122-4b93-87aa-eaa44472f8a0', date: 'Feb 17, 2026, 10:30 PM' },
    { id: '95123ad6-866a-44a8-ae9e-cff45df0dae4', date: 'Feb 17, 2026, 06:30 PM' }
];

const stmt = db.prepare('UPDATE transactions SET created_at = ? WHERE id = ?');
for (const u of updates) {
    stmt.run(u.date, u.id);
    console.log('Updated', u.id, 'to', u.date);
}
