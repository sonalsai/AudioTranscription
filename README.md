# Audio Transcription Dashboard

A modern, professional audio transcription dashboard featuring a **Clean Tech** aesthetic with a dark grey and neon mint color palette. This project demonstrates a high-quality UI/UX with glassmorphism effects, real-time animations, and persistent state management.

![Clean Tech Theme](https://via.placeholder.com/800x450.png?text=Audio+Transcription+Dashboard)

## ✨ Features

- **Clean Tech UI**: A sophisticated dark theme (`#111111`) with neon mint (`#00FFA3`) and blue (`#38BDF8`) accents.
- **Glassmorphism**: Frosted glass panels with subtle gradients and borders.
- **Real-time Recording**:
  - Interactive microphone button with pulse ring animations.
  - Timer display.
  - Mute/Unmute and Stop controls.
  - **State Indicator**: A thin, glowing animated bar showing the current app state (Idle, Recording, Transcribing).
- **Smart Transcription**:
  - **Typewriter Effect**: Simulates real-time text generation.
  - **Auto-scroll**: Keeps the latest text in view.
  - **Session Persistence**: Transcription text is saved to `sessionStorage` and survives page refreshes.
  - **Interactive Cursor**: Blinking cursor during text generation.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## 🎨 Color Palette

| Color          | Hex       | Usage                                |
| -------------- | --------- | ------------------------------------ |
| **Background** | `#111111` | Main app background                  |
| **Panel BG**   | `#1A1A1A` | Glassmorphic panels                  |
| **Neon Mint**  | `#00FFA3` | Primary accents, active states, glow |
| **Blue**       | `#38BDF8` | Secondary accents, gradients         |
| **Text**       | `#EDEDED` | Primary text color                   |
| **Red**        | `#EF4444` | Recording/Stop/Delete actions        |

## 🚀 Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: SCSS (Sass) with CSS Variables
- **Icons**:
  - [Lucide React](https://lucide.dev/) (General UI icons)
  - [React Icons](https://react-icons.github.io/react-icons/) (Toolbar icons: `IoMic`, `IoMicOff`, `IoStop`)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) (UI), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Code/Timer)

## 📁 Project Structure

```
src/
├── assets/               # Static assets (logos, etc.)
├── components/
│   ├── AudioRecorder/    # Left panel: Recording interface & controls
│   ├── StateIndicator/   # Top bar: Animated status indicator
│   ├── TranscriptDisplay/# Right panel: Text display & typewriter effect
│   └── Waveform/         # (Deprecated/Hidden) Waveform visualization
├── hooks/                # Custom React hooks (useRecording)
├── App.jsx               # Main application layout & state
├── App.scss              # Global layout styles
├── index.css             # CSS variables & base resets
└── main.jsx              # Entry point
```

## 🛠️ Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd AudioTranscription
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173`

## � Usage

1.  **Start Recording**: Click the large microphone button. The state indicator will turn red and pulse.
2.  **Controls**:
    - **Mute**: Toggle the microphone icon in the toolbar.
    - **Stop**: Click the square stop button to end recording.
3.  **Transcription**: Watch the text appear with a typewriter effect in the right panel.
4.  **Persistence**: Refresh the page to see your text saved.
5.  **Clear**: Use the trash icon in the transcription header to clear the text.

## 📄 License

This project is licensed under the MIT License.
