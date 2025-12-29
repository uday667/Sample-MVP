import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Rating,
  Select,
  FormControl,
  InputLabel,
  Collapse,
  IconButton,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Search, FilterAlt, ExpandMore, LocationOn, AccessTime, TrendingUp, People } from '@mui/icons-material';
import type { Task } from '../services/api';

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    farmerId: 101,
    title: 'Corn Harvest Helpers',
    description: 'Assist with harvesting corn over 3 days. Seasonal work for mature corn ready for collection. Must be physically fit and willing to work in outdoor conditions. Experience with machinery is preferred.',
    taskType: 'Harvesting',
    location: 'Iowa, USA',
    startDate: new Date().toISOString(),
    endDate: undefined,
    estimatedHours: 24,
    hourlyRate: 18,
    totalBudget: 432,
    requiredSkills: ['Harvesting', 'Tractor Operation'],
    maxLabourers: 4,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    farmerId: 102,
    title: 'Greenhouse Planting',
    description: 'Plant seedlings and manage irrigation setup. Precision work required. Good understanding of spacing and watering schedules essential. Join our team for year-round work.',
    taskType: 'Planting',
    location: 'Gujarat, India',
    startDate: new Date().toISOString(),
    endDate: undefined,
    estimatedHours: 16,
    hourlyRate: 15,
    totalBudget: 240,
    requiredSkills: ['Planting', 'Irrigation'],
    maxLabourers: 2,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    farmerId: 103,
    title: 'Vegetable Picking',
    description: 'Help with picking and sorting fresh vegetables. Early morning work recommended. Must handle delicate produce with care. Team oriented environment with competitive pay.',
    taskType: 'Harvesting',
    location: 'California, USA',
    startDate: new Date().toISOString(),
    endDate: undefined,
    estimatedHours: 20,
    hourlyRate: 16,
    totalBudget: 320,
    requiredSkills: ['Harvesting', 'Sorting'],
    maxLabourers: 5,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    farmerId: 104,
    title: 'Irrigation System Setup',
    description: 'Install and maintain modern irrigation systems. Technical knowledge required. Training provided for new workers. Ongoing project with long-term opportunities.',
    taskType: 'Irrigation',
    location: 'Punjab, India',
    startDate: new Date().toISOString(),
    endDate: undefined,
    estimatedHours: 30,
    hourlyRate: 20,
    totalBudget: 600,
    requiredSkills: ['Irrigation', 'Technical Knowledge'],
    maxLabourers: 3,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    farmerId: 105,
    title: 'Crop Maintenance',
    description: 'Regular crop maintenance including weeding and pruning. No experience necessary. Good opportunity to learn agricultural practices. Flexible schedule.',
    taskType: 'Maintenance',
    location: 'Maharashtra, India',
    startDate: new Date().toISOString(),
    endDate: undefined,
    estimatedHours: 18,
    hourlyRate: 12,
    totalBudget: 216,
    requiredSkills: ['Weeding', 'Pruning'],
    maxLabourers: 4,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


const TaskListPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [taskType, setTaskType] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [minHours, setMinHours] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Job Title', flex: 1, minWidth: 200 },
    { field: 'taskType', headerName: 'Type', width: 120 },
    { field: 'location', headerName: 'Location', width: 150 },
    {
      field: 'requiredSkills',
      headerName: 'Skills Required',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', py: 1 }}>
          {(params.row.requiredSkills || []).slice(0, 2).map((skill: string) => (
            <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
          ))}
          {(params.row.requiredSkills?.length || 0) > 2 && (
            <Chip label={`+${(params.row.requiredSkills!.length - 2)}`} size="small" variant="outlined" />
          )}
        </Box>
      ),
    },
    { field: 'hourlyRate', headerName: 'Rate ($/hr)', width: 110, valueFormatter: ({ value }) => value ? `$${value}` : '-' },
    { field: 'estimatedHours', headerName: 'Hours', width: 80 },
    { field: 'maxLabourers', headerName: 'Workers', width: 80 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Button variant="contained" size="small" sx={{ bgcolor: '#2e7d32', textTransform: 'capitalize' }}>Apply Now</Button>
      ),
    },
  ];

  const filteredRows = useMemo(() => {
    return MOCK_TASKS.filter((t) => {
      const matchesQuery = query
        ? (t.title + ' ' + (t.description || '')).toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesLocation = location
        ? t.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = taskType ? t.taskType === taskType : true;
      const matchesMinRate = minRate ? (t.hourlyRate ?? 0) >= parseFloat(minRate) : true;
      const matchesMaxRate = maxRate ? (t.hourlyRate ?? 0) <= parseFloat(maxRate) : true;
      const matchesMinHours = minHours ? (t.estimatedHours ?? 0) >= parseFloat(minHours) : true;
      return matchesQuery && matchesLocation && matchesType && matchesMinRate && matchesMaxRate && matchesMinHours;
    });
  }, [query, location, taskType, minRate, maxRate, minHours]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
            Available Tasks & Jobs
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            Find agricultural jobs that match your skills and location
          </Typography>
          <Chip label={`${filteredRows.length} jobs available`} color="success" icon={<TrendingUp />} sx={{ fontSize: '1rem', p: 2 }} />
        </Box>

        {/* Advanced Filters */}
        <Paper sx={{ p: 3, mb: 4, background: 'white', boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
            <FilterAlt sx={{ mr: 1, verticalAlign: 'middle' }} />
            Advanced Filters
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Search by title or description"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="Task Type"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                size="small"
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Harvesting">Harvesting</MenuItem>
                <MenuItem value="Planting">Planting</MenuItem>
                <MenuItem value="Irrigation">Irrigation</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField
                fullWidth
                label="Min $/hr"
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField
                fullWidth
                label="Max $/hr"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="Min Hours"
                value={minHours}
                onChange={(e) => setMinHours(e.target.value)}
                type="number"
                size="small"
              />
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
            {filteredRows.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
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
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Chip
                        label={task.taskType}
                        size="small"
                        color="primary"
                        sx={{ bgcolor: '#2e7d32', color: 'white', fontWeight: 'bold' }}
                      />
                      <Chip
                        label={task.status}
                        size="small"
                        color="success"
                        sx={{ bgcolor: '#4caf50', color: 'white' }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#1a1a1a' }}>
                      {task.title.length > 30 ? task.title.substring(0, 30) + '...' : task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                      {task.description && task.description.length > 60
                        ? task.description.substring(0, 60) + '...'
                        : task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {(task.requiredSkills || []).slice(0, 2).map((skill) => (
                        <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                      ))}
                      {(task.requiredSkills?.length || 0) > 2 && (
                        <Chip label={`+${task.requiredSkills!.length - 2}`} size="small" sx={{ fontSize: '0.75rem' }} />
                      )}
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                      <Box sx={{ bgcolor: '#f0f0f0', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#666' }}>Rate/Hour</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>${task.hourlyRate}</Typography>
                      </Box>
                      <Box sx={{ bgcolor: '#f0f0f0', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#666' }}>Hours</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>{task.estimatedHours}h</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <LocationOn sx={{ fontSize: 18, color: '#ff6f00' }} />
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {task.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <People sx={{ fontSize: 18, color: '#1976d2' }} />
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {task.maxLabourers} workers needed
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ borderTop: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ bgcolor: '#2e7d32', textTransform: 'capitalize', '&:hover': { bgcolor: '#1b5e20' } }}
                    >
                      Apply for Job
                    </Button>
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

        {filteredRows.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', boxShadow: 2 }}>
            <Typography variant="h6" sx={{ color: '#999' }}>
              No tasks found matching your filters. Try adjusting your search criteria.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default TaskListPage;
