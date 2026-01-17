import React from 'react';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ cartItems, removeFromCart }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
        🛒 Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#999' }}>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/thrift"
            sx={{ background: '#8B6914' }}
          >
            Continue Shopping
          </Button>
        </Card>
      ) : (
        <>
          <TableContainer component={Card} sx={{ mb: 3 }}>
            <Table>
              <TableHead sx={{ background: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell align="right"><strong>Price</strong></TableCell>
                  <TableCell align="center"><strong>Seller</strong></TableCell>
                  <TableCell align="center"><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="center">{item.seller || 'Aurum'}</TableCell>
                    <TableCell align="center">
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: '#d32f2f' }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">
                  <strong>Total Items:</strong> {cartItems.length}
                </Typography>
                <Typography variant="h5" sx={{ color: '#8B6914', fontWeight: 'bold', mt: 1 }}>
                  Total: ${totalPrice}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/checkout"
                sx={{ background: '#8B6914', '&:hover': { background: '#6b5410' } }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Card>

          <Button
            variant="outlined"
            component={Link}
            to="/thrift"
            sx={{ color: '#8B6914', borderColor: '#8B6914' }}
          >
            ← Continue Shopping
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;
