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
            data: { full_name: name } // Saves name directly to Auth Metadata
        }
    });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Signup successful!', user: data.user });
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
            id: data.user.id,
            name: data.user.user_metadata.full_name,
            email: data.user.email
        }
    });
});

// --- LIVESTOCK API ROUTES ---

// GET API to fetch all livestock
app.get('/api/livestock', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase
        .from('livestock')
        .select('*')
        .eq('farmer_id', userId)
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// POST API to add new livestock
app.post('/api/livestock', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { tag_id, breed, weight, status } = req.body;

    const { data, error } = await supabase
        .from('livestock')
        .insert([{ tag_id, breed, weight, farmer_id: userId, status }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Livestock added successfully!', livestock: data[0] });
});
// --- PROFILE API ROUTES ---
// GET API to fetch the farmer profile
app.get('/api/profile', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase
        .from('farmer_profiles')
        .select('*')
        .eq('id', userId)
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') return res.status(400).json({ error: error.message });
    res.json(data || null);
});

// POST API to update the farmer profile
app.post('/api/profile', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { first_name, last_name, age, gender, location, farm_id, contact_number } = req.body;

    const { data, error } = await supabase
        .from('farmer_profiles')
        .upsert([{ 
            id: userId,
            first_name, 
            last_name, 
            age, 
            gender, 
            location, 
            farm_id, 
            contact_number 
        }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Profile updated!', profile: data[0] });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
});