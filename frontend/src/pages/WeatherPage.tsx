import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const WeatherPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 2, background: 'linear-gradient(135deg, #90caf9 0%, #a5d6a7 100%)', color: '#1b5e20' }}>
        <Typography variant="h4" gutterBottom>Weather Predictor</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Get the latest weather updates and farming tips for your region.
        </Typography>
        {/* TODO: Integrate weather API and show forecast */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Current Weather:</Typography>
          <Typography variant="body2">Sunny, 32°C (Sample Data)</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Farming Tip:</Typography>
          <Typography variant="body2">Water your crops early in the morning to reduce evaporation.</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default WeatherPage;
