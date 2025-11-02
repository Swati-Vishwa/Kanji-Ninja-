import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';

import FlashcardA from '../components/FlashcardA';
import FlashcardB from '../components/FlashcardB';
import Navbar from '../components/Navbar';

export default function NewFlashcard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, isEditing, cardIndex, cardData } = location.state || {};

  const saveFlashcard = (data, type) => {
    try {
      const localStorageKey = type === 'A' ? 'flashcardsA' : 'flashcardsB';
      const savedFlashcards = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
      
      if (isEditing && cardIndex !== undefined) {
        savedFlashcards[cardIndex] = data;
      } else {
        savedFlashcards.push(data);
      }
      
      localStorage.setItem(localStorageKey, JSON.stringify(savedFlashcards));
    } catch (error) {
      alert("Error saving to local storage:", error);
    }
  };

  const handleBackNavigation = () => {
    if (isEditing) {
      navigate(`/flashcards/${type}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen h-[1400px] w-screen bg-pale">
      <Navbar
        Icon={ArrowBackIosTwoToneIcon}
        iconProp={{ sx: { fontSize: 40, color: '#918578' } }}
        onIconClick={handleBackNavigation}
      />

      <div className="w-[340px] h-[1250px] md:h-[580px] md:w-[800px] flex justify-center rounded-md mx-auto mt-10">
        {type === 'A' ? (
          <FlashcardA 
            onSave={saveFlashcard} 
            type="A" 
            isEditing={isEditing}
            cardData={cardData}
            onSaveSuccess={() => navigate(`/flashcards/${type}`)}
          />
        ) : type === 'B' ? (
          <FlashcardB 
            onSave={saveFlashcard} 
            type="B" 
            isEditing={isEditing}
            cardData={cardData}
            onSaveSuccess={() => navigate(`/flashcards/${type}`)}
          />
        ) : null}
      </div>
    </div>
  );
}