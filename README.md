<div align="center">
  <h1>🎭 East High Stories</h1>
  <p>
    <strong>A Interactive Fanfiction Generator powered by Artificial Intelligence</strong>
  </p>
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5-purple?logo=vite" alt="Vite"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google_Gemini-AI-orange?logo=google" alt="Google Gemini"></a>
    <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  </p>
</div>

<br />

**East High Stories** is a web application that invites fans to return to the hallways of East High. Using the power of **Google Gemini**, the app generates unique, coherent, and interactive stories featuring your favorite characters from *High School Musical: The Musical: The Series*.

This isn't just a static story generator. It's a **"Choose Your Own Adventure"** engine where you decide the plot twists, relationships, and drama in real-time.

## ✨ Key Features

*   **🤖 AI-Powered Storytelling**: Utilizes Google's Gemini models to write creative, on-brand narratives that capture the voices of characters like Ricky, Nini, EJ, and Gina.
*   **🔀 Interactive Mode**: The story doesn't just end; it pauses to let you make critical decisions that shape the outcome.
*   **🌍 Full Internationalization (i18n)**: Fully supported in both **English** 🇺🇸 and **Spanish** 🇪🇸. Switch languages instantly.
*   **⚡ Real-Time Streaming**: Experience the story as it's written with a "typewriter" effect, reducing perceived latency.
*   **🎭 Customizable Experience**:
    *   **Cast Selection**: Pick exactly which characters appear in your episode.
    *   **Genre Mixing**: Choose from RomCom, Mystery, Musical Rehearsal, and more.
    *   **Length Control**: Generate quick 5-minute reads or detailed book chapters.
*   **💾 Local Library**: Your generated stories are automatically saved to your browser's local storage so you can reread them anytime.
*   **🎨 Responsive Design**: A beautiful, mobile-first UI built with Tailwind CSS that feels like a modern streaming app.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React](https://reactjs.org/) with TypeScript
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
*   **Icons**: Heroicons & Lucide React
*   **Markdown Rendering**: react-markdown

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Gemini API Key (Get one [here](https://aistudio.google.com/app/apikey))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Gaupasamaker/East-High-Stories.git
    cd East-High-Stories
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    *   Create a `.env` file in the root directory (or rename `.env.example`).
    *   Add your Gemini API Key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🎮 How to Use

1.  **Select Your Language**: Toggle between English and Spanish in the top menu.
2.  **Choose Your Cast**: Click on the avatars of the characters you want in your story.
3.  **Pick a Genre**: Do you want a musical rehearsal drama or a mystery in the hallways?
4.  **Set Length**: Choose between a short story or a long chapter.
5.  **Hit "Action!"**: Watch as the AI generates your story in real-time.
6.  **Make Choices**: When the story pauses, select one of the options to decide what happens next!

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is a fan-made project created for educational and entertainment purposes. It is not affiliated with, endorsed, or sponsored by Disney or the *High School Musical* franchise. All character names and references are property of their respective owners.
