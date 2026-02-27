const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { rows } = await db.query('SELECT * FROM corp_users WHERE username = $1', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { id: user.id, username: user.username, full_name: user.full_name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.json({ message: 'Login successful', token, user: payload });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
