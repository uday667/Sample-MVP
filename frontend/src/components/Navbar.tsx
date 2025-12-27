import React, { useState } from 'react';
import { keyframes } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Work,
  Home,
  Chat,
  Agriculture,
  Groups,
  LocalShipping,
  Campaign,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const buttonHover = keyframes`
  0% { box-shadow: 0 0 0 0 #fffde7; }
  100% { box-shadow: 0 4px 16px 0 #ffe082; }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const isLoggedIn = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    handleMenuClose();
    navigate('/');
  };

  const allNavItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Tasks', path: '/tasks', icon: <Work /> },
    { label: 'Coolie', path: '/labour', icon: <Agriculture /> },
    { label: 'Middlemen', path: '/middlemen', icon: <Groups /> },
    { label: 'Tractors', path: '/tractors', icon: <LocalShipping /> },
    { label: 'Announcements', path: '/announcements', icon: <Campaign /> },
    { label: 'Chat', path: '/chat', icon: <Chat /> },
    { label: 'Weather', path: '/weather', icon: <Agriculture /> },
    { label: 'News', path: '/news', icon: <Campaign /> },
    { label: 'Sell Crop', path: '/sell-crop', icon: <Work /> },
    { label: 'Production Centers', path: '/production-centers', icon: <Groups /> },
  ];

  // Show the first 5 items in the navbar; the rest go under "More"
  const visibleCount = 5;
  const menuItems = allNavItems.slice(0, visibleCount);
  const moreItems = allNavItems.slice(visibleCount);
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchor(event.currentTarget);
  };
  const handleMoreClose = () => {
    setMoreAnchor(null);
  };

  return (
  <AppBar
    position="fixed"
    elevation={0}
    sx={{
      background: 'transparent',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      animation: `${fadeIn} 0.7s`,
    }}
  >
  <Toolbar sx={{ minHeight: 72, animation: `${fadeIn} 0.7s` }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 800,
            letterSpacing: 1.2,
            color: 'rgba(14, 11, 10, 0.9)',
            background: 'linear-gradient(90deg,#2e7d32 0%, #66bb6a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'transform 0.2s',
            animation: `${fadeIn} 1s`,
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          }}
          onClick={() => navigate('/')}
        >
          🌾 AgriConnect
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {menuItems.map((item, idx) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(46,125,50,0.12)' : 'transparent',
                color: 'rgba(14,11,10,0.86)',
                fontWeight: 600,
                fontSize: '0.98rem',
                px: 2,
                borderRadius: 2,
                transition: 'background 0.18s, transform 0.12s',
                animation: `${fadeIn} 0.7s ${idx * 0.06}s`,
                '&:hover': {
                  backgroundColor: 'rgba(46,125,50,0.14)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 18px rgba(46,125,50,0.08)'
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            color="inherit"
            sx={{
              fontWeight: 700,
              fontSize: '0.98rem',
              px: 2,
              borderRadius: 2,
              ml: 1.5,
              backgroundColor: moreAnchor ? 'rgba(46,125,50,0.12)' : 'transparent',
              transition: 'background 0.18s, transform 0.12s',
              animation: `${fadeIn} 0.7s ${(menuItems.length) * 0.06}s`,
              boxShadow: moreAnchor ? '0 6px 18px rgba(46,125,50,0.08)' : 'none',
            }}
            onClick={handleMoreOpen}
            aria-controls={moreAnchor ? 'more-menu' : undefined}
            aria-haspopup="true"
          >
            More
          </Button>
          <Menu
            id="more-menu"
            anchorEl={moreAnchor}
            open={Boolean(moreAnchor)}
            onClose={handleMoreClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,248,225,0.98) 100%)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                borderRadius: 3,
                minWidth: 220,
                p: 1,
              },
            }}
            MenuListProps={{ sx: { animation: `${fadeIn} 0.5s` } }}
          >
            {moreItems.map((item, idx) => (
              <MenuItem
                key={item.path}
                onClick={() => { navigate(item.path); handleMoreClose(); }}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  animation: `${fadeIn} 0.5s ${idx * 0.06}s`,
                  transition: 'background 0.18s, transform 0.12s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: 2,
                  mb: 1,
                  px: 2,
                  py: 1.25,
                  '&:hover': {
                    background: 'rgba(46,125,50,0.06)',
                    color: '#2e7d32',
                    transform: 'translateX(4px)'
                  },
                }}
              >
                <Box sx={{ fontSize: 22, color: '#2e7d32', minWidth: 28 }}>{item.icon}</Box>
                <Typography sx={{ ml: 1, fontWeight: 600, fontSize: '0.98rem' }}>{item.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* User Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isLoggedIn ? (
            <>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => {
                navigate(item.path);
                handleMenuClose();
              }}
            >
              {item.icon}
              <Typography sx={{ ml: 1 }}>{item.label}</Typography>
            </MenuItem>
          ))}
          <MenuItem disabled divider />
          {moreItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => {
                navigate(item.path);
                handleMenuClose();
              }}
            >
              {item.icon}
              <Typography sx={{ ml: 1 }}>{item.label}</Typography>
            </MenuItem>
          ))}
          {isLoggedIn && (
            <>
              <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
