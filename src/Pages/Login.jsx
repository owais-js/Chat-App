import { useState } from 'react';
import { TextField, Button, Typography, Box, Card, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/FirebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();  
    setLoading(true);
    setError(null);  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat');  
    } catch (error) {
      setError(error.message);  
      console.error("Error logging in:", error);
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
          Log In
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#9e9e9e', mb: 2 }}>
          Welcome back!
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleLogin}>  
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
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        
        <Typography variant="body2" align="center" sx={{ mt: 2, color: '#9e9e9e' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#3a86ff', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
