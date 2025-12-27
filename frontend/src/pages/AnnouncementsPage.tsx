
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
  Box,
} from '@mui/material';
import { Search, Campaign, Event, Place } from '@mui/icons-material';

interface Announcement {
  id: number;
  title: string;
  body: string;
  category: 'GOVT' | 'MARKET' | 'WEATHER' | 'GENERAL';
  location?: string;
  date: string;
}

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/api/announcements')
      .then(res => {
        if (Array.isArray(res.data)) {
          setAnnouncements(res.data);
        }
      })
      .catch(() => {
        setAnnouncements([]);
      });
  }, []);

  const results = useMemo(() => {
    return announcements.filter((a) => {
      const matchesQuery = query ? (a.title + ' ' + a.body).toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCat = category ? a.category === category : true;
      const matchesLoc = location ? (a.location || '').toLowerCase().includes(location.toLowerCase()) : true;
      return matchesQuery && matchesCat && matchesLoc;
    });
  }, [announcements, query, category, location]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{
        p: 4,
        mb: 2,
        color: 'white',
        backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)' }} />
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Government circulars, market insights, and weather alerts for your region
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search announcements"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField select fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value=""></option>
              <option value="GOVT">Government</option>
              <option value="MARKET">Market</option>
              <option value="WEATHER">Weather</option>
              <option value="GENERAL">General</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Place /></InputAdornment> }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {results.map((a) => (
          <Grid item xs={12} md={6} key={a.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Campaign />
                  <Typography variant="h6">{a.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {(a.location || 'General')} • <Event sx={{ fontSize: 16, verticalAlign: 'middle' }} /> {new Date(a.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{a.body}</Typography>
                <Chip size="small" label={a.category} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AnnouncementsPage;


