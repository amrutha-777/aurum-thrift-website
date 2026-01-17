import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar({ user, cartItems }) {
  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 100%)', boxShadow: 3 }}>
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer', color: '#fff' }}
          component={Link}
          to="/"
        >
          ✨ Aurum
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/thrift" sx={{ fontWeight: 'bold' }}>
            Thrift
          </Button>
          <Button color="inherit" component={Link} to="/stories" sx={{ fontWeight: 'bold' }}>
            Stories
          </Button>
          <Button color="inherit" component={Link} to="/redesign" sx={{ fontWeight: 'bold' }}>
            ReDesign
          </Button>
          <Button color="inherit" component={Link} to="/vault" sx={{ fontWeight: 'bold' }}>
            Vault
          </Button>
          <Button color="inherit" component={Link} to="/loop" sx={{ fontWeight: 'bold' }}>
            Loop
          </Button>
          <Button color="inherit" component={Link} to="/designer-forum" sx={{ fontWeight: 'bold' }}>
            Forum
          </Button>
          
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => window.location.href = '/cart'}
            />
          </Badge>

          {user ? (
            <Button color="inherit" sx={{ fontWeight: 'bold' }}>{user.name}</Button>
          ) : (
            <Button color="inherit" component={Link} to="/auth" sx={{ fontWeight: 'bold' }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
