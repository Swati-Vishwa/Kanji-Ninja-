import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

function ScreenLoader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        bgcolor: '#FCFBEE',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
    >
      <CircularProgress size={70} sx={{ color: '#DDA9B8' }}/>
    </Box>
  );
}

export default function PageLoader({ children }) {
	  const location = useLocation();
	  const [loading, setLoading] = useState(true); 
	
	  useEffect(() => {
		setLoading(true);
		
		const timer = setTimeout(() => {
			setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
     }, [location]);
   
   return (
    <>
      {loading && <ScreenLoader />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}>
        {children}
      </div>
    </>
  ); 
}