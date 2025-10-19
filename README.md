# AudioTranscription

A modern, real-time audio transcription application built with React and Vite. This project provides a clean, intuitive interface for recording audio and displaying transcriptions with a beautiful Material-UI inspired design.

## 🎯 Features

- **Real-time Audio Recording**: Start, stop, and mute audio recording with intuitive controls
- **Visual Feedback**: Animated waveform visualization during recording
- **Modern UI**: Clean, responsive design with Material-UI components
- **Light Theme**: Professional color scheme with soft blues and whites
- **Responsive Layout**: Two-panel layout optimized for desktop and mobile

## 🚀 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: SCSS with custom CSS variables
- **UI Components**: Material-UI (MUI) with custom theming
- **Icons**: Material-UI Icons
- **Build Tool**: Vite for fast development and building

## 🎨 Design System

The application uses a carefully crafted color palette:

| Role | Color | Hex | Description |
|------|-------|-----|-------------|
| Background | `#F7F9FB` | Soft off-white | Main background color |
| Surface (cards) | `#FFFFFF` | Pure white | Card and panel backgrounds |
| Primary Accent | `#1976D2` | MUI Blue | Primary actions and highlights |
| Secondary Accent | `#64B5F6` | Soft light blue | Secondary elements |
| Text Primary | `#1E1E1E` | Deep gray | Main text color |
| Text Secondary | `#5F6368` | Neutral gray | Secondary text |
| Highlight | `#42A5F5` | Sky blue | Waveform and mic glow |

## 📁 Project Structure

```
src/
├── assets/
│   ├── github-mark.svg           # GitHub logo
│   ├── index.js                  # Asset index
│   └── react.svg                 # React logo
├── components/
│   ├── RecordingSection/
│   │   ├── RecordingSection.jsx  # Audio recording interface
│   │   └── RecordingSection.scss # Recording component styles
│   └── TranscriptionSection/
│       ├── TranscriptionSection.jsx # Transcription display
│       └── TranscriptionSection.scss# Transcription styles
├── services/
│   └── apiServices.js            # API service for transcription
├── App.css                       # App component styles
├── App.jsx                       # Main application component
├── App.scss                      # App component styles
├── index.css                     # Base CSS styles
├── main.jsx                      # Application entry point
├── styles.scss                   # Global styles
└── theme.js                      # Material-UI theme configuration
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AudioTranscription
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎵 How to Use

1. **Start Recording**: Click the microphone button to begin audio recording
2. **Visual Feedback**: Watch the animated waveform bars during recording
3. **Control Recording**: Use the Mute/Unmute and Stop buttons to control the session
4. **View Transcription**: See the transcribed text appear in the right panel

## 🔧 Customization

### Theme Customization
Edit `src/theme.js` to modify the Material-UI theme:
- Colors and typography
- Component styling overrides
- Border radius and spacing

### Styling
- Global styles: `src/styles.scss` and `src/index.css`
- Component styles: Individual `.scss` files in the components directory
- Color variables can be updated throughout the SCSS files

## 🚧 Future Enhancements

- [ ] Real-time speech-to-text integration
- [ ] Audio file upload support
- [ ] Export transcription functionality
- [ ] Multiple language support
- [ ] Audio visualization improvements
- [ ] Keyboard shortcuts
- [ ] Dark mode toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- Vite for the fast build tooling