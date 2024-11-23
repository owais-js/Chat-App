import React from 'react';
import { Box, Typography } from '@mui/material';


const NotFound = () => {
 
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
                }}
            >
                Error 404
            </Typography>
            <Typography
                variant="h6"
                sx={{ marginBottom: '2rem', color: '#e0e0e0' }}
            >
                Page not found..!
            </Typography>

        </Box>
    );
};

export default NotFound;
