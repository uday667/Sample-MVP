import React from 'react';
import { Box } from '@mui/material';

interface DecorSectionProps {
  items: string[];
}

const DecorSection: React.FC<DecorSectionProps> = ({ items }) => {
  if (!items?.length) return null;
  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      justifyContent: 'center',
      py: 2,
    }}>
      {items.map((src, idx) => (
        <Box
          key={`${src}-${idx}`}
          component="img"
          src={src}
          alt="decor"
          sx={{
            width: { xs: 120, sm: 140, md: 160 },
            height: { xs: 120, sm: 140, md: 160 },
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            transition: 'transform 300ms ease, box-shadow 300ms ease',
            ':hover': { transform: 'translateY(-4px) scale(1.02)', boxShadow: '0 10px 24px rgba(0,0,0,0.18)' },
            animation: 'decorPop 600ms ease',
          }}
        />
      ))}
      <style>{`
        @keyframes decorPop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default DecorSection;


