import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabaseClient.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// 1. Serve static files (CSS/Images) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// 2. Route for index.html (Root)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Route for login_signup.html (inside public folder)
app.get('/login_signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login_signup.html'));
});

// --- API AUTH ROUTES ---
app.get('/MainDash', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'MainDash.html'));
});

// LOGIN API
// LOGIN API
// SIGNUP API
app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
            data: { full_name: name },
            // This tells Supabase where to send the user after they click the link
            emailRedirectTo: 'http://localhost:3000/login_signup' 
        }
    });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Signup successful!' });
});

// LOGIN API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ 
        message: 'Login successful', 
        session: data.session,
        user: {
            name: data.user.user_metadata.full_name,
            email: data.user.email
        }
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
});