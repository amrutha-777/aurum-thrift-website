import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Avatar, Tab, Tabs, Chip, Dialog, TextField, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import EditIcon from '@mui/icons-material/Edit';

const mockSellers = {
  'seller-1': {
    id: 'seller-1',
    name: 'John\'s Vintage Hub',
    owner: 'John Doe',
    avatar: 'JVH',
    bio: 'Curating the finest vintage pieces from around the world. Every item tells a story.',
    isVerified: true,
    joinDate: 'Jan 2024',
    rating: 4.8,
    reviews: 45,
    productsSold: 127,
    storiesShared: 23,
    followers: 892,
    coverImage: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 100%)',
    location: 'New York, USA',
    response_time: '2 hours',
    return_policy: '14 days',
    products: [
      { id: 1, name: 'Vintage Leather Jacket', price: 45, image: 'jacket.jpg', likes: 34 },
      { id: 2, name: 'Classic Denim Jeans', price: 25, image: 'jeans.jpg', likes: 28 },
    ],
    stories: [
      { id: 1, title: 'This jacket traveled across Europe', likes: 54 },
      { id: 2, title: 'Vintage denim from the 80s era', likes: 42 },
    ],
  },
};

function SellerProfile() {
  const { sellerId } = useParams();
  const seller = mockSellers[sellerId] || mockSellers['seller-1'];
  const [tabValue, setTabValue] = useState(0);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      alert('Message sent to ' + seller.name + '!');
      setMessage('');
      setOpenMessage(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Cover Section */}
      <Box sx={{ background: seller.coverImage, height: 200, borderRadius: 2, mb: 3 }} />

      {/* Profile Header */}
      <Card sx={{ mx: 'auto', mt: -8, mb: 4, maxWidth: '800px', position: 'relative', zIndex: 10 }}>
        <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Avatar sx={{ width: 120, height: 120, background: '#8B6914', fontSize: 40, fontWeight: 'bold' }}>
            {seller.avatar}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {seller.name}
              </Typography>
              {seller.isVerified && (
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified"
                  sx={{ background: '#4CAF50', color: '#fff', fontWeight: 'bold' }}
                />
              )}
            </Box>

            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              {seller.bio}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {seller.rating}⭐
                </Typography>
                <Typography variant="caption">({seller.reviews} reviews)</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {seller.productsSold}
                </Typography>
                <Typography variant="caption">Products Sold</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {seller.storiesShared}
                </Typography>
                <Typography variant="caption">Stories Shared</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {seller.followers}
                </Typography>
                <Typography variant="caption">Followers</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => setOpenMessage(true)}
                sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}
              >
                Message Seller
              </Button>
              <Button variant="outlined" sx={{ color: '#8B6914', borderColor: '#8B6914' }}>
                Follow Shop
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Trust & Details */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                📍 Location
              </Typography>
              <Typography variant="body2">{seller.location}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                ⚡ Response Time
              </Typography>
              <Typography variant="body2">{seller.response_time}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                🔄 Returns
              </Typography>
              <Typography variant="body2">{seller.return_policy}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                📅 Member Since
              </Typography>
              <Typography variant="body2">{seller.joinDate}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`Products (${seller.products.length})`} />
          <Tab label={`Stories (${seller.stories.length})`} />
          <Tab label="Reviews" />
        </Tabs>
      </Box>

      {/* Products Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {seller.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ '&:hover': { boxShadow: 5 } }}>
                <Box sx={{ background: '#f0e6d2', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: '#999' }}>Product Image</Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#8B6914', fontWeight: 'bold', mb: 1 }}>
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" fullWidth sx={{ color: '#8B6914', borderColor: '#8B6914' }}>
                      View Details
                    </Button>
                    <Button variant="contained" sx={{ background: '#8B6914' }}>
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Stories Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          {seller.stories.map((story) => (
            <Grid item xs={12} md={6} key={story.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {story.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                    A beautiful story shared by {seller.name}...
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Reviews Tab */}
      {tabValue === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Avatar sx={{ background: '#8B6914' }}>SM</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Sarah M.
                  </Typography>
                  <Rating value={5} readOnly size="small" />
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    2 weeks ago
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Excellent seller! Items arrived perfectly packaged. The stories shared with products are wonderful and add so much value. Highly recommended! ⭐⭐⭐⭐⭐
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Avatar sx={{ background: '#D4AF37' }}>MT</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Michael T.
                  </Typography>
                  <Rating value={4} readOnly size="small" />
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    1 month ago
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Great quality items. Fast response to messages. A trusted seller on the platform!
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Message Dialog */}
      <Dialog open={openMessage} onClose={() => setOpenMessage(false)} fullWidth maxWidth="sm">
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Message {seller.name}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSendMessage}
              sx={{ background: '#8B6914' }}
            >
              Send Message
            </Button>
            <Button variant="outlined" fullWidth onClick={() => setOpenMessage(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default SellerProfile;
