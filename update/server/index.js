// server/index.js
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;

// Basic CORS setup
const corsOptions = {
  origin: true, // Reflect the request origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// Enable pre-flight for all routes
app.options('*', cors());

const DATA_FILE = join(__dirname, 'data', 'applications.json');

// Initialize data directory and file
async function initFiles() {
  const dir = join(__dirname, 'data');
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ applications: {} }));
  }
}

await initFiles();

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/applications', cors(corsOptions), async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading applications:', error);
    res.status(500).json({ error: 'Failed to read applications' });
  }
});

app.post('/api/applications', cors(corsOptions), async (req, res) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing applications:', error);
    res.status(500).json({ error: 'Failed to save applications' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});