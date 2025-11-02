import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar'; 
import CircleIcon from '@mui/icons-material/Circle';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';

export default function FlashcardCollectionPage() {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const collectionTitle = type === 'A' ? 'Character card ' : 'Phrase card';
  const localStorageKey = type === 'A' ? 'flashcardsA' : 'flashcardsB';

  useEffect(() => {
    try {
      const savedFlashcards = localStorage.getItem(localStorageKey);
      if (savedFlashcards) {
        setFlashcards(JSON.parse(savedFlashcards));
      } else {
        setFlashcards([]); 
      }
    } catch (error) {
      console.error(`Error loading flashcards of type ${type} from local storage:`, error);
      setFlashcards([]);
    }
  }, [type, localStorageKey]); 

  const handleDeleteClick = (index, event) => {
    event.stopPropagation(); 
    setCardToDelete(index);
    setShowDeleteConfirm(true);
  };

  const handleEditClick = (index, event) => {
    event.stopPropagation();
    navigate('/new', { 
      state: { 
        type: type,
        isEditing: true,
        cardIndex: index,
        cardData: flashcards[index]
      }
    });
  };

  const confirmDelete = () => {
    const updatedFlashcards = flashcards.filter((_, index) => index !== cardToDelete);
    setFlashcards(updatedFlashcards);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedFlashcards));
    setCardToDelete(null);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setCardToDelete(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-pale">
      <Navbar
        Icon={ArrowBackIosTwoToneIcon}
        iconProp={{ sx: { fontSize: 40, color: '#918578' } }}
        onIconClick={() => navigate('/')} 
      />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-sec mb-6 text-start font-poppins ">
          {collectionTitle}<AccountTreeIcon sx={{fontSize: 40 }}/>
        </h1>

        {flashcards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-tri py-5 px-6 rounded-lg shadow-md relative "
              >
                {type === 'A' ? (
                  <>
                    <h3 className="text-3xl bg-frth inline py-1 px-2 rounded font-bold mb-2 select-none">{card.char || '—'}</h3>
                    <p className="text-gray-700 mb-1 mt-1  select-none"><strong>Reading:</strong> {card.reading || 'N/A'}</p>
                    <p className="text-gray-700 select-none"><strong>Meaning:</strong> {card.meaning || 'N/A'}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg bg-frth inline py-1 px-2 rounded font-semibold mb-4 select-none">{card.title || 'No Title'}</h3>
                    <p className="text-gray-700 text-2xl mt-1 mb-1 select-none"><strong><CircleIcon sx={{fontSize: 14 }} /></strong> {card.expression || 'N/A'}</p>
                    <p className="text-gray-700 pl-[1px] select-none wrap "><strong><RadioButtonUncheckedIcon sx={{fontSize: 12 }} /></strong> {card.description || 'N/A'}</p>
                  </>
                )}
                
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteClick(index, e)}
                  className="absolute top-1 right-1  hover:bg-gray text-[#8D8D8D] p-2 transition-colors duration-200"
                  title="Delete this card"><DeleteIcon sx={{ fontSize: 20 }} />
                </button>
                
                {/* Edit Button */}
                <button
                  onClick={(e) => handleEditClick(index, e)}
                  className="absolute bottom-1 right-1  hover:bg-gray text-[#8D8D8D] p-2 transition-colors duration-200"
                  title="Edit this card"><EditIcon  sx={{ fontSize: 20 }}/>   
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg font-archivo-extra select-none">No flashcards found for this collection yet. Create some!</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-pale p-6 border-4 border-sec rounded-lg shadow-xl max-w-sm mx-4 animate-pop ">
            <h3 className="text-xl text-center font-semibold mb-4 text-gray-800 select-none">
              Are you sure?
            </h3>
            <p className="text-gray-600 text-center mb-6 select-none">
              This will permanently delete this card.
            </p>
            <div className="flex gap-3 justify-between ">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border-2 border-sec text-sec bg-transparent font-bold rounded select-none" 
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 border-2 border-sec bg-[#918578] text-pri font-bold rounded select-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}