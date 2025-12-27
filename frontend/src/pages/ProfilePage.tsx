import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Avatar,
  Box,
  Button,
  Chip,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

type UserType = 'FARMER' | 'LABOUR' | 'ADMIN';

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  userType: UserType;
  bio?: string;
  location?: string;
  skills: string[];
  experienceYears?: number;
  hourlyRate?: number;
}

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {} as any;
    }
  }, []);

  const { control, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProfileForm>({
    defaultValues: {
      firstName: storedUser.firstName || '',
      lastName: storedUser.lastName || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
      userType: storedUser.userType || 'FARMER',
      bio: storedUser.bio || '',
      location: storedUser.location || '',
      skills: storedUser.skills || [],
      experienceYears: storedUser.experienceYears || undefined,
      hourlyRate: storedUser.hourlyRate || undefined,
    },
  });

  useEffect(() => {
    reset({
      firstName: storedUser.firstName || '',
      lastName: storedUser.lastName || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
      userType: storedUser.userType || 'FARMER',
      bio: storedUser.bio || '',
      location: storedUser.location || '',
      skills: storedUser.skills || [],
      experienceYears: storedUser.experienceYears || undefined,
      hourlyRate: storedUser.hourlyRate || undefined,
    });
  }, [reset, storedUser]);

  const userType = watch('userType');
  const skills = watch('skills') || [];

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    if (!skills.includes(value)) {
      setValue('skills', [...skills, value]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setValue('skills', skills.filter((s: string) => s !== skill));
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      setError(null);
      // Simulate save
      await new Promise((r) => setTimeout(r, 800));
      const updated = { ...storedUser, ...data };
      localStorage.setItem('user', JSON.stringify(updated));
    } catch (e: any) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 96, height: 96 }}>
                  {(storedUser.firstName?.[0] || 'U')}{storedUser.lastName?.[0] || ''}
                </Avatar>
                <Button variant="outlined" size="small">Upload Photo</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: 'First name is required' }}
                    render={({ field }) => (
                      <TextField {...field} label="First Name" fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: 'Last name is required' }}
                    render={({ field }) => (
                      <TextField {...field} label="Last Name" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                      <TextField {...field} type="email" label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Phone" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="userType"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} select label="User Type" fullWidth>
                        <MenuItem value="FARMER">Farmer</MenuItem>
                        <MenuItem value="LABOUR">Agricultural Worker</MenuItem>
                        <MenuItem value="ADMIN">Administrator</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Bio" fullWidth multiline rows={3} placeholder="Tell us about yourself..." />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Location" fullWidth />
                    )}
                  />
                </Grid>

                {userType === 'LABOUR' && (
                  <>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name="experienceYears"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} type="number" label="Years Experience" fullWidth onChange={(e) => field.onChange(Number(e.target.value) || undefined)} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name="hourlyRate"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} type="number" label="Hourly Rate ($)" fullWidth onChange={(e) => field.onChange(Number(e.target.value) || undefined)} />
                        )}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Skills</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      size="small"
                      label="Add Skill"
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
                    {skills.map((s: string) => (
                      <Chip key={s} label={s} onDelete={() => removeSkill(s)} />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button type="button" variant="outlined" onClick={() => reset()}>Reset</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                      {loading ? <CircularProgress size={20} /> : 'Save Changes'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
