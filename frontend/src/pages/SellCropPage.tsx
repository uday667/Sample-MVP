import React from 'react';
import { Container, Typography, Paper, Box, Button, TextField } from '@mui/material';

const SellCropPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 2, background: 'linear-gradient(135deg, #c8e6c9 0%, #fffde7 100%)', color: '#388e3c' }}>
        <Typography variant="h4" gutterBottom>Sell Your Crop</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          List your crops for sale and connect directly to stores and production centers.
        </Typography>
        {/* TODO: Add form and direct connection logic */}
        <Box sx={{ mt: 2 }}>
          <TextField fullWidth label="Crop Name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Quantity (kg)" sx={{ mb: 2 }} />
          <TextField fullWidth label="Expected Price (₹)" sx={{ mb: 2 }} />
          <Button variant="contained" color="primary">List Crop</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SellCropPage;
