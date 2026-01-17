import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 100%)',
          color: '#fff',
          py: 8,
          borderRadius: 2,
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Aurum ✨
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: '#f0e6d2' }}>
          Discover treasures with stories. Every item has a history, every story matters.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/thrift"
          sx={{ background: '#fff', color: '#8B6914', fontWeight: 'bold', '&:hover': { background: '#f0e6d2' } }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Five Sections */}
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Explore Our Collections
        </Typography>

        <Grid container spacing={3}>
          {/* Aurum Thrift */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia
                sx={{ height: 200, background: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 100%)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                  🛍️ Aurum Thrift
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Browse second-hand items at affordable prices. Quality meets value.
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to="/thrift"
                variant="outlined"
                sx={{ m: 2, color: '#8B6914', borderColor: '#8B6914' }}
              >
                Explore
              </Button>
            </Card>
          </Grid>

          {/* Aurum Stories */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia
                sx={{ height: 200, background: 'linear-gradient(135deg, #d4865a 0%, #f4a460 100%)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                  📖 Aurum Stories
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sellers share memories and meanings behind each product. Every item has a tale.
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to="/stories"
                variant="outlined"
                sx={{ m: 2, color: '#d4865a', borderColor: '#d4865a' }}
              >
                Read Stories
              </Button>
            </Card>
          </Grid>

          {/* Aurum ReDesign */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia
                sx={{ height: 200, background: 'linear-gradient(135deg, #6b5b95 0%, #9d84b7 100%)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                  🎨 Aurum ReDesign
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Request custom designs from talented designers. Personalize your finds.
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to="/redesign"
                variant="outlined"
                sx={{ m: 2, color: '#6b5b95', borderColor: '#6b5b95' }}
              >
                Customize
              </Button>
            </Card>
          </Grid>

          {/* Aurum Vault */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia
                sx={{ height: 200, background: 'linear-gradient(135deg, #c9a961 0%, #e8d5b7 100%)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                  💎 Aurum Vault
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Premium & rare items for collectors. Authentic vintage and limited editions.
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to="/vault"
                variant="outlined"
                sx={{ m: 2, color: '#c9a961', borderColor: '#c9a961' }}
              >
                View Premium
              </Button>
            </Card>
          </Grid>

          {/* Aurum Loop */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia
                sx={{ height: 200, background: 'linear-gradient(135deg, #52a552 0%, #7ec97e 100%)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                  ♻️ Aurum Loop
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sustainability focused. Reduce waste, reuse treasures, build a circular economy.
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to="/loop"
                variant="outlined"
                sx={{ m: 2, color: '#52a552', borderColor: '#52a552' }}
              >
                Learn More
              </Button>
            </Card>
          </Grid>

          {/* Designer Forum */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia
                sx={{ height: 200, background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9bcd 100%)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                  💬 Designer Forum
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Connect with designers, showcase work, build reputation, and grow your business.
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to="/designer-forum"
                variant="outlined"
                sx={{ m: 2, color: '#ff6b9d', borderColor: '#ff6b9d' }}
              >
                Join Forum
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
