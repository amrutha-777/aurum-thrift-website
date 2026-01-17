import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const mockStories = [
  {
    id: 1,
    productName: 'Vintage Camera',
    seller: 'Emma Thompson',
    story: 'This camera captured my first trip to Paris in 1995. Every photo is a memory of freedom and adventure.',
    likes: 24,
    date: '2 days ago',
  },
  {
    id: 2,
    productName: 'Silk Scarf',
    seller: 'Michael Chen',
    story: 'My grandmother gave me this scarf. Now I\'m passing it on so it can continue spreading joy and style.',
    likes: 45,
    date: '1 week ago',
  },
  {
    id: 3,
    productName: 'Wood Carving',
    seller: 'Sofia Rodriguez',
    story: 'Hand-carved by a local artisan from my village. It represents the beauty of traditional craftsmanship.',
    likes: 38,
    date: '3 days ago',
  },
  {
    id: 4,
    productName: 'Jazz Vinyl Records',
    seller: 'James Morrison',
    story: 'These records soundtracked my entire college years. Every scratch tells a story of late-night study sessions.',
    likes: 52,
    date: '5 days ago',
  },
];

function AurumStories() {
  const [stories, setStories] = useState(mockStories);
  const [likedStories, setLikedStories] = useState({});
  const [newStory, setNewStory] = useState('');
  const [newProductName, setNewProductName] = useState('');

  const handleLike = (storyId) => {
    setLikedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? { ...story, likes: story.likes + (likedStories[storyId] ? -1 : 1) }
          : story
      )
    );
  };

  const handleAddStory = () => {
    if (newStory.trim() && newProductName.trim()) {
      const story = {
        id: stories.length + 1,
        productName: newProductName,
        seller: 'You',
        story: newStory,
        likes: 0,
        date: 'just now',
      };
      setStories([story, ...stories]);
      setNewStory('');
      setNewProductName('');
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        📖 Aurum Stories
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Every item has a story. Share the memories, meanings, and adventures behind your treasures.
      </Typography>

      {/* Share Your Story Section */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #f5f0e8 0%, #fff 100%)', p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          ✍️ Share Your Item's Story
        </Typography>
        <TextField
          fullWidth
          label="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Tell us the story, memory, or meaning behind this item..."
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddStory}
          sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}
        >
          Share Story
        </Button>
      </Card>

      {/* Stories Display */}
      <Grid container spacing={3}>
        {stories.map((story) => (
          <Grid item xs={12} md={6} key={story.id}>
            <Card sx={{ height: '100%', '&:hover': { boxShadow: 5 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {story.productName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  By {story.seller} • {story.date}
                </Typography>
                <Typography variant="body1" sx={{ my: 2, fontStyle: 'italic', color: '#444', lineHeight: 1.6 }}>
                  "{story.story}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    startIcon={likedStories[story.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    onClick={() => handleLike(story.id)}
                    sx={{
                      color: likedStories[story.id] ? '#ff6b9d' : '#999',
                    }}
                  >
                    {story.likes}
                  </Button>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    people loved this story
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AurumStories;
