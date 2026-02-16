const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static site files from project root
app.use(express.static(path.join(__dirname)));

app.post('/chat', async (req, res) => {
  const msg = req.body && req.body.message;
  if(!process.env.OPENAI_API_KEY){
    return res.status(500).json({error: 'Server missing OPENAI_API_KEY. Set env var.'});
  }
  if(!msg) return res.status(400).json({error: 'No message provided'});

  try{
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: 'You are Coco, a helpful assistant familiar with the CarbonIQ project in this repository. Answer user questions about how the project works, how to run it, file purposes, and implementation details. If you don\'t know, say so and suggest how to find the answer.'},
          {role: 'user', content: msg}
        ],
        max_tokens: 500,
        temperature: 0.6
      })
    });

    const raw = await apiRes.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      data = { raw };
    }

    console.log('OpenAI API status:', apiRes.status);
    console.log('OpenAI API response:', JSON.stringify(data));

    const reply = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || 'Sorry, no reply.';
    res.json({reply, debug: {openai_status: apiRes.status, openai_response: data}});
  }catch(err){
    console.error(err);
    res.status(500).json({error: 'OpenAI request failed'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
