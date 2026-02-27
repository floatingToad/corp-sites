// Usage: node scripts/create-user.js <username> <password> "<Full Name>"

const bcrypt = require('bcrypt');
const db = require('../src/config/db');
require('dotenv').config();

const [, , username, password, full_name] = process.argv;

if (!username || !password) {
    console.error('Usage: node scripts/create-user.js <username> <password> [Full Name]');
    process.exit(1);
}

(async () => {
    try {
        const hash = await bcrypt.hash(password, 10);
        const { rows } = await db.query(
            'INSERT INTO corp_users (username, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, username, full_name',
            [username, hash, full_name || username]
        );
        console.log('✅ User created:', rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            console.error(`❌ Username "${username}" already exists.`);
        } else {
            console.error('❌ Error:', err.message);
        }
    } finally {
        process.exit(0);
    }
})();
