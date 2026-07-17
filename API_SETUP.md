# InternAI - API Integration Guide

## 🤖 Chatbot API Configuration

Your InternAI application now includes an AI-powered chatbot using **Google Gemini API**.

### Current Configuration

The chatbot is configured with your Google API key:
- **API**: Google Gemini Pro
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- **API Key**: `AIzaSyAH8kMGedcAYQtMkT-MYxf2z6bKzRVT3DU`

### Features

The chatbot provides:
- ✅ Personalized career guidance based on user profile
- ✅ Internship recommendations and advice
- ✅ Resume tips and interview preparation
- ✅ Technical skill guidance
- ✅ Application process help
- ✅ Context-aware responses using user data

### How It Works

1. **User Context**: The chatbot automatically includes user information (name, college, skills, interests) in every conversation
2. **AI Responses**: Uses Google Gemini Pro to generate intelligent, contextual responses
3. **Fallback System**: If API fails, provides helpful pre-programmed responses
4. **Quick Actions**: Pre-defined buttons for common questions

### Chatbot Location

The chatbot appears as a floating button in the bottom-right corner when users are logged in. It's available on all pages except authentication pages.

### Usage

Users can ask questions like:
- "What internships match my skills?"
- "How can I improve my resume?"
- "Tips for technical interviews"
- "What skills should I learn next?"
- "How do I prepare for a data science internship?"

### API Rate Limits

Google Gemini API has the following limits:
- **Free Tier**: 60 requests per minute
- **Response Length**: Up to 500 tokens per response
- **Temperature**: 0.7 (balanced creativity and accuracy)

### Customization

To modify the chatbot behavior, edit `src/components/ChatBot.jsx`:

```javascript
// Change system prompt
const systemPrompt = `Your custom instructions here...`;

// Adjust API parameters
generationConfig: {
  temperature: 0.7,      // 0-1, higher = more creative
  topK: 40,              // Sampling parameter
  topP: 0.95,            // Nucleus sampling
  maxOutputTokens: 500   // Max response length
}
```

### Security Note

⚠️ **Important**: In production, never expose API keys in frontend code. Use environment variables and a backend proxy:

1. Create a `.env` file:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

2. Update the code to use:
```javascript
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
```

3. Add `.env` to `.gitignore`

### Alternative: Backend Proxy (Recommended for Production)

For better security, create a backend endpoint:

```javascript
// Backend (Node.js/Express example)
app.post('/api/chat', async (req, res) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...req.body,
      key: process.env.GEMINI_API_KEY
    })
  });
  const data = await response.json();
  res.json(data);
});

// Frontend
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: userMessage })
});
```

## 📋 Application Modal

The application modal collects comprehensive information:

### Step 1: Personal & Contact
- Full Name
- Email Address
- Phone Number
- Current Address

### Step 2: Academic Details
- College/University Name
- Degree
- Branch/Major
- Current Year
- CGPA/Percentage

### Step 3: Experience & Additional Info
- Previous Experience
- Relevant Projects
- Why Interested
- Availability
- Expected Stipend
- Portfolio/GitHub Link
- LinkedIn Profile
- Additional Information

## 🏆 Certification System

Users earn certificates when completing internships:

### Features
- Automatic certificate generation
- Certificate details include:
  - Title and company
  - Completion date
  - Duration
  - Skills acquired
  - Unique certificate ID
  - Verification URL

### Usage

To add a certificate programmatically:

```javascript
import { CertificationService } from './utils/certificationService';

// Add certificate after internship completion
CertificationService.addCertification({
  title: 'Frontend Developer Intern',
  company: 'TechCorp',
  duration: '3 months',
  category: 'Web Development',
  requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS']
});
```

## 🚀 Testing the Features

### Test Chatbot
1. Sign in to your account
2. Click the chat icon in bottom-right corner
3. Try asking: "What internships match my skills?"
4. Use quick action buttons for common questions

### Test Application Modal
1. Go to recommendations page
2. Click "Apply Now" on any internship
3. Fill out the 3-step application form
4. Submit to see success message

### Test Certifications
1. Go to Profile → Certifications tab
2. View your earned certificates
3. See certificate details and completion dates

## 📝 Notes

- All data is stored in browser localStorage
- Chatbot works best with complete user profiles
- Application submissions are simulated (no backend)
- Certificates are automatically added to profile

## 🔧 Troubleshooting

### Chatbot Not Responding
- Check browser console for API errors
- Verify API key is valid
- Check internet connection
- Fallback responses will activate if API fails

### Application Modal Not Opening
- Ensure you're logged in
- Check browser console for errors
- Try refreshing the page

### Certifications Not Showing
- Complete profile setup first
- Check Profile → Certifications tab
- Use CertificationService to add sample data

---

**Need Help?** Check the main README.md for complete documentation.
