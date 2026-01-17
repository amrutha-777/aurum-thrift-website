import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Button, Rating, TextField, Container } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const mockProducts = {
  1: {
    id: 1,
    name: 'Vintage Leather Jacket',
    price: 45,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=300&fit=crop&q=80',
    condition: 'Good',
    seller: 'John Doe',
    story: 'This jacket was my companion through college days. Perfect for any season!',
    description: 'High-quality leather jacket from the 1990s. Minimal wear, great condition.',
    size: 'M',
    color: 'Brown',
    rating: 4.5,
    reviews: 12,
  },
};

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = mockProducts[id] || mockProducts[1];
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [userRating, setUserRating] = useState(0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} item(s) added to cart!`);
  };

  const handleSubmitReview = () => {
    if (review.trim() && userRating > 0) {
      alert('Review submitted! Thank you for your feedback.');
      setReview('');
      setUserRating(0);
    } else {
      alert('Please provide a rating and review.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia 
              component="img" 
              image={product.image} 
              alt={product.name}
              sx={{ height: 400, objectFit: 'cover', width: '100%' }}
              onError={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
            />
          </Card>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ color: '#666' }}>
              ({product.reviews} reviews)
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ color: '#8B6914', fontWeight: 'bold', mb: 2 }}>
            ${product.price}
          </Typography>

          <Box sx={{ background: '#f9f9f9', p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Condition:</strong> {product.condition}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Size:</strong> {product.size}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Color:</strong> {product.color}
            </Typography>
            <Typography variant="body2">
              <strong>Seller:</strong> {product.seller}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            About This Item
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: '#666', lineHeight: 1.8 }}>
            {product.description}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontStyle: 'italic', color: '#8B6914' }}>
            Seller's Story
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: '#666', fontStyle: 'italic', lineHeight: 1.8 }}>
            "{product.story}"
          </Typography>

          {/* Quantity & Add to Cart */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Quantity:
              </Typography>
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                sx={{ minWidth: '30px', p: '4px', color: '#8B6914' }}
              >
                −
              </Button>
              <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                {quantity}
              </Typography>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                sx={{ minWidth: '30px', p: '4px', color: '#8B6914' }}
              >
                +
              </Button>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' }, ml: 'auto' }}
            >
              Add to Cart
            </Button>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            sx={{ color: '#8B6914', borderColor: '#8B6914', mb: 2 }}
          >
            Contact Seller
          </Button>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Customer Reviews
        </Typography>

        {/* Write Review */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Write a Review
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Your Rating:</strong>
            </Typography>
            <Rating
              value={userRating}
              onChange={(event, newValue) => setUserRating(newValue)}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Share your experience with this product..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmitReview}
            sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}
          >
            Submit Review
          </Button>
        </Card>

        {/* Sample Reviews */}
        <Card sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Sarah M.
              </Typography>
              <Rating value={5} readOnly size="small" />
            </Box>
            <Typography variant="caption" sx={{ color: '#999' }}>
              2 days ago
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Great quality! Better than expected. Fast shipping and the seller included a nice note. Would buy again!
          </Typography>
        </Card>

        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Michael T.
              </Typography>
              <Rating value={4} readOnly size="small" />
            </Box>
            <Typography variant="caption" sx={{ color: '#999' }}>
              1 week ago
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Good product. Minor imperfections but well worth the price. Seller was responsive and helpful.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
}

export default ProductDetail;
