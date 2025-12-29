import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Work,
  People,
  TrendingUp,
  Notifications,
  Add,
  Agriculture,
  Chat,
  Assignment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const isFarmer = user?.userType === 'FARMER';
  const isLabour = user?.userType === 'LABOUR';

  const stats = [
    {
      title: isFarmer ? 'Active Jobs' : 'Applied Jobs',
      value: '12',
      icon: <Work />,
      color: 'primary',
    },
    {
      title: isFarmer ? 'Total Workers' : 'Completed Jobs',
      value: '45',
      icon: <People />,
      color: 'secondary',
    },
    {
      title: 'This Month',
      value: isFarmer ? '$2,400' : '$1,200',
      icon: <TrendingUp />,
      color: 'success',
    },
    {
      title: 'Notifications',
      value: '8',
      icon: <Notifications />,
      color: 'warning',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: isFarmer ? 'New worker applied to your corn harvesting job' : 'Applied to corn harvesting job',
      time: '2 hours ago',
      type: 'application',
    },
    {
      id: 2,
      title: isFarmer ? 'Payment received for wheat planting task' : 'Payment received for wheat planting',
      time: '1 day ago',
      type: 'payment',
    },
    {
      id: 3,
      title: 'AI recommendation: Consider hiring skilled workers for upcoming harvest',
      time: '2 days ago',
      type: 'ai',
    },
  ];

  const quickActions = [
    {
      title: isFarmer ? 'Post New Job' : 'Browse Jobs',
      description: isFarmer ? 'Create a new agricultural task' : 'Find available work',
      icon: <Add />,
      action: () => navigate(isFarmer ? '/tasks/create' : '/tasks'),
      color: 'primary',
    },
    {
      title: 'AI Assistant',
      description: 'Get agricultural guidance',
      icon: <Chat />,
      action: () => navigate('/chat'),
      color: 'secondary',
    },
    {
      title: 'Update Profile',
      description: 'Manage your information',
      icon: <Assignment />,
      action: () => navigate('/profile'),
      color: 'success',
    },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user.firstName}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isFarmer 
            ? 'Manage your agricultural tasks and connect with skilled workers'
            : 'Find new opportunities and grow your agricultural career'
          }
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ backgroundColor: `${stat.color}.main` }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={action.action}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      p: 2,
                      borderColor: `${action.color}.main`,
                      color: `${action.color}.main`,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" component="div">
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      {activity.type === 'application' && <People color="primary" />}
                      {activity.type === 'payment' && <TrendingUp color="success" />}
                      {activity.type === 'ai' && <Agriculture color="secondary" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Agriculture sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">
                  AI Recommendations
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, backgroundColor: 'secondary.light', color: 'white' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Weather Alert
                    </Typography>
                    <Typography variant="body2">
                      Rain expected in 3 days. Consider scheduling outdoor tasks accordingly.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, backgroundColor: 'primary.light', color: 'white' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Market Insight
                    </Typography>
                    <Typography variant="body2">
                      Corn prices are up 15% this week. Good time to plan harvesting.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, backgroundColor: 'success.light', color: 'white' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Skill Match
                    </Typography>
                    <Typography variant="body2">
                      {isFarmer 
                        ? '3 skilled workers available in your area for harvesting'
                        : 'Your skills match 5 new job postings in your area'
                      }
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
