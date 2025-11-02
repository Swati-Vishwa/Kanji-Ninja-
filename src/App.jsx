import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import './index.css';

import  HomePage from './pages/HomePage';
import  NewFlashcard from './pages/NewFlashcard';
import PageLoader from './components/PageLoader';
import FlashcardCollectionPage from './components/FlashcardCollectionPage';

function App() {
  return(<>
      <PageLoader>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<NewFlashcard/>} />
            <Route path="/flashcards/:type" element={<FlashcardCollectionPage/>} />
        </Routes>
      </PageLoader>  
  </>)
}

export default App;
