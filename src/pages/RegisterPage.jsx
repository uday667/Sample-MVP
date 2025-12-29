import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InfoIcon from '@mui/icons-material/Info';
import StyledSection from '../components/StyledSection';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skillInput, setSkillInput] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      userType: 'FARMER',
      bio: '',
      location: '',
      skills: [],
      experienceYears: 0,
      hourlyRate: 0,
    },
  });

  const watchedUserType = watch('userType');
  const watchedSkills = watch('skills');

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const registrationData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        userType: data.userType,
        bio: data.bio,
        location: data.location,
        skills: data.skills,
        experienceYears: data.experienceYears,
        hourlyRate: data.hourlyRate,
      };

      const response = await userApi.register(registrationData);
      const resData = response.data;
      if (resData.success) {
        navigate('/login');
      } else {
        setError(resData.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !watchedSkills.includes(skillInput.trim())) {
      setValue('skills', [...watchedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setValue('skills', watchedSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledSection>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Join AgriConnect
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Create your account to start connecting with the agricultural community
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)', '&.Mui-focused fieldset': { borderColor: 'rgba(46,125,50,0.9)', boxShadow: '0 0 0 6px rgba(46,125,50,0.06)' } } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)', '&.Mui-focused fieldset': { borderColor: 'rgba(46,125,50,0.9)', boxShadow: '0 0 0 6px rgba(46,125,50,0.06)' } } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><InfoIcon color="action"/></InputAdornment>) }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)', '&.Mui-focused fieldset': { borderColor: 'rgba(46,125,50,0.9)', boxShadow: '0 0 0 6px rgba(46,125,50,0.06)' } } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon color="action"/></InputAdornment>) }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)' } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                rules={{ 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon color="action"/></InputAdornment>) }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)', '&.Mui-focused fieldset': { borderColor: 'rgba(46,125,50,0.9)', boxShadow: '0 0 0 6px rgba(46,125,50,0.06)' } } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: 'Please confirm your password' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon color="action"/></InputAdornment>) }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)' } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="userType"
                control={control}
                rules={{ required: 'User type is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.userType}>
                    <InputLabel>I am a...</InputLabel>
                    <Select {...field} label="I am a...">
                      <MenuItem value="FARMER">Farmer</MenuItem>
                      <MenuItem value="LABOUR">Agricultural Worker</MenuItem>
                      <MenuItem value="ADMIN">Administrator</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Profile Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Profile Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bio"
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Tell us about yourself and your experience..."
                    variant="outlined"
                    InputProps={{ startAdornment: (<InputAdornment position="start"><InfoIcon color="action"/></InputAdornment>) }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)' } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                    placeholder="City, State, Country"
                    variant="outlined"
                    size="medium"
                    InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnIcon color="action"/></InputAdornment>) }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)' } }}
                  />
                )}
              />
            </Grid>

            {watchedUserType === 'LABOUR' && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="experienceYears"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Years of Experience"
                        type="number"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputProps={{ startAdornment: (<InputAdornment position="start"><WorkIcon color="action"/></InputAdornment>) }}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)' } }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Hourly Rate ($)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputProps={{ startAdornment: (<InputAdornment position="start"><MonetizationOnIcon color="action"/></InputAdornment>) }}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.95)' } }}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Skills */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  label="Add Skill"
                  size="small"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button onClick={addSkill} variant="outlined" size="small">
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {watchedSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => removeSkill(skill)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  className="agri-cta"
                  sx={{ minWidth: 220, boxShadow: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Account'}
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Button
                    variant="text"
                    onClick={() => navigate('/login')}
                    sx={{ textTransform: 'none' }}
                  >
                    Sign in here
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledSection>
    </Container>
  );
};

export default RegisterPage;
