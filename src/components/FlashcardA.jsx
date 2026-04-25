import React, { useState, useEffect, useRef } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CloseIcon from '@mui/icons-material/Close';
import HandwritingPad from '../components/HandwritingPad';

export default function FlashcardA({ onSave, type, isEditing, cardData, onSaveSuccess }) {
  const cardRef = useRef(null);
  const [char, setChar] = useState('');
  const [reading, setReading] = useState('');
  const [meaning, setMeaning] = useState('');
  const [strokes, setStrokes] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const saveSuccessTimeoutRef = useRef(null);

  useEffect(() => {
    if (isEditing && cardData) {
      setChar(cardData.char || '');
      setReading(cardData.reading || '');
      setMeaning(cardData.meaning || '');
      setStrokes(cardData.strokes || []);
    }
  }, [isEditing, cardData]);

  const handleSave = () => {
    if (onSave) {
      onSave({ char, reading, meaning, strokes }, type);
      setIsSaved(true);

      if (saveSuccessTimeoutRef.current) {
        clearTimeout(saveSuccessTimeoutRef.current);
      }

      saveSuccessTimeoutRef.current = setTimeout(() => {
        setIsSaved(false);
        if (onSaveSuccess) {
          onSaveSuccess();
        }
      }, 1000);

      if (!isEditing) {
        setChar('');
        setReading('');
        setMeaning('');
        setStrokes([]);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div ref={cardRef} className="w-screen flex justify-center">
        <div className="w-[340px] h-[1100px] md:h-[780px] md:w-[690px] pt-2 pb-2 flex justify-center items-center border-2 border-sec rounded-md bg-pri shadow-lg">
          <div className="w-[320px] h-[1080px] md:h-[760px] md:w-[670px] border-dashed border-gray [border-width:4px] flex flex-col">
            <div className="md:flex md:gap-3 md:pt-2 rounded items-center justify-center md:items-start">
              
              <div className="md:w-[350px] flex flex-col items-center">
                <Characters char={char} setChar={setChar} />
                <Readings reading={reading} setReading={setReading} />
              </div>
              
              <div className="md:w-[240px] flex flex-col items-center">
                <Meaning meaning={meaning} setMeaning={setMeaning} />
                <HandwritingPad initialStrokes={strokes} onStrokesChange={setStrokes} />
              </div>
              
            </div>
            
            <div className="flex justify-center md:w-1/2 md:mx-auto mt-6 md:mt-4">
              <button
                onClick={handleSave}
                className="bg-sec text-pri py-2 px-4 rounded-md flex justify-center items-center select-none"
              >
                {isSaved ? <BookmarkAddedIcon /> : <BookmarkIcon />}
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function Characters({ char, setChar }) {
  const [composing, setComposing] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    if (composing) {
      setChar(value);
    } else {
      const match = value.match(/[\u4e00-\u9fff\u3400-\u4dbf]/);
      if (match) {
        setChar(match[0]);
      }
    }
  };

  return (
    <div className="w-[220px] mb-2 flex flex-col justify-center items-center">
      <div className="w-[18px] h-[18px] rounded-lg flex justify-center items-center ml-auto relative top-7 right-3 md:left-11 hover:scale-110 transition-all">
        <button onClick={() => setChar(' ')}>
          <CloseIcon sx={{ fontSize: 20, color: '#E17879' }} />
        </button>
      </div>
      <textarea
        value={char}
        placeholder="日"
        onChange={handleChange}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={() => setComposing(false)}
        className="w-[220px] h-[220px] md:w-[335px] md:h-[335px] border-4 border-sec text-[8.5em] md:text-[210px] text-[#3E3E3E] text-center overflow-hidden focus:outline-none rounded-md placeholder-[#C7C7C7] placeholder-opacity-50"
      ></textarea>
    </div>
  );
}

function Readings({ reading, setReading }) {
  return (
    <div className="w-[290px] md:w-[335px] h-[190px] md:h-[270px] flex flex-col justify-center items-center mt-4 md:mt-4">
      <div className="w-full bg-tri text-pri rounded mb-auto flex justify-center items-center">
        <h1 className="text-2xl font-bold font-pt-serif px-2 md:text-xl">Reading</h1>
      </div>
      <textarea
        value={reading}
        rows={5}
        onChange={(e) => {
          const value = e.target.value;
          const lineCount = value.split('\n').length;
          if (lineCount <= 5) {
            setReading(value);
          }
        }}
        placeholder="e.g. ニチ..."
        className="w-[290px] md:w-[335px] h-[150px] md:h-[240px] md:text-xl border-2 border-sec overflow-hidden resize-none focus:outline-none rounded-md p-2 placeholder-[#C7C7C7]"
      ></textarea>
    </div>
  );
}

function Meaning({ meaning, setMeaning }) {
  return (
    <div className="w-[290px] h-[210px] md:w-[240px] md:h-[335px] flex flex-col justify-between items-center mt-4">
      <div className="w-full bg-tri text-pri rounded mb-auto flex justify-center items-center">
        <h1 className="text-2xl font-bold font-pt-serif px-2 md:text-xl">Meaning</h1>
      </div>
      <textarea
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        placeholder="e.g. Day, sun."
        className="w-[290px] md:w-[240px] h-[170px] md:h-[310px] md:text-xl border-2 border-sec overflow-hidden focus:outline-none rounded-md p-2 placeholder-[#C7C7C7]"
      ></textarea>
    </div>
  );
}