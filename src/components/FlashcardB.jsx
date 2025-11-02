import React, { useState, useEffect, useRef } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export default function FlashcardB({ onSave, type, isEditing, cardData, onSaveSuccess }) {
  const [title, setTitle] = useState('');
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const saveSuccessTimeoutRef = useRef(null);

  // Initialize form with card data if editing
  useEffect(() => {
    if (isEditing && cardData) {
      setTitle(cardData.title || '');
      setExpression(cardData.expression || '');
      setDescription(cardData.description || '');
    }
  }, [isEditing, cardData]);

  const handleSave = () => {
    if (onSave) {
      onSave({ title, expression, description }, type);
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
        setTitle('');
        setExpression('');
        setDescription('');
      }
    }
  };

  return (
    <div className="w-[340px] h-[700px] md:h-[760px] md:w-[600px] border-2 flex justify-center items-center rounded-md bg-pri">
      <div className="w-[320px] h-[680px] md:h-[730px] md:w-[580px] border border-dashed border-gray [border-width:4px] flex flex-col gap-4 items-center rounded-lg py-5">

        {/* Title */}
        <div className="w-[300px] h-[50px] md:w-[320px] flex justify-center items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
            className="w-[290px] h-[50px] md:w-[320px] text-center text-pri bg-tri rounded font-bold text-3xl resize-none focus:outline-none placeholder-[#D8D8D8] placeholder-opacity-60"
          />
        </div>

        {/* Expression */}
        <div className="w-[290px] md:w-[470px] h-[150px] flex justify-center">
          <textarea
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. vocab, grammar, phrases, etc"
            className="w-[290px] md:w-[470px] h-[150px] text-center font-bold text-2xl md:text-4xl border-2 border-sec overflow-hidden resize-none focus:outline-none rounded-md p-2 font-poppins placeholder-[#C7C7C7] placeholder:text-[15px]"
          ></textarea>
        </div>

        {/* Description */}
        <div className="w-[300px] md:w-[480px] h-[330px] flex justify-center">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. description..."
            className="w-[290px] md:w-[470px] h-[300px] md:h-[340px] text-md md:text-2xl border-2 border-sec overflow-hidden focus:outline-none rounded-md p-2 font-poppins placeholder-[#C7C7C7] placeholder:text-[15px]"
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center md:mx-auto md:mt-5">
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
  );
}
