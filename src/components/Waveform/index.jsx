import { useEffect, useRef } from "react";
import "./style.scss";

const Waveform = ({ isActive = false, isMuted = false }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const bars = 24;
    const barWidth = 3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;

        // Create wave effect
        const wave =
          isActive && !isMuted ? Math.sin(phase + i * 0.5) * 15 + 10 : 5;

        const x2 = centerX + Math.cos(angle) * (radius + wave);
        const y2 = centerY + Math.sin(angle) * (radius + wave);

        // Gradient color
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        if (isMuted) {
          gradient.addColorStop(0, "rgba(156, 163, 175, 0.3)");
          gradient.addColorStop(1, "rgba(156, 163, 175, 0.1)");
        } else if (isActive) {
          gradient.addColorStop(0, "rgba(0, 255, 163, 0.8)");
          gradient.addColorStop(1, "rgba(56, 189, 248, 0.4)");
        } else {
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = barWidth;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      phase += 0.1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isMuted]);

  return (
    <canvas
      ref={canvasRef}
      className="waveform-canvas"
      width={200}
      height={200}
    />
  );
};

export default Waveform;
