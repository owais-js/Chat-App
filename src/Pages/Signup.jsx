import { useState } from 'react';
import { TextField, Button, Typography, Box, Card, Alert } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/FirebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name) {
      setError("Please enter a name.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f5f5f5',
        padding: '2rem',
      }}
    >
      <Card
        elevation={4}
        sx={{
          padding: '2rem',
          borderRadius: '16px',
          backgroundColor: '#1f1f1f',
          color: '#e0e0e0',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#9e9e9e', mb: 2 }}>
          Join our community!
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSignup}>
          <TextField
            label="Name"
            type="text"
            variant="filled"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: '#b0b0b0' } }}
            sx={{
              input: { color: '#fff' },
              backgroundColor: '#333',
              borderRadius: '5px',
            }}
          />

          <TextField
            label="Email"
            type="email"
            variant="filled"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#b0b0b0' } }}
            sx={{
              input: { color: '#fff' },
              backgroundColor: '#333',
              borderRadius: '5px',
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#b0b0b0' } }}
            sx={{
              input: { color: '#fff' },
              backgroundColor: '#333',
              borderRadius: '5px',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: '#3a86ff',
              color: '#fff',
              fontWeight: 'bold',
              marginTop: '1rem',
              padding: '0.75rem',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        
        <Typography variant="body2" align="center" sx={{ mt: 2, color: '#9e9e9e' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#3a86ff', textDecoration: 'none' }}>
            Log In
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Signup;
