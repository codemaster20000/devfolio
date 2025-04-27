import axios from 'axios';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const BASE_URL = 'https://api.groq.com/openai/v1/chat/completions'; // update if your endpoint differs

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: 'meta-llama/llama-4-scout-17b-16e-instruct', // or another model GROQ supports
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('GROQ API Error:', error);
    return 'Sorry, something went wrong.';
  }
};
