import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Login page designed to match the provided wireframe asset (frontend/assets/login-page.avif)
// Layout: full-screen background image with centered card. Card contains header, form, social buttons,
// and a decorative column for GIF/illustration on wide screens.

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Backend currently expects urlencoded data in this project setup.
      const res = await fetch('http://localhost:8082/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
      });

      const text = await res.text();
      if (res.ok && text.toLowerCase().includes('success')) {
        // on success redirect to dashboard (adjust route as needed)
        navigate('/dashboard');
      } else {
        setError('Invalid credentials or user not registered.');
      }
    } catch (err) {
      setError('Unable to reach authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12)), url(/assets/login-page.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            display: 'flex',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: 6,
            backgroundColor: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* Left: Form column */}
          <Box sx={{ flex: 1, p: { xs: 3, sm: 6 }, minWidth: 320 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to your AgriConnect account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(76,175,80,0.9)',
                          boxShadow: '0 0 0 6px rgba(76,175,80,0.06)',
                        },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(76,175,80,0.9)',
                          boxShadow: '0 0 0 6px rgba(76,175,80,0.06)',
                        },
                      },
                    }}
                  />
                )}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
                </Button>

                <Button variant="text" onClick={() => navigate('/forgot-password')}>
                  Forgot?
                </Button>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <IconButton aria-label="google login" color="primary">
                  <GoogleIcon />
                </IconButton>
                <IconButton aria-label="facebook login" sx={{ color: '#1877F2' }}>
                  <FacebookIcon />
                </IconButton>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Button variant="text" onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
                    Create one here
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right: Decorative panel (hidden on small screens) - matches wireframe composition */}
          <Box
            sx={{
              width: { xs: 0, md: 360 },
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, rgba(76,175,80,0.12), rgba(76,175,80,0.04))',
              p: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>
              {/* Decorative farming GIF from a public CDN */}
              <img
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGUxOHE1ZTBncnpuczc3M282d2luNWc2Yzk3OWd0NXU2dmJ1NG1pbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ze2LFvpgDQZoKgZMgG/giphy.gif"
                alt="farming gif"
                style={{ maxWidth: '100%', borderRadius: 8 }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Farmers' friendly
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
              Simple login to manage tasks, announcements and hiring — optimized for quick use in the field.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
