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
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Securely log them in via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
    });

    if (authError) return res.status(400).json({ error: authError.message });

    // 2. Fetch their custom profile data from your table
    // CHANGE 'your_table_name' TO YOUR ACTUAL TABLE NAME
    const { data: profileData, error: profileError } = await supabase
        .from('your_table_name')
        .select('*')
        .eq('id', authData.user.id) // Match the Auth ID to the Table ID
        .single(); // We only expect one profile per user

    if (profileError) {
        console.error("Profile Fetch Error:", profileError);
        // We still let them log in, but maybe without their extra profile info
        return res.json({ 
            message: 'Login successful (Profile missing)', 
            session: authData.session 
        });
    }

    // 3. Send back the session AND their custom profile data
    res.json({ 
        message: 'Login successful', 
        session: authData.session,
        profile: profileData // Now the frontend has their name!
    });
});

// SIGNUP API
// SIGNUP API
app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;

    // 1. Create the secure login user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) return res.status(400).json({ error: authError.message });

    // 2. Save their profile info into the custom table you created
    // CHANGE 'your_table_name' TO YOUR ACTUAL TABLE NAME!
    if (authData.user) {
        const { error: dbError } = await supabase
            .from('your_table_name') 
            .insert([
                { 
                    id: authData.user.id, // Links this row to the Auth user
                    full_name: name,
                    email: email 
                }
            ]);

        if (dbError) {
            console.error("Database Insert Error:", dbError);
            return res.status(400).json({ error: "Account created, but failed to save profile." });
        }
    }

    res.json({ message: 'Signup successful!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
});