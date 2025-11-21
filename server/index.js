
const express = require('express');
const app = express();
const port = 4200;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/data', async (req, res) => {
    try {
        const leagueId = req.query.leagueId;
        if (!leagueId) {
            return res.status(400).json({ error: 'leagueId query parameter is required' });
        }

        const data = await getFantasyTable(leagueId);
        res.json(data);
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getFantasyTable = async (leagueId) => {
    const response = await fetch(`https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app; // Export the app for testing purposes

