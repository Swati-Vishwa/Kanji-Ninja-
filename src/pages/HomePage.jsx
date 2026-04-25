import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/Navbar';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CardSelectPopUp from '../components/CardSelectPopUp';
import CategoryIcon from '@mui/icons-material/Category';


export default function HomePage() {
  const [showSelector, setShowSelector] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate('/new', { state: { type } });
    setShowSelector(false);
  };

  const handleViewCollection = (type) => {
    navigate(`/flashcards/${type}`);
  };

  return (
    <main className="min-h-screen bg-pale relative pb-20">
      <Navbar />

      <div className="container mx-auto p-4">
        <h2 className="flex justify-start items-center gap-2 text-4xl font-bold text-tri mb-6 text-start font-montserrat select-none">Your Collections <CategoryIcon sx={{fontSize: 34}}/></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 md:px-10">
          {/* Flashcard A */}
          <div
            className="flex gap-4 justify-center items-center md:justify-start bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200 cursor-pointer select-none hover:shadow-lg hover:scale-105 transition"
            onClick={() => handleViewCollection('A')}
          >
            <img src="/CardA.jpg" alt="Flashcard A" className="rounded-md w-full max-w-[110px] mb-4 border select-none img-no-right-click " />
            <div className="flex flex-col items-start mb-auto ">
              <h3 className="text-2xl text-[#C59A9C] font-black font-josefin-sans">Character card</h3>
              <p className="text-[#888888] text-md mt-2 font-open-sans">View all your saved Flashcard entries.</p>
            </div>
          </div>

          {/* Flashcard B */}
          <div
            className="flex gap-4 justify-center items-center md:justify-start bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200 cursor-pointer select-none  hover:shadow-lg hover:scale-105 transition"
            onClick={() => handleViewCollection('B')}
          >
            <img src="/CardB.jpg" alt="Flashcard B" className="rounded-md w-full max-w-[110px] mb-4 border select-none img-no-right-click" />
            <div className="flex flex-col items-start mb-auto">
              <h3 className="text-2xl text-acc1 font-black font-josefin-sans">Phrase card</h3>
              <p className="text-[#888888] mt-2 font-open-sans">View all your saved Flashcard entries.</p>
            </div>
          </div>
        </div>
      </div>

      {showSelector && (
        <CardSelectPopUp
          onSelect={handleSelect}
          onClose={() => setShowSelector(false)}
        />
      )}

      <BottomTaskBar onEditClick={() => setShowSelector(true)} />
    </main>
  );
}

function BottomTaskBar({ onEditClick }) {
  return (
    <div className="fixed bottom-10 right-4">
      <Fab
        aria-label="edit"
        onClick={onEditClick}
        sx={{
          backgroundColor: '#DDA9B8',
          color: '#fff',
          '&:hover': { backgroundColor: '#FFC3D4' },
        }}
      >
        <EditIcon />
      </Fab>
    </div>
  );
}
