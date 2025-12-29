import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Search, Place, LocalShipping, Speed } from '@mui/icons-material';

interface TractorVendor {
  id: number;
  name: string;
  location: string;
  distanceKm: number;
  farePerHour: number;
  farePerKm: number;
  services: string[];
}

const MOCK_TRACTORS: TractorVendor[] = [
  { id: 1, name: 'Kisan Tractors', location: 'Warangal, IN', distanceKm: 12, farePerHour: 15, farePerKm: 0.8, services: ['Tilling', 'Transport'] },
  { id: 2, name: 'AgriMove', location: 'Hyderabad, IN', distanceKm: 28, farePerHour: 18, farePerKm: 1.0, services: ['Harvest Transport'] },
  { id: 3, name: 'FieldForce', location: 'Des Moines, US', distanceKm: 6, farePerHour: 20, farePerKm: 0.9, services: ['Tilling', 'Ploughing', 'Transport'] },
];

const TractorHirePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [maxDistance, setMaxDistance] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'distance' | 'fare'>('distance');
  // ...existing code...

  const results = useMemo(() => {
    let list = MOCK_TRACTORS.filter((t) => {
      const matchesQuery = query ? t.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesLocation = location ? t.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesDistance = maxDistance !== '' ? t.distanceKm <= Number(maxDistance) : true;
      return matchesQuery && matchesLocation && matchesDistance;
    });
    list = list.sort((a, b) => sortBy === 'distance' ? a.distanceKm - b.distanceKm : a.farePerHour - b.farePerHour);
    return list;
  }, [query, location, maxDistance, sortBy]);

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=1500&q=80)', // Tractor in field
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    }}>
      {/* Translator Bar */}
    
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{
          p: 4,
          mb: 2,
          color: 'white',
          background: 'rgba(0,0,0,0.45)',
          position: 'relative',
        }}>
          <Typography variant="h4" gutterBottom>
            Hire Tractors
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Compare by nearest distance and lowest fare to minimize costs
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, mb: 2, background: 'rgba(255,255,255,0.85)' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search vendor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
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
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              fullWidth
              type="number"
              label="Max Distance (km)"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value === '' ? '' : Number(e.target.value))}
              InputProps={{ startAdornment: <InputAdornment position="start"><Speed /></InputAdornment> }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <TextField select fullWidth label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <MenuItem value="distance">Nearest</MenuItem>
              <MenuItem value="fare">Lowest Fare</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

        <Grid container spacing={3}>
        {results.map((t) => (
          <Grid item xs={12} md={4} key={t.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocalShipping />
                  <Typography variant="h6">{t.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t.location}</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Chip label={`Distance: ${t.distanceKm} km`} size="small" />
                  <Chip label={`Fare/hr: $${t.farePerHour}`} size="small" />
                  <Chip label={`Fare/km: $${t.farePerKm}`} size="small" />
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {t.services.map((s) => <Chip key={s} label={s} size="small" />)}
                </Box>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small">Request Quote</Button>
                <Button variant="outlined" size="small">Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

        {/* ...removed decor picker and section... */}
      </Container>
    </Box>
  );
};

export default TractorHirePage;


