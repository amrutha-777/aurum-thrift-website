import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box component="footer" sx={{ 
      background: 'linear-gradient(135deg, #333 0%, #555 100%)', 
      color: '#fff', 
      py: 4, 
      mt: 6 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              ✨ Aurum
            </Typography>
            <Typography variant="body2" sx={{ color: '#bbb' }}>
              Your trusted marketplace for second-hand treasures with stories.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Sections
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/thrift" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Aurum Thrift</Link>
              <Link href="/stories" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Aurum Stories</Link>
              <Link href="/redesign" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Aurum ReDesign</Link>
              <Link href="/vault" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Aurum Vault</Link>
              <Link href="/loop" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Aurum Loop</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Help Center</Link>
              <Link href="#" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Contact Us</Link>
              <Link href="#" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Privacy Policy</Link>
              <Link href="#" sx={{ color: '#bbb', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>Terms & Conditions</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FacebookIcon sx={{ cursor: 'pointer', '&:hover': { color: '#D4AF37' } }} />
              <InstagramIcon sx={{ cursor: 'pointer', '&:hover': { color: '#D4AF37' } }} />
              <TwitterIcon sx={{ cursor: 'pointer', '&:hover': { color: '#D4AF37' } }} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid #555', mt: 3, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            © 2026 Aurum Thrift. All rights reserved. Proudly bringing second-hand treasures to life.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
