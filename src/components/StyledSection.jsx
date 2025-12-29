import React from 'react';
import { Box } from '@mui/material';

const StyledSection = ({ children, sx }) => {
  return (
    <Box className="agri-card" sx={{ p: { xs: 2, md: 4 }, background: '#fff', ...sx }}>
      {children}
    </Box>
  );
};

export default StyledSection;
