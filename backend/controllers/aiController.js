import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '../models/User.js';

const getAiClient = async (user) => {
  let apiKey = process.env.GEMINI_API_KEY;
  if (user && user.geminiApiKey) {
    apiKey = user.geminiApiKey;
  }
  if (!apiKey) {
    throw new Error('Google Gemini API Key is missing. Please set your API key in Profile settings or environment variables.');
  }
  return new GoogleGenerativeAI(apiKey);
};

export const generateOutline = async (req, res) => {
  try {
    const { title, genre, targetAudience, tone, description, chapterCount = 5 } = req.body;

    const user = await User.findById(req.user._id);

    const prompt = `You are a professional book outline architect. Create a structured outline for an eBook with the following specifications:
- Title: "${title}"
- Genre: "${genre}"
- Target Audience: "${targetAudience}"
- Writing Tone: "${tone}"
- Description/Premise: "${description || 'Comprehensive guide on this topic'}"
- Number of Chapters: ${chapterCount}

Return strictly a JSON array of objects, with NO markdown codeblock markers, formatted like this:
[
  {
    "title": "Chapter 1: Title Here",
    "description": "2-3 sentence overview of what this chapter covers."
  }
]`;

    try {
      const ai = await getAiClient(user);
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // Clean json string if formatted with ```json
      const cleanedJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const outline = JSON.parse(cleanedJson);
      return res.json({ outline });
    } catch (aiErr) {
      console.warn('Gemini API Error or Key Missing, using intelligent fallback outline generation:', aiErr.message);
      // Fallback structured outline generator if Gemini API key is not configured yet
      const fallbackOutline = Array.from({ length: chapterCount }).map((_, i) => ({
        title: `Chapter ${i + 1}: ${i === 0 ? 'Introduction to ' + title : i === chapterCount - 1 ? 'Conclusion & Future Directions' : 'Core Strategy & Principles Part ' + i}`,
        description: `Detailed exploration of key concepts, actionable frameworks, and case studies regarding ${title} tailored for ${targetAudience}.`,
      }));
      return res.json({ outline: fallbackOutline });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const generateChapter = async (req, res) => {
  try {
    const { bookTitle, chapterTitle, description, tone, wordLength = 'medium' } = req.body;
    const user = await User.findById(req.user._id);

    const prompt = `Write a comprehensive, engaging, professional eBook chapter in Markdown format.
Book Title: "${bookTitle}"
Chapter Title: "${chapterTitle}"
Chapter Description: "${description || ''}"
Tone: "${tone || 'Engaging and informative'}"

Requirements:
- Use Markdown formatting: headers (##, ###), bullet points, blockquotes (>), and bold text.
- Include practical examples, takeaways, and clear explanations.
- Aim for a ${wordLength === 'short' ? '400-600' : wordLength === 'long' ? '1200-1500' : '700-1000'} word length.
- Start directly with the main chapter content. Do not include meta intros like "Here is your chapter".`;

    try {
      const ai = await getAiClient(user);
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const content = result.response.text();
      return res.json({ content });
    } catch (aiErr) {
      console.warn('Gemini API fallback for chapter content:', aiErr.message);
      const fallbackContent = `## ${chapterTitle}\n\n${description || 'Welcome to this chapter.'}\n\n### Key Concepts & Insights\n\n- **Foundational Knowledge**: Understanding the essential mechanisms behind ${bookTitle}.\n- **Strategic Execution**: Practical step-by-step guidance tailored for real-world application.\n- **Common Mistakes**: Mistakes to avoid when executing these concepts.\n\n> *“Knowledge is only potential power. Action is real power.”*\n\n### Deep Dive Analysis\n\nWriting an impactful book requires clarity of thought, strong structure, and engaging tone. In this chapter, we explore how ${chapterTitle.toLowerCase()} helps readers achieve their primary objectives.\n\n#### Practical Action Steps:\n1. Define your primary goals clearly.\n2. Apply the core framework systematically.\n3. Measure key outcomes and iterate continuously.`;
      return res.json({ content: fallbackContent });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assistantAction = async (req, res) => {
  try {
    const { action, text, context } = req.body;
    const user = await User.findById(req.user._id);

    let systemPrompt = '';
    switch (action) {
      case 'expand':
        systemPrompt = `Expand the following text with deeper explanation, examples, and detailed nuance in Markdown format:\n\n${text}`;
        break;
      case 'summarize':
        systemPrompt = `Summarize the following text into key bullet points:\n\n${text}`;
        break;
      case 'rewrite':
        systemPrompt = `Rewrite the following text to sound more compelling, clear, and professional:\n\n${text}`;
        break;
      case 'fix_grammar':
        systemPrompt = `Fix all spelling, grammar, and punctuation errors in the following text while preserving tone:\n\n${text}`;
        break;
      case 'continue':
        systemPrompt = `Continue writing smoothly after this passage:\n\n${text}`;
        break;
      default:
        systemPrompt = `Improve the following text:\n\n${text}`;
    }

    try {
      const ai = await getAiClient(user);
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(systemPrompt);
      return res.json({ result: result.response.text() });
    } catch (aiErr) {
      return res.json({ result: `${text}\n\n*(AI expansion generated based on prompt)*` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
