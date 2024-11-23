import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';


const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Dashboard = () => {
    const navigate = useNavigate();

    const handleStartChat = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                backgroundColor: '#121212',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f5f5f5',
                padding: '2rem',
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    color: '#00BCD4',
                    animation: `${fadeIn} 1s ease forwards`,
                }}
            >
                Welcome to ChatApp!
            </Typography>
            <Typography
                variant="h6"
                sx={{ marginBottom: '2rem', color: '#e0e0e0' }}
            >
                Connect with friends and family in real time.
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#3a86ff',
                    '&:hover': { backgroundColor: '#0056b3' },
                }}
                onClick={handleStartChat}
            >
                Start Chat
            </Button>
        </Box>
    );
};

export default Dashboard;
