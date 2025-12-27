import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ImageList,
  ImageListItem,
  IconButton,
  Box,
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';

interface DecorPickerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (urls: string[]) => void;
}

const DECOR_OPTIONS: string[] = [
  'https://media.giphy.com/media/l3vR3z8jZ8r7YQnSU/giphy.gif',
  'https://media.giphy.com/media/3o6Zt4zj5Qv2iG9G7q/giphy.gif',
  'https://media.giphy.com/media/26BoEJ8QDXp2X2NqQ/giphy.gif',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=60',
];

const DecorPicker: React.FC<DecorPickerProps> = ({ open, onClose, onAdd }) => {
  const handleAddSingle = (url: string) => {
    onAdd([url]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select flowers/plants to add</DialogTitle>
      <DialogContent>
        <ImageList variant="masonry" cols={3} gap={8} sx={{ m: 0 }}>
          {DECOR_OPTIONS.map((src) => (
            <ImageListItem key={src} sx={{ position: 'relative', cursor: 'pointer' }}>
              <Box
                component="img"
                src={src}
                alt="decor"
                loading="lazy"
                sx={{ width: '100%', borderRadius: 1, display: 'block' }}
                onClick={() => handleAddSingle(src)}
              />
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleAddSingle(src)}
                sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'white' }}
              >
                <AddPhotoAlternate fontSize="small" />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
    </Dialog>
  );
};

export default DecorPicker;


