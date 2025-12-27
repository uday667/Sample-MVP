import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const NewsPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 2, background: 'linear-gradient(135deg, #ffe082 0%, #fffde7 100%)', color: '#6d4c41' }}>
        <Typography variant="h4" gutterBottom>Agricultural News</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Stay updated with the latest news and government circulars for farmers.
        </Typography>
        {/* TODO: Integrate news API and show headlines */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Latest News:</Typography>
          <Typography variant="body2">Corn prices increased by 12% this week. (Sample Data)</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewsPage;
