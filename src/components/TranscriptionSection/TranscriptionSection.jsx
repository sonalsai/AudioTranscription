// Plain HTML structure; styles in component SCSS
import "./TranscriptionSection.scss";

const TranscriptionSection = ({ transcriptionText }) => {
  return (
    <div className="transcription-panel">
      <div className="transcription-text">
        {transcriptionText ? (
          <p>{transcriptionText}</p>
        ) : (
          <p className="placeholder">Transcribed text will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionSection;
