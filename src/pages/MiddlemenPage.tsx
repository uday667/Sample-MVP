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
  Rating,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Search, Place, Groups, Phone, Mail, LocationOn, TrendingUp, Business } from '@mui/icons-material';

interface Middleman {
  id: number;
  name: string;
  location: string;
  coverageAreas: string[];
  totalLabours: number;
  phone?: string;
  email?: string;
  rating?: number;
  yearsInBusiness?: number;
  description?: string;
}

const MOCK_MIDDLEMEN: Middleman[] = [
  {
    id: 1,
    name: 'GreenBridge Associates',
    location: 'Andhra Pradesh, IN',
    coverageAreas: ['Vijayawada', 'Guntur', 'Visakhapatnam'],
    totalLabours: 120,
    phone: '+91-90000-12345',
    email: 'contact@greenbridge.com',
    rating: 4.7,
    yearsInBusiness: 5,
    description: 'Leading labour coordinator serving agricultural sector with 120+ verified workers.',
  },
  {
    id: 2,
    name: 'Harvest Hub',
    location: 'Maharashtra, IN',
    coverageAreas: ['Pune', 'Nashik', 'Aurangabad', 'Solapur'],
    totalLabours: 75,
    phone: '+91-98888-55667',
    email: 'info@harvesthub.com',
    rating: 4.5,
    yearsInBusiness: 4,
    description: 'Specialized in seasonal agricultural workforce management and placement.',
  },
  {
    id: 3,
    name: 'AgriLink Co-ordinators',
    location: 'Texas, US',
    coverageAreas: ['Dallas', 'Austin', 'Houston', 'San Antonio'],
    totalLabours: 90,
    phone: '+1-555-142-7788',
    email: 'support@agrilink.com',
    rating: 4.8,
    yearsInBusiness: 7,
    description: 'Premium labour coordination for large-scale farming operations.',
  },
  {
    id: 4,
    name: 'FarmForce Managers',
    location: 'Punjab, IN',
    coverageAreas: ['Chandigarh', 'Mohali', 'Ludhiana', 'Amritsar'],
    totalLabours: 110,
    phone: '+91-95555-67890',
    email: 'admin@farmforce.com',
    rating: 4.6,
    yearsInBusiness: 6,
    description: 'Expert in mobilizing trained agricultural workforce for diverse tasks.',
  },
  {
    id: 5,
    name: 'CropCrew Solutions',
    location: 'California, US',
    coverageAreas: ['San Francisco', 'Los Angeles', 'San Diego', 'Sacramento'],
    totalLabours: 200,
    phone: '+1-555-987-6543',
    email: 'hello@cropcrew.com',
    rating: 4.9,
    yearsInBusiness: 8,
    description: 'Largest farm labour network on West Coast with cutting-edge matching technology.',
  },
];

const MiddlemenPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedMiddleman, setSelectedMiddleman] = useState<Middleman | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const results = useMemo(() => {
    return MOCK_MIDDLEMEN.filter((m) => {
      const matchesQuery = query ? m.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesLoc = location
        ? (m.location + ' ' + m.coverageAreas.join(' ')).toLowerCase().includes(location.toLowerCase())
        : true;
      return matchesQuery && matchesLoc;
    });
  }, [query, location]);

  const handleOpenDialog = (middleman: Middleman) => {
    setSelectedMiddleman(middleman);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMiddleman(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
            Middlemen & Labour Coordinators
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            Connect with verified coordinators to mobilize skilled workforce quickly
          </Typography>
          <Chip label={`${results.length} coordinators available`} color="success" icon={<Business />} sx={{ fontSize: '1rem', p: 2 }} />
        </Box>

        {/* Search Filters */}
        <Paper sx={{ p: 3, mb: 4, background: 'white', boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
            <Search sx={{ mr: 1, verticalAlign: 'middle' }} />
            Search & Filter
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by organization name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location / Coverage Area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Place /></InputAdornment>,
                }}
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {results.map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                  boxShadow: 2,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-8px)',
                  },
                  border: '1px solid #e0e0e0',
                  overflow: 'hidden',
                }}
              >
                {/* Header with rating */}
                <Box sx={{ bgcolor: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)', color: 'white', p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ opacity: 0.9, fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      Labour Coordinator
                    </Typography>
                  </Box>
                  {m.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(255,255,255,0.2)', px: 1, py: 0.5, borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{m.rating.toFixed(1)}</Typography>
                    </Box>
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Name & Avatar */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: '#2e7d32', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {m.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                        {m.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#ff6f00', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TrendingUp sx={{ fontSize: 14 }} />
                        {m.yearsInBusiness} years in business
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Description */}
                  {m.description && (
                    <Typography variant="body2" sx={{ color: '#666', mb: 1.5, fontSize: '0.9rem' }}>
                      {m.description}
                    </Typography>
                  )}

                  {/* Location */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 1.5 }}>
                    <LocationOn sx={{ fontSize: 16, color: '#ff6f00', mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#333', fontWeight: '500' }}>
                      {m.location}
                    </Typography>
                  </Box>

                  {/* Coverage Areas */}
                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.8, fontWeight: 'bold' }}>
                      Coverage Areas
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {m.coverageAreas.slice(0, 3).map((area) => (
                        <Chip
                          key={area}
                          label={area}
                          size="small"
                          sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontSize: '0.75rem' }}
                        />
                      ))}
                      {m.coverageAreas.length > 3 && (
                        <Chip label={`+${m.coverageAreas.length - 3}`} size="small" variant="outlined" />
                      )}
                    </Box>
                  </Box>

                  {/* Workers Count */}
                  <Box sx={{ bgcolor: '#f0f0f0', p: 1.5, borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>Available Workers</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                        {m.totalLabours}+
                      </Typography>
                    </Box>
                    <Groups sx={{ fontSize: 40, color: '#2e7d32', opacity: 0.3 }} />
                  </Box>
                </CardContent>

                <CardActions sx={{ borderTop: '1px solid #e0e0e0', bgcolor: '#fafafa', flexDirection: 'column', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: '#2e7d32', textTransform: 'capitalize', '&:hover': { bgcolor: '#1b5e20' } }}
                    onClick={() => handleOpenDialog(m)}
                  >
                    View Details
                  </Button>
                  {m.phone && (
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Phone sx={{ fontSize: 16 }} />}
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {m.phone}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {results.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', boxShadow: 2 }}>
            <Typography variant="h6" sx={{ color: '#999' }}>
              No coordinators found matching your search. Try different keywords.
            </Typography>
          </Paper>
        )}

        {/* Details Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          {selectedMiddleman && (
            <>
              <DialogTitle sx={{ bgcolor: '#2e7d32', color: 'white', fontWeight: 'bold' }}>
                {selectedMiddleman.name}
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, color: '#2e7d32' }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Phone sx={{ color: '#2e7d32' }} />
                  <Typography variant="body2">{selectedMiddleman.phone || 'N/A'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Mail sx={{ color: '#2e7d32' }} />
                  <Typography variant="body2">{selectedMiddleman.email || 'N/A'}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#2e7d32' }}>
                  Coverage Areas
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                  {selectedMiddleman.coverageAreas.map((area) => (
                    <Chip key={area} label={area} color="primary" sx={{ bgcolor: '#e8f5e9' }} />
                  ))}
                </Box>

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, color: '#2e7d32' }}>
                  Workers Available
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
                  {selectedMiddleman.totalLabours}+ verified workers
                </Typography>

                {selectedMiddleman.rating && (
                  <>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, color: '#2e7d32' }}>
                      Rating
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={selectedMiddleman.rating / 1} readOnly />
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffc107' }}>
                        {selectedMiddleman.rating.toFixed(1)} / 5
                      </Typography>
                    </Box>
                  </>
                )}
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleCloseDialog} variant="outlined">
                  Close
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#2e7d32' }} onClick={handleCloseDialog}>
                  Contact Now
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default MiddlemenPage;


