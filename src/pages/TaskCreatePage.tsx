import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  Box,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { TaskCreateRequest } from '../services/api';

interface TaskForm extends TaskCreateRequest {}

const TaskCreatePage: React.FC = () => {
  const [skillsInput, setSkillsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<TaskForm>({
    defaultValues: {
      title: '',
      description: '',
      taskType: '',
      location: '',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      estimatedHours: undefined,
      hourlyRate: undefined,
      totalBudget: undefined,
      requiredSkills: [],
      maxLabourers: 1,
    },
  });

  const requiredSkills = watch('requiredSkills') || [];

  const addSkill = () => {
    const value = skillsInput.trim();
    if (!value) return;
    if (!requiredSkills.includes(value)) {
      setValue('requiredSkills', [...requiredSkills, value]);
    }
    setSkillsInput('');
  };

  const removeSkill = (skill: string) => {
    setValue('requiredSkills', requiredSkills.filter((s) => s !== skill));
  };

  const onSubmit = async (data: TaskForm) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: integrate with API when backend is wired
      await new Promise((r) => setTimeout(r, 800));
      console.log('Create task payload', data);
    } catch (e: any) {
      setError('Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Job
      </Typography>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField {...field} label="Title" fullWidth error={!!errors.title} helperText={errors.title?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="taskType"
                control={control}
                rules={{ required: 'Task type is required' }}
                render={({ field }) => (
                  <TextField {...field} select label="Task Type" fullWidth error={!!errors.taskType} helperText={errors.taskType?.message}>
                    <MenuItem value="Harvesting">Harvesting</MenuItem>
                    <MenuItem value="Planting">Planting</MenuItem>
                    <MenuItem value="Irrigation">Irrigation</MenuItem>
                    <MenuItem value="Soil Prep">Soil Prep</MenuItem>
                    <MenuItem value="Logistics">Logistics</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="location"
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field }) => (
                  <TextField {...field} label="Location" fullWidth error={!!errors.location} helperText={errors.location?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'Start date is required' }}
                render={({ field }) => (
                  <TextField {...field} type="date" label="Start Date" InputLabelProps={{ shrink: true }} fullWidth error={!!errors.startDate} helperText={errors.startDate?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="date" label="End Date" InputLabelProps={{ shrink: true }} fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Controller
                name="estimatedHours"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Estimated Hours" fullWidth onChange={(e) => field.onChange(Number(e.target.value) || undefined)} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="hourlyRate"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Hourly Rate ($)" fullWidth onChange={(e) => field.onChange(Number(e.target.value) || undefined)} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="totalBudget"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Total Budget ($)" fullWidth onChange={(e) => field.onChange(Number(e.target.value) || undefined)} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="maxLabourers"
                control={control}
                rules={{ min: { value: 1, message: 'At least 1' } }}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Max Workers" fullWidth error={!!errors.maxLabourers} helperText={errors.maxLabourers?.message} onChange={(e) => field.onChange(Number(e.target.value) || 1)} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Description" multiline rows={4} fullWidth placeholder="Describe the work, tools, safety, etc." />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Required Skills</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  label="Add Skill"
                  size="small"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button variant="outlined" size="small" onClick={addSkill}>Add</Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {requiredSkills.map((s: string) => (
                  <Chip key={s} label={s} onDelete={() => removeSkill(s)} />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" type="button">Cancel</Button>
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : 'Create Job'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskCreatePage;
