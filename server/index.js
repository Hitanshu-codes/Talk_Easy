const express = require('express');
const cors = require('cors');
const multer = require('multer');
const AssemblyAi = require('assemblyai')
const fs = require('fs');
const { translateGoogleFree } = require('./translate.cjs');
// const { OpenAI } = require('openai');
require('dotenv').config();
const client = new AssemblyAi.AssemblyAI({
    apiKey: process.env.ASSEMBLY_API_KEY
})
const app = express();
app.use(cors());

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// console.log(process.env.OPENAI_API_KEY);

app.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        const transcript = await client.transcripts.transcribe({
            audio: fs.createReadStream(req.file.path),
            speaker_labels: true,
            // file: open("req.file.path", "rb"),
        });

        res.json({ text: transcript.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
});
app.post('/translate', async (req, res) => {
    try {
        console.log(req.body.text);
        console.log(req.body.targetLang);
        console.log("Translating...");
        const translatedText = await translateGoogleFree(req.body.text, req.body.targetLang);

        res.json({ translatedText });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
