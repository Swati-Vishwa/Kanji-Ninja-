import React, { useRef, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import CloseIcon from '@mui/icons-material/Close';

export default function HandwritingPad({ initialStrokes = [], onStrokesChange }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [strokes, setStrokes] = useState([]);

  // Fix 1: Handle Resolution on Mount/Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    // Set internal resolution to match displayed CSS size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    if (initialStrokes.length > 0) {
      setStrokes(initialStrokes);
      redrawCanvas(initialStrokes);
    }
  }, []); // Run once on mount

  const redrawCanvas = (allStrokes) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    allStrokes.forEach((stroke) => {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.beginPath();
      stroke.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
  };

  const getCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    // Used clientX/Y and subtracted the bounding rect to get precise local coords
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const currentStroke = useRef(null);

  const startDrawing = (e) => {
    // Prevents scrolling when touching the canvas
    if (e.touches) e.preventDefault(); 
    
    setIsDrawing(true);
    const start = getCoordinates(e);
    setLastPosition(start);
    currentStroke.current = {
      color: penColor,
      width: lineWidth,
      points: [start],
    };
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const currentPos = getCoordinates(e);

    ctx.strokeStyle = penColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    currentStroke.current.points.push(currentPos);
    setLastPosition(currentPos);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const updatedStrokes = [...strokes, currentStroke.current];
    setStrokes(updatedStrokes);
    currentStroke.current = null;

    if (onStrokesChange) onStrokesChange(updatedStrokes);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokes([]);
    if (onStrokesChange) onStrokesChange([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Non-passive listeners to allow e.preventDefault() for touch
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing); 
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      window.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, lastPosition, penColor, lineWidth]);

  return (
    <div className="w-[300px] md:w-[240px] flex flex-col items-center mt-3">
      <div className="relative z-20 top-7 left-1 md:left-0 w-full flex justify-between px-2">
        <button onClick={clearCanvas} className="hover:scale-110 transition-transform">
          <CloseIcon sx={{ fontSize: 20, color: '#E17879' }} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="w-[290px] h-[290px] md:w-[240px] md:h-[240px] bg-white rounded-md border-2 border-sec shadow-inner"
        style={{ touchAction: 'none' }}
      />

      <div className="w-full flex justify-center items-center gap-4 mt-3 px-2">
        <Slider
          sx={{ color: '#CDE2CA', flexGrow: 1 }}
          size="small"
          value={lineWidth}
          min={1}
          max={10}
          onChange={(e, val) => setLineWidth(val)}
          valueLabelDisplay="auto"
        />
        <input
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
          className="w-13 h-6 rounded cursor-pointer border-none bg-transparent"
        />
      </div>
    </div>
  );
}