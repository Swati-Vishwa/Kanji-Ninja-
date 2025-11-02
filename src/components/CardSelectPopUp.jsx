import React from 'react';

export default function CardSelectPopUp({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-pale p-5 rounded-xl w-[90%] max-w-[650px] border-4 border-sec shadow-lg animate-pop ">

        <h2 className="text-xl md:text-3xl font-bold text-center mb-4">Choose Flashcard Type</h2>

        <div className="grid grid-cols-2 gap-4">
        
          <div onClick={() => onSelect('A')} className="cursor-pointer w-full flex flex-col justify-center items-center select-none hover:scale-105 transition ">
            <img src="/CardA.jpg" alt="Flashcard A" className="rounded-md w-full border select-none img-no-right-click" />
          </div>
          
          <div onClick={() => onSelect('B')} className="cursor-pointer w-full flex flex-col justify-center items-center select-none hover:scale-105 transition  ">
            <img src="/CardB.jpg" alt="Flashcard B" className="h-[164px] md:h-[333px] rounded-md w-full border select-none img-no-right-click" />
          </div>
          
        </div>

        <button onClick={onClose} className="block mx-auto mt-5 text-md md:text-lg bg-sec text-pri px-4 py-2 md:px-5 md:py-3 rounded hover:bg-pri hover:border-2 hover:border-sec hover:text-sec transition-all duration-300 ease-in ">Cancel</button>
      </div>
    </div>
  );
}
