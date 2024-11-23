import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound/>} />
          <Route
            path="/chat"  
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
