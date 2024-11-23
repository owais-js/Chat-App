import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Button, IconButton, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../Config/FirebaseConfig';
import { collection, addDoc, doc, query, orderBy, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

const Chat = () => {
  const { logout, currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [messageDeleted, setMessageDeleted] = useState(true)
  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        if (editingMessageId) {
          await updateDoc(doc(db, 'messages', editingMessageId), {
            text: newMessage,
            edited: true,
          });
          setEditingMessageId(null);
        } else {
          await addDoc(collection(db, 'messages'), {
            text: newMessage,
            sender: currentUser.email,
            createdAt: new Date(),
          });
        }
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  

  const handleEditMessage = (msg) => {
    setNewMessage(msg.text);
    setEditingMessageId(msg.id);
  };

  const handleCancelEdit = () => {
    setNewMessage('');
    setEditingMessageId(null);
  };

  const deleteForMe = async (id) => {
    try {
      setMessageDeleted(false);
      const docRef = doc(db, "messages", id);
      await updateDoc(docRef, {
        deleteForMe: arrayUnion(currentUser.uid),
      });
      handleCloseMenu();
      setMessageDeleted(true);
    } catch (error) {
      console.error("Error deleting message for me:", error);
      
    }
  };

  const deleteForAll = async (id) => {
    try {
      setMessageDeleted(false);
      const docRef = doc(db, 'messages', id);
      await updateDoc(docRef, {
        deleteForAll: true,
        text: "",
      });
      handleCloseMenu();
      setMessageDeleted(true);
    } catch (error) {
      console.error("Error deleting message for everyone:", error);
      
    }
  };

  const handleOpenMenu = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMessageId(null);
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', padding: '2rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Paper sx={{ padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Chat Room</Typography>
          <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Paper>

        <Box sx={{ flex: 1, padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', overflowY: 'auto', backgroundColor: '#f5f5f5', height: '70vh' }}>
          {messages.map((msg) => {
            const isDeletedForAll = msg.deleteForAll;
            const isDeletedForMe = msg.deleteForMe?.includes(currentUser.uid);

            if (isDeletedForMe) {
              return null;
            }

            return (
              <Box key={msg.id} sx={{ margin: '0.5rem 0', textAlign: msg.sender === currentUser.email ? 'right' : 'left', position: 'relative' }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-block',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    marginRight: '2%',
                    backgroundColor: msg.sender === currentUser.email ? '#3a86ff' : '#e0e0e0',
                    color: msg.sender === currentUser.email ? '#fff' : '#000',
                    maxWidth: '80%',
                  }}
                >
                  {isDeletedForAll ? <span style={{ fontSize: '0.em', color: '#c0c0c0' }}> This message was deleted</span> : msg.text}
                  {msg.edited && !isDeletedForAll && (
                    <span style={{ fontSize: '0.8em', color: '#c0c0c0' }}> (edited)</span>
                  )}
                </Typography>

                {msg.sender === currentUser.email && !isDeletedForAll && (
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditMessage(msg)}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '-2px',
                        transform: 'translateY(-30%)',
                        color: '#ffc107',
                        padding: '4px',
                      }}
                    >
                      <EditIcon sx={{ fontSize: '18px' }} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={(event) => handleOpenMenu(event, msg.id)}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '-22px',
                        transform: 'translateY(-30%)',
                        color: '#c0c0c0',
                        padding: '4px'
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '18px' }} />
                    </IconButton>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
          {messageDeleted&&
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => deleteForMe(selectedMessageId)}>Delete for Me</MenuItem>
          <MenuItem onClick={() => deleteForAll(selectedMessageId)}>Delete for Everyone</MenuItem>
        </Menu>
        }
        <Box sx={{ padding: '1rem 0' }}>
          <Paper component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: '#f5f5f5' }}>
            <input
              type="text"
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#000',
                backgroundColor: '#fff',
              }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff', marginRight: '8px' }}>
              {editingMessageId ? 'Update' : 'Send'}
            </Button>
            {editingMessageId && (
              <Button onClick={handleCancelEdit} variant="outlined" sx={{ color: '#ff1744', borderColor: '#ff1744' }}>
                Cancel
              </Button>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
