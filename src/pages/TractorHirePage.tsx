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
  Rating,
  Avatar,
  Divider,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Search, Place, LocalShipping, Speed, LocationOn, TrendingUp } from '@mui/icons-material';

interface TractorVendor {
  id: number;
  name: string;
  location: string;
  distanceKm: number;
  farePerHour: number;
  farePerKm: number;
  services: string[];
  rating?: number;
  tractorCount?: number;
  phone?: string;
  yearsInBusiness?: number;
}

const MOCK_TRACTORS: TractorVendor[] = [
  {
    id: 1,
    name: 'Kisan Tractors',
    location: 'Warangal, IN',
    distanceKm: 12,
    farePerHour: 15,
    farePerKm: 0.8,
    services: ['Tilling', 'Transport', 'Ploughing'],
    rating: 4.6,
    tractorCount: 15,
    phone: '+91-9876543210',
    yearsInBusiness: 4,
  },
  {
    id: 2,
    name: 'AgriMove',
    location: 'Hyderabad, IN',
    distanceKm: 28,
    farePerHour: 18,
    farePerKm: 1.0,
    services: ['Harvest Transport', 'Bulk Material Transport'],
    rating: 4.4,
    tractorCount: 22,
    phone: '+91-9876543211',
    yearsInBusiness: 5,
  },
  {
    id: 3,
    name: 'FieldForce',
    location: 'Des Moines, US',
    distanceKm: 6,
    farePerHour: 20,
    farePerKm: 0.9,
    services: ['Tilling', 'Ploughing', 'Transport', 'Grading'],
    rating: 4.9,
    tractorCount: 35,
    phone: '+1-5551234567',
    yearsInBusiness: 8,
  },
  {
    id: 4,
    name: 'GreenFields Rentals',
    location: 'Punjab, IN',
    distanceKm: 18,
    farePerHour: 17,
    farePerKm: 0.85,
    services: ['Tilling', 'Sowing', 'Harvesting Support'],
    rating: 4.7,
    tractorCount: 28,
    phone: '+91-9876543212',
    yearsInBusiness: 6,
  },
  {
    id: 5,
    name: 'QuickTractor',
    location: 'California, US',
    distanceKm: 3,
    farePerHour: 22,
    farePerKm: 1.1,
    services: ['Emergency Transport', 'Tilling', 'Professional Operators'],
    rating: 4.8,
    tractorCount: 42,
    phone: '+1-5551234568',
    yearsInBusiness: 7,
  },
];

const TractorHirePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [maxDistance, setMaxDistance] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'distance' | 'fare' | 'rating'>('distance');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Vendor Name',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: '#2e7d32' }}>{params.row.name.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>{params.row.name}</Typography>
            <Typography variant="caption" sx={{ color: '#999' }}>{params.row.yearsInBusiness} yrs in business</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOn sx={{ fontSize: 16, color: '#ff6f00' }} />
          <Typography variant="body2">{params.row.location}</Typography>
        </Box>
      ),
    },
    {
      field: 'distanceKm',
      headerName: 'Distance',
      width: 110,
      renderCell: (params) => (
        <Chip label={`${params.row.distanceKm} km`} size="small" sx={{ bgcolor: '#e3f2fd' }} />
      ),
    },
    {
      field: 'farePerHour',
      headerName: '$/Hour',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
          ${params.row.farePerHour}
        </Typography>
      ),
    },
    {
      field: 'farePerKm',
      headerName: '$/KM',
      width: 90,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff6f00' }}>
          ${params.row.farePerKm}
        </Typography>
      ),
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Rating value={params.row.rating ? params.row.rating / 1 : 0} readOnly size="small" />
          <Typography variant="caption" sx={{ color: '#ffc107', fontWeight: 'bold' }}>
            {params.row.rating?.toFixed(1)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'services',
      headerName: 'Services',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', py: 1 }}>
          {params.row.services.slice(0, 2).map((s: string) => (
            <Chip key={s} label={s} size="small" color="primary" variant="outlined" sx={{ bgcolor: '#e8f5e9' }} />
          ))}
          {params.row.services.length > 2 && <Chip label={`+${params.row.services.length - 2}`} size="small" />}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Button variant="contained" size="small" sx={{ bgcolor: '#2e7d32', textTransform: 'capitalize' }}>
          Book Now
        </Button>
      ),
    },
  ];

  const results = useMemo(() => {
    let list = MOCK_TRACTORS.filter((t) => {
      const matchesQuery = query ? t.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesLocation = location ? t.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesDistance = maxDistance !== '' ? t.distanceKm <= Number(maxDistance) : true;
      const matchesRating = minRating !== '' ? (t.rating || 0) >= Number(minRating) : true;
      return matchesQuery && matchesLocation && matchesDistance && matchesRating;
    });
    list = list.sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'fare') return a.farePerHour - b.farePerHour;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
    return list;
  }, [query, location, maxDistance, minRating, sortBy]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
            Hire Tractors & Farm Equipment
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            Find nearest vendors with lowest fares and highest ratings
          </Typography>
          <Chip label={`${results.length} vendors available`} color="success" icon={<LocalShipping />} sx={{ fontSize: '1rem', p: 2 }} />
        </Box>

        {/* Advanced Filters */}
        <Paper sx={{ p: 3, mb: 4, background: 'white', boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
            <Search sx={{ mr: 1, verticalAlign: 'middle' }} />
            Search & Filter
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                placeholder="Search vendor"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Place /></InputAdornment>,
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.8}>
              <TextField
                fullWidth
                type="number"
                label="Max Distance (km)"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value === '' ? '' : Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Speed /></InputAdornment>,
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.8}>
              <TextField
                fullWidth
                type="number"
                label="Min Rating"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value === '' ? '' : Number(e.target.value))}
                inputProps={{ step: 0.5, min: 0, max: 5 }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                size="small"
              >
                <MenuItem value="distance">Nearest</MenuItem>
                <MenuItem value="fare">Lowest Fare</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {/* View Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
            View as:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('grid')}
              sx={{ textTransform: 'capitalize', bgcolor: viewMode === 'grid' ? '#2e7d32' : 'transparent' }}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('table')}
              sx={{ textTransform: 'capitalize', bgcolor: viewMode === 'table' ? '#2e7d32' : 'transparent' }}
            >
              Table
            </Button>
          </Box>
        </Box>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <Grid container spacing={3}>
            {results.map((t) => (
              <Grid item xs={12} sm={6} md={4} key={t.id}>
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
                  {/* Header */}
                  <Box sx={{ bgcolor: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        Tractor Vendor
                      </Typography>
                    </Box>
                    {t.rating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(255,255,255,0.2)', px: 1, py: 0.5, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{t.rating.toFixed(1)}</Typography>
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Name & Avatar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Avatar sx={{ width: 50, height: 50, bgcolor: '#ff6f00', fontSize: '1.3rem', fontWeight: 'bold' }}>
                        {t.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {t.yearsInBusiness} years experience
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: '#ff6f00', flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: '#333', fontWeight: '500' }}>
                        {t.location}
                      </Typography>
                    </Box>

                    {/* Pricing Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1.5, bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                      <Box sx={{ textAlign: 'center', bgcolor: 'white', p: 1, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.3 }}>Distance</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ff6f00' }}>
                          {t.distanceKm} km
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', bgcolor: 'white', p: 1, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.3 }}>Tractors</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                          {t.tractorCount}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Pricing */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1.5 }}>
                      <Box sx={{ bgcolor: '#e8f5e9', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#2e7d32', display: 'block', fontWeight: 'bold' }}>
                          Hourly
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          ${t.farePerHour}
                        </Typography>
                      </Box>
                      <Box sx={{ bgcolor: '#fff3e0', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#ff6f00', display: 'block', fontWeight: 'bold' }}>
                          Per KM
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#ff6f00', fontWeight: 'bold' }}>
                          ${t.farePerKm}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Services */}
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.8, fontWeight: 'bold' }}>
                        Services
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {t.services.slice(0, 2).map((s) => (
                          <Chip key={s} label={s} size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }} />
                        ))}
                        {t.services.length > 2 && (
                          <Chip label={`+${t.services.length - 2}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ bgcolor: '#2e7d32', textTransform: 'capitalize', '&:hover': { bgcolor: '#1b5e20' } }}
                    >
                      Request Quote
                    </Button>
                    {t.phone && (
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {t.phone}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <Paper sx={{ height: 600, background: 'white', boxShadow: 3, borderRadius: 2 }}>
            <DataGrid
              rows={results}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #e0e0e0',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  fontWeight: 'bold',
                },
              }}
            />
          </Paper>
        )}

        {results.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', boxShadow: 2 }}>
            <Typography variant="h6" sx={{ color: '#999' }}>
              No tractors found matching your search. Try adjusting your filters.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default TractorHirePage;


