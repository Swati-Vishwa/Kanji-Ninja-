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

  useEffect(() => {
    if (initialStrokes.length > 0) {
      setStrokes(initialStrokes);
      redrawCanvas(initialStrokes);
    }
  }, [initialStrokes]);

  const redrawCanvas = (allStrokes) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const currentStroke = useRef(null);

  const startDrawing = (e) => {
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
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchcancel', stopDrawing);
    };
  }, [isDrawing, lastPosition, penColor, lineWidth]);

  return (
    <div className="w-[300px] h-[400px] flex flex-col items-center mt-3">
      <div className="w-[280px] relative top-7 z-20 flex justify-between">
        <button onClick={clearCanvas}>
          <CloseIcon sx={{ fontSize: 20, color: '#E17879' }} />
        </button>
      </div>

      <div className="w-[290px] h-[290px]">
        <canvas
          ref={canvasRef}
          width={290}
          height={290}
          className="w-[290px] h-[290px] bg-white rounded-md border-2 border-sec"
          style={{ touchAction: 'none' }}
        />
      </div>

      <div className="w-[260px] flex justify-center items-center gap-10 mt-2">
        <Slider
          sx={{color: '#CDE2CA'}}
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
          className="w-10 h-6"
        />
      </div>
    </div>
  );
}
