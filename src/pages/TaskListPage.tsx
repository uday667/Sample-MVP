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
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Search, FilterAlt } from '@mui/icons-material';
import type { Task } from '../services/api';

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    farmerId: 101,
    title: 'Corn Harvest Helpers',
    description: 'Assist with harvesting corn over 3 days',
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
    description: 'Plant seedlings and manage irrigation setup',
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
];

const TaskListPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [taskType, setTaskType] = useState('');

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
    { field: 'taskType', headerName: 'Type', width: 140 },
    { field: 'location', headerName: 'Location', width: 180 },
    {
      field: 'requiredSkills',
      headerName: 'Skills',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {(params.row.requiredSkills || []).slice(0, 3).map((skill: string) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
          {(params.row.requiredSkills?.length || 0) > 3 && (
            <Chip label={`+${(params.row.requiredSkills!.length - 3)}`} size="small" variant="outlined" />
          )}
        </Box>
      ),
    },
    { field: 'hourlyRate', headerName: 'Rate ($/hr)', width: 120, valueFormatter: ({ value }) => value ? `$${value}` : '-' },
    { field: 'estimatedHours', headerName: 'Hours', width: 100 },
    { field: 'maxLabourers', headerName: 'Max Workers', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Button variant="contained" size="small">View</Button>
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
      return matchesQuery && matchesLocation && matchesType;
    });
  }, [query, location, taskType]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by title or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Task Type"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Harvesting">Harvesting</MenuItem>
              <MenuItem value="Planting">Planting</MenuItem>
              <MenuItem value="Irrigation">Irrigation</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterAlt />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ height: 520 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
};

export default TaskListPage;
