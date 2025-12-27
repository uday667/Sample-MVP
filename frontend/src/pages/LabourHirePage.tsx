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
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Search, Place, Handyman } from '@mui/icons-material';

interface Labour {
  id: number;
  name: string;
  location: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  availability: 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE';
}

const MOCK_LABOUR: Labour[] = [
  { id: 1, name: 'Ravi Kumar', location: 'Telangana, IN', skills: ['Harvesting', 'Irrigation'], experienceYears: 4, hourlyRate: 8, availability: 'AVAILABLE' },
  { id: 2, name: 'Asha Devi', location: 'Punjab, IN', skills: ['Planting', 'Greenhouse'], experienceYears: 3, hourlyRate: 7, availability: 'AVAILABLE' },
  { id: 3, name: 'Carlos Diaz', location: 'Iowa, US', skills: ['Tractor Operation', 'Harvesting'], experienceYears: 6, hourlyRate: 15, availability: 'BUSY' },
];

const LabourHirePage: React.FC = () => {
  // ...existing code...
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [availability, setAvailability] = useState('');

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'location', headerName: 'Location', width: 180 },
    {
      field: 'skills',
      headerName: 'Skills',
      flex: 1,
      minWidth: 240,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.row.skills.map((s: string) => <Chip key={s} label={s} size="small" />)}
        </Box>
      ),
    },
    { field: 'experienceYears', headerName: 'Years', width: 90 },
    { field: 'hourlyRate', headerName: 'Rate ($/hr)', width: 120, valueFormatter: ({ value }) => `$${value}` },
    { field: 'availability', headerName: 'Availability', width: 130 },
  ];

  const filteredRows = useMemo(() => {
    return MOCK_LABOUR.filter((l) => {
      const matchesQuery = query ? l.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesLocation = location ? l.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSkill = skill ? l.skills.includes(skill) : true;
      const matchesAvail = availability ? l.availability === availability : true;
      return matchesQuery && matchesLocation && matchesSkill && matchesAvail;
    });
  }, [query, location, skill, availability]);

  const allSkills = useMemo(() => Array.from(new Set(MOCK_LABOUR.flatMap((l) => l.skills))), []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{
        p: 4,
        mb: 2,
        color: 'white',
        backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56f3d81aa8cf?auto=format&fit=crop&w=1400&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        boxShadow: 4,
      }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)' }} />
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#ffe082', textShadow: '2px 2px 8px #388e3c' }}>
            Hire Labour
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.95, color: '#fffde7', mb: 2 }}>
            Find skilled agricultural workers near you with the right skills and availability
          </Typography>
          <Box sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2, p: 2, mt: 2, color: '#388e3c', maxWidth: 420, mx: 'auto' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>How to use:</Typography>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Search by name, location, skill, or availability</li>
              <li>Click on a row for more details</li>
              <li>Use keyboard navigation for accessibility</li>
            </ul>
          </Box>
        </Box>
      </Paper>

  <Paper sx={{ p: 2, mb: 2, background: 'rgba(255,255,255,0.95)', borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name"
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
          <Grid item xs={12} sm={6} md={3}>
            <TextField select fullWidth label="Skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {allSkills.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField select fullWidth label="Availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="AVAILABLE">Available</MenuItem>
              <MenuItem value="BUSY">Busy</MenuItem>
              <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

  <Paper sx={{ height: 520, background: 'rgba(255,255,255,0.98)', borderRadius: 2 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* ...removed decor picker and section for accessibility... */}
    </Container>
  );
};

export default LabourHirePage;


