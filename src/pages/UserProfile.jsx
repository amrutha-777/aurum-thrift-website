import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Avatar, Tab, Tabs, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const mockBuyerProfiles = {
  'user-1': {
    id: 'user-1',
    name: 'Emma Johnson',
    avatar: 'EJ',
    email: 'emma@example.com',
    bio: 'Vintage enthusiast and thrift lover. Always looking for unique treasures with stories.',
    joinDate: 'Jun 2023',
    rating: 4.7,
    reviewsReceived: 23,
    itemsPurchased: 45,
    storiesShared: 8,
    followers: 342,
    location: 'San Francisco, CA',
    favoriteCategories: ['Vintage Fashion', 'Vintage Jewelry', 'Home Decor'],
    purchaseHistory: [
      { id: 1, item: 'Vintage Leather Jacket', price: 45, date: 'Dec 2024', rating: 5 },
      { id: 2, item: 'Classic Denim Jeans', price: 25, date: 'Nov 2024', rating: 5 },
      { id: 3, item: 'Elegant Dress', price: 35, date: 'Nov 2024', rating: 4 },
    ],
    stories: [
      { id: 1, title: 'Found this gem at a local flea market', likes: 34 },
      { id: 2, title: 'How I styled this vintage piece', likes: 28 },
    ],
  },
};

function UserProfile() {
  const { userId } = useParams();
  const profile = mockBuyerProfiles[userId] || mockBuyerProfiles['user-1'];
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 4 }}>
      {/* Cover */}
      <Box sx={{ background: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 100%)', height: 200, borderRadius: 2, mb: 3 }} />

      {/* Profile Header */}
      <Card sx={{ mx: 'auto', mt: -8, mb: 4, maxWidth: '800px', position: 'relative', zIndex: 10 }}>
        <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Avatar sx={{ width: 120, height: 120, background: '#8B6914', fontSize: 40, fontWeight: 'bold' }}>
            {profile.avatar}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {profile.name}
            </Typography>

            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              {profile.bio}
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {profile.rating}⭐
                </Typography>
                <Typography variant="caption">({profile.reviewsReceived} reviews)</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {profile.itemsPurchased}
                </Typography>
                <Typography variant="caption">Items Purchased</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {profile.storiesShared}
                </Typography>
                <Typography variant="caption">Stories Shared</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B6914' }}>
                  {profile.followers}
                </Typography>
                <Typography variant="caption">Followers</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}>
                Follow User
              </Button>
              <Button variant="outlined" sx={{ color: '#8B6914', borderColor: '#8B6914' }}>
                Message
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Info */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                📍 Location
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {profile.location}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                📅 Member Since
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {profile.joinDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                ❤️ Interests
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Vintage Fashion
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`Purchase History (${profile.purchaseHistory.length})`} />
          <Tab label={`Stories (${profile.stories.length})`} />
          <Tab label="Collections" />
        </Tabs>
      </Box>

      {/* Purchase History */}
      {tabValue === 0 && (
        <Grid container spacing={2}>
          {profile.purchaseHistory.map((purchase) => (
            <Grid item xs={12} key={purchase.id}>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {purchase.item}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Purchased {purchase.date}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" sx={{ color: '#8B6914', fontWeight: 'bold', mb: 1 }}>
                      ${purchase.price}
                    </Typography>
                    <Rating value={purchase.rating} readOnly size="small" />
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Stories */}
      {tabValue === 1 && (
        <Grid container spacing={2}>
          {profile.stories.map((story) => (
            <Grid item xs={12} md={6} key={story.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {story.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                    A story shared by {profile.name}...
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8B6914', fontWeight: 'bold' }}>
                    ❤️ {story.likes} people loved this
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Collections */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              👜 Favorite Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {profile.favoriteCategories.map((cat, idx) => (
                <Button key={idx} variant="outlined" sx={{ color: '#8B6914', borderColor: '#8B6914' }}>
                  {cat}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default UserProfile;
