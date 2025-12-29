import React from 'react';
import { Container, Typography, Paper, Box, Card, CardContent } from '@mui/material';

const MOCK_CENTERS = [
  { name: 'GreenMart Store', location: 'Warangal, IN', contact: '+91-90000-12345' },
  { name: 'AgriProduction Hub', location: 'Hyderabad, IN', contact: '+91-98888-55667' },
  { name: 'Farmers Direct', location: 'Vijayawada, IN', contact: '+91-91234-56789' },
];

const ProductionCentersPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 2, background: 'linear-gradient(135deg, #a5d6a7 0%, #fffde7 100%)', color: '#1b5e20' }}>
        <Typography variant="h4" gutterBottom>Production Centers & Stores</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Find nearby stores and production centers to sell your crops directly.
        </Typography>
        <Box sx={{ mt: 2 }}>
          {MOCK_CENTERS.map((center, idx) => (
            <Card key={idx} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{center.name}</Typography>
                <Typography variant="body2">Location: {center.location}</Typography>
                <Typography variant="body2">Contact: {center.contact}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductionCentersPage;
