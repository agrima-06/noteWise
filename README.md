# NoteWise AI 🧠

> Turn messy notes into clear knowledge.

NoteWise AI is an AI-powered notes summarization tool that transforms long or unstructured study material into concise summaries, important keywords, and beginner-friendly explanations.

The project was built as an MVP to explore **LLM API integration, prompt engineering, structured AI responses, and full-stack development using Next.js**.

## 🚀 Live Demo

**Vercel:**  
https://notewise-inky.vercel.app/

---

## ✨ Features

- 📝 **Smart Notes Summarization**
  - Convert long notes into 4–7 concise bullet points.
  - Focuses on the most important concepts and facts.

- 🔑 **Important Keywords**
  - Extracts 5–10 key concepts from the provided notes.
  - Helps quickly identify the important topics.

- 🧑‍🎓 **Beginner-Friendly Explanation**
  - Explains complex concepts using simple language.
  - Uses analogies or examples when useful.

- ⚡ **AI-Powered Processing**
  - Uses Google's Gemini API to analyze and structure the notes.

- 📦 **Structured AI Output**
  - Gemini returns predictable JSON containing:
    - Summary
    - Keywords
    - Beginner explanation

- 🔄 **Retry & Fallback Handling**
  - Handles temporary Gemini API failures.
  - Retries transient API errors before falling back to another model.

- 📱 **Responsive Interface**
  - Designed to work across desktop and mobile screens.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Backend

- **Next.js Route Handlers**
- **Google Gemini API**
- **@google/genai**

### Development

- **Git**
- **GitHub**
- **Vercel**

---

## 🏗️ Project Architecture

The application follows a simple full-stack architecture:

```text
User
 │
 ▼
Next.js Frontend
 │
 │ POST /api/summarize
 ▼
Next.js API Route
 │
 ▼
Gemini Service
 │
 │ Prompt + Notes
 ▼
Google Gemini API
 │
 │ Structured JSON
 ▼
Gemini Service
 │
 ▼
API Route
 │
 ▼
Frontend
 │
 ├── Summary
 ├── Keywords
 └── Beginner Explanation
