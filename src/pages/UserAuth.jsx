import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Container, Tabs, Tab, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserAuth({ setUser }) {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    userType: 'buyer',
    specialty: '',
    bio: '',
    shopName: '',
  });
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setUser({ name: 'User', email: loginData.email });
      alert('Login successful! Welcome back 👋');
      navigate('/');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.name && signupData.email && signupData.password === signupData.confirmPassword) {
      const userProfile = {
        name: signupData.name,
        email: signupData.email,
        userType: signupData.userType,
        isVerified: false,
        rating: signupData.userType === 'designer' ? 0 : null,
        reviews: 0,
        productsSold: 0,
        storiesShared: 0,
      };
      
      if (signupData.userType === 'seller') {
        userProfile.shopName = signupData.shopName;
      } else if (signupData.userType === 'designer') {
        userProfile.specialty = signupData.specialty;
        userProfile.bio = signupData.bio;
        userProfile.portfolio = [];
      }
      
      setUser(userProfile);
      alert(`Welcome to Aurum! 🎉 Your ${signupData.userType} account has been created.`);
      navigate('/');
    } else if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
            ✨ Aurum
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 4, textAlign: 'center' }}>
            Join our community of treasure hunters and designers
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="login signup tabs">
              <Tab label="Login" sx={{ flex: 1 }} />
              <Tab label="Sign Up" sx={{ flex: 1 }} />
            </Tabs>
          </Box>

          {/* Login Tab */}
          {tabValue === 0 && (
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' }, mb: 2 }}
              >
                Login
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                <a href="#forgot" style={{ color: '#8B6914', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </Typography>
            </form>
          )}

          {/* Sign Up Tab */}
          {tabValue === 1 && (
            <form onSubmit={handleSignup}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold', color: '#666' }}>
                I am a...
              </Typography>
              <RadioGroup
                value={signupData.userType}
                onChange={(e) => setSignupData({ ...signupData, userType: e.target.value })}
                row
                sx={{ mb: 2 }}
              >
                <FormControlLabel value="buyer" control={<Radio />} label="👤 Buyer" />
                <FormControlLabel value="seller" control={<Radio />} label="🛍️ Seller" />
                <FormControlLabel value="designer" control={<Radio />} label="🎨 Designer" />
              </RadioGroup>

              <TextField
                fullWidth
                label="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                sx={{ mb: 2 }}
              />

              {signupData.userType === 'seller' && (
                <TextField
                  fullWidth
                  label="Shop Name (e.g., Vintage Treasures)"
                  value={signupData.shopName}
                  onChange={(e) => setSignupData({ ...signupData, shopName: e.target.value })}
                  sx={{ mb: 2 }}
                />
              )}

              {signupData.userType === 'designer' && (
                <>
                  <TextField
                    fullWidth
                    label="Your Specialty (e.g., Embroidery, Leather Restoration)"
                    value={signupData.specialty}
                    onChange={(e) => setSignupData({ ...signupData, specialty: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="About You / Bio"
                    value={signupData.bio}
                    onChange={(e) => setSignupData({ ...signupData, bio: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </>
              )}

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}
              >
                Create Account
              </Button>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#666' }}>
                By signing up, you agree to our Terms & Conditions and Privacy Policy.
              </Typography>
            </form>
          )}

          {/* Social Login */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee' }}>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 2, color: '#666' }}>
              Or continue with
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button fullWidth variant="outlined" sx={{ color: '#8B6914', borderColor: '#8B6914' }}>
                Google
              </Button>
              <Button fullWidth variant="outlined" sx={{ color: '#8B6914', borderColor: '#8B6914' }}>
                Facebook
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UserAuth;
