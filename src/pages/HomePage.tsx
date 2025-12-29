import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Agriculture,
  People,
  Work,
  Chat,
  TrendingUp,
  Security,
  Speed,
  Support,
  Groups,
  LocalShipping,
  Campaign,
  ArrowForward,
  Check,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // Stagger animation on mount
    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 100);
    });
  }, []);

  const features = [
    {
      icon: <Agriculture sx={{ fontSize: 48 }} />,
      title: 'Smart Matching',
      description: 'AI-powered matching between farmers and skilled laborers',
    },
    {
      icon: <Work sx={{ fontSize: 48 }} />,
      title: 'Task Management',
      description: 'Efficiently manage agricultural tasks and assignments',
    },
    {
      icon: <Chat sx={{ fontSize: 48 }} />,
      title: 'AI Assistant',
      description: '24/7 AI-powered agricultural guidance and support',
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Secure Payments',
      description: 'Safe and reliable payment processing system',
    },
    {
      icon: <Groups sx={{ fontSize: 48 }} />,
      title: 'Middlemen Network',
      description: 'Centralized coordinators to mobilize labour quickly',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 48 }} />,
      title: 'Tractor Hire',
      description: 'Rent tractors by fare or nearest distance',
    },
    {
      icon: <Campaign sx={{ fontSize: 48 }} />,
      title: 'Announcements',
      description: 'Govt circulars, weather alerts and market news',
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Quick Hiring',
      description: 'Find workers in minutes, not days',
    },
  ];

  const benefits = [
    'Connect with verified agricultural workers',
    'Post jobs and find skilled labor instantly',
    'AI-powered recommendations for optimal matches',
    'Real-time notifications and updates',
    'Secure payment processing',
    '24/7 AI chat support',
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Hero Section with Enhanced Gradient */}
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          py: 10,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 50%, #fbc02d 100%)',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Box
              sx={{
                mb: 3,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 3,
                border: '4px solid #fff',
                background: '#fff',
                animation: 'slideInDown 0.8s ease-out',
              }}
            >
              <img
                src="https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
                alt="Farming GIF"
                style={{ width: '340px', height: '220px', objectFit: 'cover', display: 'block' }}
              />
            </Box>
            <Typography variant="h1" component="h1" gutterBottom sx={{ color: '#fffde7', textShadow: '2px 2px 8px #388e3c', fontWeight: 'bold', animation: 'slideInUp 0.8s ease-out' }}>
              🌾 AgriConnect
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, color: '#fffde7', textShadow: '1px 1px 6px #fbc02d', animation: 'slideInUp 1s ease-out' }}>
              Connecting Farmers with Skilled Agricultural Workers
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, color: '#fffde7', animation: 'slideInUp 1.2s ease-out' }}>
              The modern platform that bridges the gap between farmers and laborers<br />
              <span style={{ color: '#ffe082', fontWeight: 'bold' }}>AI-powered matching and seamless task management.</span>
            </Typography>
            <Box sx={{ position: 'relative', display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 2, animation: 'slideInUp 1.4s ease-out' }}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#fbc02d', color: '#388e3c', fontWeight: 'bold', boxShadow: 2, '&:hover': { transform: 'scale(1.05)' }, transition: 'all 0.3s' }}
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ color: '#fffde7', borderColor: '#fffde7', fontWeight: 'bold', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                onClick={() => navigate('/tasks')}
              >
                Browse Jobs
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Image highlight strip with hover effects */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={2}>
          {[
            { src: 'https://images.unsplash.com/photo-1500937386664-56f3d81aa8cf?auto=format&fit=crop&w=900&q=60', label: 'Fresh Crops' },
            { src: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?auto=format&fit=crop&w=900&q=60', label: 'Farm Workers' },
            { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60', label: 'Harvest Time' },
            { src: 'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=900&q=60', label: 'Heavy Equipment' },
          ].map((item, idx) => (
            <Grid key={idx} item xs={6} md={3}>
              <Paper
                sx={{
                  pt: '56.25%',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.src}
                  alt={item.label}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 2,
                    color: 'white',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section with Animation */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 1 }}>
          Why Choose AgriConnect?
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ mb: 6, color: '#8bc34a' }}>
          Built with modern technology to serve the agricultural community
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              key={index}
              sx={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out',
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                  border: '2px solid #c8e6c9',
                  boxShadow: 2,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-12px) scale(1.02)',
                    borderColor: '#43a047',
                  },
                  cursor: 'pointer',
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: '#43a047', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <ArrowForward sx={{ color: '#2e7d32', fontSize: 20 }} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ width: '100%', borderBottom: '2px dashed #ffe082', my: 4 }} />

      {/* Benefits Section - Split Layout */}
      <Box sx={{ background: 'linear-gradient(90deg, #fbc02d 0%, #fffde7 100%)', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                For Farmers
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: '#8bc34a', fontWeight: '500' }}>
                Find skilled agricultural workers when you need them most
              </Typography>
              <List>
                {benefits.slice(0, 3).map((benefit, index) => (
                  <ListItem key={index} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#43a047', width: 32, height: 32 }}>
                        <Check sx={{ color: 'white', fontSize: 18 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={benefit} sx={{ color: '#2e7d32', fontWeight: '500' }} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 2, backgroundColor: '#43a047', color: '#fffde7', fontWeight: 'bold', boxShadow: 2, '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }, transition: 'all 0.3s' }}
                onClick={() => navigate('/register')}
              >
                Start as Farmer
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: '#fffde7',
                  border: '2px solid #c8e6c9',
                  boxShadow: 3,
                  borderRadius: 2,
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                <People sx={{ fontSize: 100, color: '#43a047', mb: 2 }} />
                <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  Join Our Community
                </Typography>
                <Typography variant="body1" sx={{ color: '#8bc34a', fontWeight: '500' }}>
                  Over 10,000 farmers and workers already connected
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* For Workers Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                background: '#e3f2fd',
                border: '2px solid #90caf9',
                boxShadow: 3,
                borderRadius: 2,
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            >
              <Work sx={{ fontSize: 100, color: '#fbc02d', mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Find Your Next Job
              </Typography>
              <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: '500' }}>
                Discover opportunities that match your skills
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              For Agricultural Workers
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: '#2e7d32', fontWeight: '500' }}>
              Connect with farmers and grow your career
            </Typography>
            <List>
              {benefits.slice(3).map((benefit, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#fbc02d', width: 32, height: 32 }}>
                      <Check sx={{ color: '#1976d2', fontSize: 18 }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={benefit} sx={{ color: '#1976d2', fontWeight: '500' }} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, backgroundColor: '#fbc02d', color: '#1976d2', fontWeight: 'bold', boxShadow: 2, '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }, transition: 'all 0.3s' }}
              onClick={() => navigate('/register')}
            >
              Start as Worker
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ width: '100%', borderBottom: '2px dashed #90caf9', my: 4 }} />

      {/* Categories Section with Images */}
      <Box sx={{ py: 10, background: 'white' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', color: '#2e7d32', fontWeight: 'bold', mb: 6, animation: 'slideInDown 0.8s ease-out' }}
          >
            Agricultural Services
          </Typography>

          <Grid container spacing={3}>
            {/* Fresh Crops */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-8px)',
                  },
                  animation: 'slideInUp 0.8s ease-out',
                }}
              >
                <Box
                  sx={{
                    height: 250,
                    background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1488459716781-6818f60ebb51?w=500&h=300&fit=crop"
                    alt="Fresh Crops"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Agriculture sx={{ fontSize: 60, color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
                  </Box>
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                    Fresh Crops
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Buy and sell fresh agricultural produce directly from farmers
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: '#43a047', textTransform: 'capitalize' }}
                    onClick={() => navigate('/tasks')}
                  >
                    Explore <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Farm Workers */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-8px)',
                  },
                  animation: 'slideInUp 0.9s ease-out',
                }}
              >
                <Box
                  sx={{
                    height: 250,
                    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop"
                    alt="Farm Workers"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <People sx={{ fontSize: 60, color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
                  </Box>
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f57c00', mb: 1 }}>
                    Farm Workers
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Hire skilled and verified agricultural workers instantly
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: '#ff9800', textTransform: 'capitalize' }}
                    onClick={() => navigate('/labour-hire')}
                  >
                    Hire Now <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Harvest Time */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-8px)',
                  },
                  animation: 'slideInUp 1s ease-out',
                }}
              >
                <Box
                  sx={{
                    height: 250,
                    background: 'linear-gradient(135deg, #fbc02d 0%, #f9a825 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=300&fit=crop"
                    alt="Harvest Time"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Work sx={{ fontSize: 60, color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
                  </Box>
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f9a825', mb: 1 }}>
                    Harvest Time
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Manage seasonal tasks and coordinate harvest operations
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: '#fbc02d', color: '#333', textTransform: 'capitalize' }}
                    onClick={() => navigate('/tasks')}
                  >
                    View Tasks <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Heavy Equipment */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-8px)',
                  },
                  animation: 'slideInUp 1.1s ease-out',
                }}
              >
                <Box
                  sx={{
                    height: 250,
                    background: 'linear-gradient(135deg, #78909c 0%, #546e7a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
                    alt="Heavy Equipment"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LocalShipping sx={{ fontSize: 60, color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
                  </Box>
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#546e7a', mb: 1 }}>
                    Heavy Equipment
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Rent tractors and farm machinery on demand
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: '#78909c', textTransform: 'capitalize' }}
                    onClick={() => navigate('/tractor-hire')}
                  >
                    Rent Now <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section with Animation */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #43a047 0%, #fbc02d 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          animation: 'slideInUp 0.8s ease-out',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#fffde7', fontWeight: 'bold', textShadow: '2px 2px 8px #388e3c' }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, color: '#fffde7', fontWeight: '500' }}>
            Join thousands of farmers and workers who are already using AgriConnect<br />
            <span style={{ color: '#ffe082', fontWeight: 'bold' }}>Streamline your agricultural operations today!</span>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#fbc02d', color: '#2e7d32', fontWeight: 'bold', boxShadow: 2, '&:hover': { transform: 'scale(1.05)' }, transition: 'all 0.3s' }}
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: '#fffde7', borderColor: '#fffde7', fontWeight: 'bold', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              onClick={() => navigate('/chat')}
            >
              Try AI Assistant
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
