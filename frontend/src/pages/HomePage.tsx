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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // ...existing code...

  const features = [
    {
      icon: <Agriculture />,
      title: 'Smart Matching',
      description: 'AI-powered matching between farmers and skilled laborers',
    },
    {
      icon: <Work />,
      title: 'Task Management',
      description: 'Efficiently manage agricultural tasks and assignments',
    },
    {
      icon: <Chat />,
      title: 'AI Assistant',
      description: '24/7 AI-powered agricultural guidance and support',
    },
    {
      icon: <Security />,
      title: 'Secure Payments',
      description: 'Safe and reliable payment processing system',
    },
    {
      icon: <Groups />,
      title: 'Middlemen Network',
      description: 'Centralized coordinators to mobilize labour quickly',
    },
    {
      icon: <LocalShipping />,
      title: 'Tractor Hire',
      description: 'Rent tractors by fare or nearest distance',
    },
    {
      icon: <Campaign />,
      title: 'Announcements',
      description: 'Govt circulars, weather alerts and market news',
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
    
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80)', // Large farming land with ox
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    }}>
      
      {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            color: 'white',
            py: 10,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #43a047 0%, #fbc02d 100%)',
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <Box sx={{ mb: 3, borderRadius: 4, overflow: 'hidden', boxShadow: 3, border: '4px solid #fff', background: '#fff' }}>
                <img
                  src="https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
                  alt="Farming GIF"
                  style={{ width: '340px', height: '220px', objectFit: 'cover', display: 'block' }}
                />
              </Box>
              <Typography variant="h1" component="h1" gutterBottom sx={{ color: '#fffde7', textShadow: '2px 2px 8px #388e3c' }}>
                🌾 AgriConnect
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, color: '#fffde7', textShadow: '1px 1px 6px #fbc02d' }}>
                Connecting Farmers with Skilled Agricultural Workers
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, color: '#fffde7' }}>
                The modern platform that bridges the gap between farmers and laborers<br />
                <span style={{ color: '#ffe082' }}>AI-powered matching and seamless task management.</span>
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#fbc02d', color: '#388e3c', fontWeight: 'bold', boxShadow: 2 }}
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ color: '#fffde7', borderColor: '#fffde7', fontWeight: 'bold' }}
                onClick={() => navigate('/tasks')}
              >
                Browse Jobs
              </Button>
            </Box>
          </Container>
        </Box>

      {/* Image highlight strip */}
        <Container maxWidth="lg" sx={{ mt: -6 }}>
        <Grid container spacing={2}>
          {[
            'https://images.unsplash.com/photo-1500937386664-56f3d81aa8cf?auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1519003300449-424ad0405076?auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=900&q=60',
          ].map((src, idx) => (
            <Grid key={idx} item xs={6} md={3}>
              <Paper sx={{
                pt: '56.25%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }}>
                <Box component="img" src={src} alt="agri" sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Location section: Map + Address for Kuraganipalli Old Age Home */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, color: '#388e3c', fontWeight: 'bold' }}>
          Visit Kuraganipalli Old Age Home
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Paper sx={{ height: '100%', overflow: 'hidden' }} className="agri-card">
              <iframe
                title="Kuraganipalli Old Age Home Map"
                src="https://www.google.com/maps?q=Kuraganipalli%20Old%20Age%20Home&z=15&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, height: '100%' }} className="agri-card">
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Kuraganipalli Old Age Home
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Kuraganipalli, Near [Landmark], [Taluk], [District], [State], India
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>PIN:</strong> 516XXX (please confirm exact PIN)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +91-XXXXXXXXXX
                <br />
                Email: info@kuraganipalli.org
              </Typography>

              <Button
                variant="contained"
                className="agri-cta"
                sx={{ mt: 3 }}
                component="a"
                href="https://www.google.com/maps/search/?api=1&query=Kuraganipalli+Old+Age+Home"
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ...removed decor section... */}

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#388e3c', fontWeight: 'bold' }}>
          Why Choose AgriConnect?
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ mb: 6, color: '#8bc34a' }}>
          Built with modern technology to serve the agricultural community
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fffde7', border: '2px solid #c8e6c9', boxShadow: 2 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: '#43a047', mr: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#8bc34a' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ width: '100%', borderBottom: '2px dashed #ffe082', my: 4 }} />

      {/* Benefits Section */}
      <Box sx={{ background: 'linear-gradient(90deg, #fbc02d 0%, #fffde7 100%)', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                For Farmers
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: '#8bc34a' }}>
                Find skilled agricultural workers when you need them most
              </Typography>
              <List>
                {benefits.slice(0, 3).map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <TrendingUp sx={{ color: '#43a047' }} />
                    </ListItemIcon>
                    <ListItemText primary={benefit} sx={{ color: '#388e3c' }} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 2, backgroundColor: '#43a047', color: '#fffde7', fontWeight: 'bold', boxShadow: 2 }}
                onClick={() => navigate('/register')}
              >
                Start as Farmer
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, textAlign: 'center', background: '#fffde7', border: '2px solid #c8e6c9', boxShadow: 2 }}>
                <People sx={{ fontSize: 80, color: '#43a047', mb: 2 }} />
                <Typography variant="h4" gutterBottom sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                  Join Our Community
                </Typography>
                <Typography variant="body1" sx={{ color: '#8bc34a' }}>
                  Over 10,000 farmers and workers already connected
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* ...removed DecorPicker and FAB... */}

      {/* For Workers Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, textAlign: 'center', background: '#e3f2fd', border: '2px solid #90caf9', boxShadow: 2 }}>
              <Work sx={{ fontSize: 80, color: '#fbc02d', mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Find Your Next Job
              </Typography>
              <Typography variant="body1" sx={{ color: '#388e3c' }}>
                Discover opportunities that match your skills
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              For Agricultural Workers
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: '#388e3c' }}>
              Connect with farmers and grow your career
            </Typography>
            <List>
              {benefits.slice(3).map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Speed sx={{ color: '#fbc02d' }} />
                  </ListItemIcon>
                  <ListItemText primary={benefit} sx={{ color: '#1976d2' }} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, backgroundColor: '#fbc02d', color: '#1976d2', fontWeight: 'bold', boxShadow: 2 }}
              onClick={() => navigate('/register')}
            >
              Start as Worker
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ width: '100%', borderBottom: '2px dashed #90caf9', my: 4 }} />

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #43a047 0%, #fbc02d 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#fffde7', fontWeight: 'bold', textShadow: '2px 2px 8px #388e3c' }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, color: '#fffde7' }}>
            Join thousands of farmers and workers who are already using AgriConnect<br />
            <span style={{ color: '#ffe082' }}>Streamline your agricultural operations today!</span>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#fbc02d', color: '#388e3c', fontWeight: 'bold', boxShadow: 2 }}
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: '#fffde7', borderColor: '#fffde7', fontWeight: 'bold' }}
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
