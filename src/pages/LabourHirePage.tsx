import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Chip,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Rating,
  Divider,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Search, Place, Handyman, Star, Phone, Mail, LocationOn } from '@mui/icons-material';

interface Labour {
  id: number;
  name: string;
  location: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  availability: 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE';
  rating?: number;
  phone?: string;
  completedJobs?: number;
}

const MOCK_LABOUR: Labour[] = [
  { id: 1, name: 'Ravi Kumar', location: 'Telangana, IN', skills: ['Harvesting', 'Irrigation'], experienceYears: 4, hourlyRate: 8, availability: 'AVAILABLE', rating: 4.8, phone: '+91-9876543210', completedJobs: 45 },
  { id: 2, name: 'Asha Devi', location: 'Punjab, IN', skills: ['Planting', 'Greenhouse'], experienceYears: 3, hourlyRate: 7, availability: 'AVAILABLE', rating: 4.6, phone: '+91-9876543211', completedJobs: 32 },
  { id: 3, name: 'Carlos Diaz', location: 'Iowa, US', skills: ['Tractor Operation', 'Harvesting'], experienceYears: 6, hourlyRate: 15, availability: 'BUSY', rating: 4.9, phone: '+1-5551234567', completedJobs: 78 },
  { id: 4, name: 'Priya Singh', location: 'Gujarat, IN', skills: ['Weeding', 'Sorting', 'Packaging'], experienceYears: 2, hourlyRate: 6, availability: 'AVAILABLE', rating: 4.5, phone: '+91-9876543212', completedJobs: 28 },
  { id: 5, name: 'Marcus Johnson', location: 'California, US', skills: ['Crop Management', 'Harvesting'], experienceYears: 8, hourlyRate: 18, availability: 'AVAILABLE', rating: 5.0, phone: '+1-5551234568', completedJobs: 92 },
  { id: 6, name: 'Fatima Khan', location: 'Maharashtra, IN', skills: ['Irrigation', 'Maintenance', 'Technical'], experienceYears: 5, hourlyRate: 10, availability: 'UNAVAILABLE', rating: 4.7, phone: '+91-9876543213', completedJobs: 61 },
];

const LabourHirePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [availability, setAvailability] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: '#2e7d32' }}>{params.row.name.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>{params.row.name}</Typography>
            <Typography variant="caption" sx={{ color: '#999' }}>{params.row.experienceYears} yrs exp</Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'location', headerName: 'Location', width: 150, renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <LocationOn sx={{ fontSize: 16, color: '#ff6f00' }} />
        <Typography variant="body2">{params.row.location}</Typography>
      </Box>
    )},
    {
      field: 'skills',
      headerName: 'Skills',
      flex: 1,
      minWidth: 280,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', py: 1 }}>
          {params.row.skills.slice(0, 3).map((s: string) => (
            <Chip key={s} label={s} size="small" color="primary" variant="outlined" sx={{ bgcolor: '#e8f5e9' }} />
          ))}
          {params.row.skills.length > 3 && <Chip label={`+${params.row.skills.length - 3}`} size="small" />}
        </Box>
      ),
    },
    { field: 'experienceYears', headerName: 'Experience', width: 100, renderCell: (params) => (
      <Chip label={`${params.row.experienceYears} years`} size="small" sx={{ bgcolor: '#fff3e0' }} />
    )},
    { field: 'hourlyRate', headerName: 'Rate ($/hr)', width: 110, renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
        ${params.row.hourlyRate}
      </Typography>
    )},
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
      field: 'availability',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.row.availability}
          size="small"
          color={params.row.availability === 'AVAILABLE' ? 'success' : params.row.availability === 'BUSY' ? 'warning' : 'default'}
          sx={{ fontWeight: 'bold' }}
        />
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
          Hire Now
        </Button>
      ),
    },
  ];

  const filteredRows = useMemo(() => {
    return MOCK_LABOUR.filter((l) => {
      const matchesQuery = query ? l.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesLocation = location ? l.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSkill = skill ? l.skills.includes(skill) : true;
      const matchesAvail = availability ? l.availability === availability : true;
      const matchesMinRate = minRate ? l.hourlyRate >= parseFloat(minRate) : true;
      const matchesMaxRate = maxRate ? l.hourlyRate <= parseFloat(maxRate) : true;
      return matchesQuery && matchesLocation && matchesSkill && matchesAvail && matchesMinRate && matchesMaxRate;
    });
  }, [query, location, skill, availability, minRate, maxRate]);

  const allSkills = useMemo(() => Array.from(new Set(MOCK_LABOUR.flatMap((l) => l.skills))), []);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
            Hire Skilled Labour
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            Find verified agricultural workers with the right skills and availability
          </Typography>
          <Chip label={`${filteredRows.length} workers available`} color="success" icon={<Handyman />} sx={{ fontSize: '1rem', p: 2 }} />
        </Box>

        {/* Advanced Filters */}
        <Paper sx={{ p: 3, mb: 4, background: 'white', boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
            <Search sx={{ mr: 1, verticalAlign: 'middle' }} />
            Filter & Search
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                placeholder="Search by name"
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
            <Grid item xs={12} sm={6} md={2.2}>
              <TextField
                select
                fullWidth
                label="Skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                size="small"
              >
                <MenuItem value="">All Skills</MenuItem>
                {allSkills.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={1.8}>
              <TextField
                fullWidth
                label="Min $/hr"
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.8}>
              <TextField
                fullWidth
                label="Max $/hr"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.8}>
              <TextField
                select
                fullWidth
                label="Availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                size="small"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="BUSY">Busy</MenuItem>
                <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
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
            {filteredRows.map((labour) => (
              <Grid item xs={12} sm={6} md={4} key={labour.id}>
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
                  <Box sx={{ bgcolor: `${labour.availability === 'AVAILABLE' ? '#4caf50' : labour.availability === 'BUSY' ? '#ff9800' : '#bdbdbd'}`, color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {labour.availability}
                    </Typography>
                    <Rating value={labour.rating ? labour.rating / 1 : 0} readOnly size="small" />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Avatar sx={{ width: 50, height: 50, bgcolor: '#2e7d32', fontSize: '1.5rem' }}>
                        {labour.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                          {labour.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#ff6f00', fontWeight: 'bold' }}>
                          {labour.experienceYears} years experience
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5, fontWeight: 'bold' }}>
                        Skills
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {labour.skills.slice(0, 2).map((s) => (
                          <Chip key={s} label={s} size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }} />
                        ))}
                        {labour.skills.length > 2 && (
                          <Chip label={`+${labour.skills.length - 2}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1.5 }}>
                      <Box sx={{ bgcolor: '#f0f0f0', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#666' }}>Rate</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>${labour.hourlyRate}/hr</Typography>
                      </Box>
                      <Box sx={{ bgcolor: '#f0f0f0', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#666' }}>Jobs</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{labour.completedJobs}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: '#ff6f00' }} />
                      <Typography variant="caption" sx={{ color: '#666' }}>{labour.location}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ borderTop: '1px solid #e0e0e0', bgcolor: '#fafafa', flexDirection: 'column', gap: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ bgcolor: '#2e7d32', textTransform: 'capitalize', '&:hover': { bgcolor: '#1b5e20' } }}
                    >
                      Hire Now
                    </Button>
                    {labour.phone && (
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Phone sx={{ fontSize: 16 }} />}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {labour.phone}
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
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
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

        {filteredRows.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', boxShadow: 2 }}>
            <Typography variant="h6" sx={{ color: '#999' }}>
              No workers found matching your criteria. Try adjusting your filters.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default LabourHirePage;


