import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Button, Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const vaultItems = [
  {
    id: 1,
    name: 'Authentic Rolex Submariner (1970s)',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop&q=80',
    condition: 'Excellent',
    seller: 'Luxury Collectibles',
    category: 'Watches',
    rarity: 'Rare',
    story: 'Certified authentic with original papers. Kept in pristine condition.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Hermes Birkin Bag (1990s)',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop&q=80',
    condition: 'Like New',
    seller: 'Luxury Collectibles',
    category: 'Handbags',
    rarity: 'Very Rare',
    story: 'Classic design, investment piece. Certificate of authenticity included.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Vintage Chanel No. 5 (1960s Bottle)',
    price: 850,
    image: 'https://images.unsplash.com/photo-1594737366411-28a9162ce9d7?w=400&h=300&fit=crop&q=80',
    condition: 'Excellent',
    seller: 'Vintage Collectibles',
    category: 'Perfume',
    rarity: 'Rare',
    story: 'Original packaging, sealed. A collector\'s piece.',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Original Oil Painting (19th Century)',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=400&h=300&fit=crop&q=80',
    condition: 'Good',
    seller: 'Art Curator',
    category: 'Art',
    rarity: 'Extremely Rare',
    story: 'Signed piece by emerging artist. Museum quality frame included.',
    rating: 5,
  },
  {
    id: 5,
    name: 'First Edition Tolkien Book (1954)',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop&q=80',
    condition: 'Very Good',
    seller: 'Book Collector',
    category: 'Literature',
    rarity: 'Rare',
    story: 'Fellowship of the Ring first edition with dust jacket.',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Vintage Rolex Day-Date Gold (1980s)',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop&q=80',
    condition: 'Excellent',
    seller: 'Luxury Collectibles',
    category: 'Watches',
    rarity: 'Rare',
    story: '18K gold, fully serviced. Investment-grade timepiece.',
    rating: 5,
  },
];

function AurumVault({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Watches', 'Handbags', 'Art', 'Literature', 'Perfume'];
  
  const filteredItems = selectedCategory === 'All'
    ? vaultItems
    : vaultItems.filter(item => item.category === selectedCategory);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        💎 Aurum Vault - Premium & Rare Collectibles
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Curated collection of authentic vintage, luxury, and rare items for discerning collectors.
      </Typography>

      {/* Category Filter */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, justifyContent: 'center' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? 'filled' : 'outlined'}
            sx={{
              background: selectedCategory === cat ? '#c9a961' : 'transparent',
              color: selectedCategory === cat ? '#fff' : '#c9a961',
              borderColor: '#c9a961',
              fontWeight: 'bold',
            }}
          />
        ))}
      </Box>

      {/* Items Grid */}
      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '2px solid #c9a961', '&:hover': { boxShadow: 6 } }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia 
                  component="img" 
                  height="200" 
                  image={item.image} 
                  alt={item.name}
                  sx={{ objectFit: 'cover', width: '100%' }}
                  onError={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
                />
                <Chip
                  label={item.rarity}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: '#c9a961',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{
                        fontSize: '16px',
                        color: i < Math.floor(item.rating) ? '#FFD700' : '#ccc',
                      }}
                    />
                  ))}
                  <Typography variant="caption" sx={{ ml: 1, color: '#999' }}>
                    {item.rating}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ color: '#c9a961', fontWeight: 'bold', mb: 1 }}>
                  ${item.price}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Condition:</strong> {item.condition}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  <strong>Seller:</strong> {item.seller}
                </Typography>

                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 2 }}>
                  "{item.story}"
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => {
                    addToCart(item);
                    alert(`${item.name} added to cart!`);
                  }}
                  sx={{ background: '#c9a961', '&:hover': { background: '#b59451' } }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AurumVault;
