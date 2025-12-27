import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  Avatar,
  CircularProgress,
} from '@mui/material';
import StyledSection from '../components/StyledSection';
import { Send, SmartToy } from '@mui/icons-material';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      message: "Hello! I'm AgriHelp, your AI agricultural assistant. How can I help you today?",
      sender: 'AI',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'USER',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: `I understand you're asking about "${inputMessage}". This is a simulated AI response. In the real implementation, this would connect to the AI service for agricultural guidance.`,
        sender: 'AI',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledSection sx={{ height: '72vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            🤖 AgriHelp AI Assistant
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get instant agricultural guidance and support
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  flexDirection: message.sender === 'USER' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: message.sender === 'USER' ? 'primary.main' : 'secondary.main',
                    mr: message.sender === 'AI' ? 2 : 0,
                    ml: message.sender === 'USER' ? 2 : 0,
                  }}
                >
                  {message.sender === 'USER' ? 'U' : <SmartToy />}
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: message.sender === 'USER' ? 'primary.main' : 'grey.100',
                    color: message.sender === 'USER' ? 'white' : 'text.primary',
                    maxWidth: '72%',
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{message.message}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 1,
                      opacity: 0.75,
                      textAlign: 'right',
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
            {loading && (
              <ListItem>
                <Avatar sx={{ backgroundColor: 'secondary.main', mr: 2 }}>
                  <SmartToy />
                </Avatar>
                <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2">AI is thinking...</Typography>
                  </Box>
                </Paper>
              </ListItem>
            )}
          </List>
        </Box>
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask me anything about agriculture..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || loading}
              startIcon={<Send />}
              className="agri-cta"
            >
              Send
            </Button>
          </Box>
        </Box>
      </StyledSection>
    </Container>
  );
};

export default ChatPage;
