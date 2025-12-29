import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { Search, Place, Groups } from '@mui/icons-material';

interface Middleman {
  id: number;
  name: string;
  location: string;
  coverageAreas: string[];
  totalLabours: number;
  phone?: string;
}

const MOCK_MIDDLEMEN: Middleman[] = [
  { id: 1, name: 'GreenBridge Associates', location: 'Andhra Pradesh, IN', coverageAreas: ['Vijayawada', 'Guntur'], totalLabours: 120, phone: '+91-90000-12345' },
  { id: 2, name: 'Harvest Hub', location: 'Maharashtra, IN', coverageAreas: ['Pune', 'Nashik'], totalLabours: 75, phone: '+91-98888-55667' },
  { id: 3, name: 'AgriLink Co-ordinators', location: 'Texas, US', coverageAreas: ['Dallas', 'Austin'], totalLabours: 90, phone: '+1-555-142-7788' },
];

const MiddlemenPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  // ...existing code...

  const results = useMemo(() => {
    return MOCK_MIDDLEMEN.filter((m) => {
      const matchesQuery = query ? m.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesLoc = location ? (m.location + ' ' + m.coverageAreas.join(' ')).toLowerCase().includes(location.toLowerCase()) : true;
      return matchesQuery && matchesLoc;
    });
  }, [query, location]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{
        p: 4,
        mb: 2,
        color: 'white',
        backgroundImage: 'url(https://images.unsplash.com/photo-1542349314-040a0034f4fe?auto=format&fit=crop&w=1400&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: 3,
        boxShadow: 4,
      }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)' }} />
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#ffe082', textShadow: '2px 2px 8px #388e3c' }}>
            Middlemen Directory
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.95, color: '#fffde7', mb: 2 }}>
            Centralized coordinators to aggregate and mobilize labour quickly
          </Typography>
          <Box sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2, p: 2, mt: 2, color: '#388e3c', maxWidth: 420, mx: 'auto' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>How to use:</Typography>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Search by organization or location</li>
              <li>Click on a card for contact details</li>
              <li>Use keyboard navigation for accessibility</li>
            </ul>
          </Box>
        </Box>
      </Paper>

  <Paper sx={{ p: 2, mb: 2, background: 'rgba(255,255,255,0.95)', borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search organizations"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location / Coverage"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Place /></InputAdornment> }}
            />
          </Grid>
        </Grid>
      </Paper>

  <Grid container spacing={3}>
        {results.map((m) => (
          <Grid key={m.id} item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar><Groups /></Avatar>
                  <Box>
                    <Typography variant="h6">{m.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{m.location}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Coverage Areas:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                  {m.coverageAreas.map((area) => <Chip key={area} label={area} size="small" />)}
                </Box>
                <Typography variant="body2">
                  Total registered labourers: <strong>{m.totalLabours}</strong>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">Contact</Button>
                {m.phone && <Button size="small" variant="text">{m.phone}</Button>}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ...removed decor picker and section for accessibility... */}
    </Container>
  );
};

export default MiddlemenPage;


