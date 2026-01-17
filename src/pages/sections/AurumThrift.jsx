import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const mockProducts = [
  {
    id: 1,
    name: 'Vintage Leather Jacket',
    price: 45,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=300&fit=crop&q=80',
    condition: 'Good',
    seller: 'John Doe',
    story: 'This jacket was my companion through college days. Perfect for any season!',
  },
  {
    id: 2,
    name: 'Classic Denim Jeans',
    price: 25,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=300&fit=crop&q=80',
    condition: 'Like New',
    seller: 'Jane Smith',
    story: 'Worn only once. Too small now, but they\'re great quality!',
  },
  {
    id: 3,
    name: 'Retro Sweater',
    price: 18,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&q=80',
    condition: 'Good',
    seller: 'Mike Johnson',
    story: 'A cozy sweater from the 90s. Perfect vintage piece!',
  },
  {
    id: 4,
    name: 'Elegant Dress',
    price: 35,
    image: 'https://images.unsplash.com/photo-1595777712933-a3f0b06755c9?w=400&h=300&fit=crop&q=80',
    condition: 'Excellent',
    seller: 'Sarah Wilson',
    story: 'Wore this to my best friend\'s wedding. It brings back wonderful memories!',
  },
  {
    id: 5,
    name: 'Canvas Backpack',
    price: 22,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&q=80',
    condition: 'Good',
    seller: 'Alex Brown',
    story: 'Traveled across Europe with this backpack. Still going strong!',
  },
  {
    id: 6,
    name: 'Wool Coat',
    price: 55,
    image: 'https://images.unsplash.com/photo-1539533057592-4ee4f3bbb86f?w=400&h=300&fit=crop&q=80',
    condition: 'Excellent',
    seller: 'Emma Davis',
    story: 'Kept me warm for 10 winters. Beautiful craftsmanship!',
  },
];

function AurumThrift({ addToCart }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        🛍️ Aurum Thrift - Quality Second-Hand Items
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Discover affordable, quality pre-loved items. Every purchase is a treasure hunt!
      </Typography>

      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 5 } }}>
              <CardMedia 
                component="img" 
                height="200" 
                image={product.image} 
                alt={product.name}
                sx={{ objectFit: 'cover', width: '100%' }}
                onError={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
                  <strong>Price:</strong> ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Condition:</strong> {product.condition}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  <strong>Seller:</strong> {product.seller}
                </Typography>
                <Typography variant="caption" sx={{ color: '#8B6914' }}>
                  "{product.story}"
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => {
                    addToCart(product);
                    alert(`${product.name} added to cart!`);
                  }}
                  sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}
                >
                  Add to Cart
                </Button>
                <Button variant="outlined" fullWidth onClick={() => handleOpen(product)}>
                  Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Detail Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <Box sx={{ p: 3 }}>
            <CardMedia component="img" image={selectedProduct.image} alt={selectedProduct.name} sx={{ borderRadius: 1, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedProduct.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#8B6914', mb: 2 }}>
              ${selectedProduct.price}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Condition:</strong> {selectedProduct.condition}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Seller:</strong> {selectedProduct.seller}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', color: '#666' }}>
              "{selectedProduct.story}"
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  addToCart(selectedProduct);
                  handleClose();
                  alert('Added to cart!');
                }}
                sx={{ background: '#8B6914' }}
              >
                Add to Cart
              </Button>
              <Button variant="outlined" fullWidth onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default AurumThrift;
