import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Dialog, TextField, LinearProgress } from '@mui/material';
import LeafIcon from '@mui/icons-material/Nature';

const sustainabilityStats = [
  { title: 'Items Saved from Landfills', count: '12,540', icon: '♻️' },
  { title: 'CO2 Emissions Avoided (kg)', count: '2,850', icon: '🌍' },
  { title: 'Gallons of Water Saved', count: '45,200', icon: '💧' },
  { title: 'Active Circular Economy Users', count: '3,200', icon: '👥' },
];

const resaleItems = [
  {
    id: 1,
    name: 'Used Cotton T-Shirt',
    originalValue: 30,
    resaleValue: 8,
    timesResold: 3,
    carbonSaved: 12,
  },
  {
    id: 2,
    name: 'Vintage Denim Jacket',
    originalValue: 120,
    resaleValue: 45,
    timesResold: 2,
    carbonSaved: 25,
  },
  {
    id: 3,
    name: 'Leather Handbag',
    originalValue: 200,
    resaleValue: 75,
    timesResold: 1,
    carbonSaved: 35,
  },
  {
    id: 4,
    name: 'Sweater Bundle',
    originalValue: 80,
    resaleValue: 20,
    timesResold: 4,
    carbonSaved: 18,
  },
];

function AurumLoop() {
  const [openReleaseItem, setOpenReleaseItem] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');

  const handleReleaseItem = () => {
    if (itemName && itemDesc) {
      alert(`Great! "${itemName}" is now part of the Aurum Loop. Let's give it a second life! 🌱`);
      setItemName('');
      setItemDesc('');
      setOpenReleaseItem(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        ♻️ Aurum Loop - Sustainability & Circular Economy
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Be part of the movement. Every item you resell reduces waste and carbon emissions.
      </Typography>

      {/* Impact Statistics */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {sustainabilityStats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ textAlign: 'center', background: 'linear-gradient(135deg, #52a552 0%, #7ec97e 100%)', color: '#fff' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {stat.count}
                </Typography>
                <Typography variant="body2">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Release Item Section */}
      <Card sx={{ mb: 6, background: 'linear-gradient(135deg, #f0f8f0 0%, #fff 100%)', p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <LeafIcon sx={{ fontSize: 40, color: '#52a552' }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Release an Item into the Loop
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Have clothing or items you no longer need? Release them into Aurum Loop and let them find a new home.
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => setOpenReleaseItem(true)}
          sx={{ background: '#52a552', '&:hover': { background: '#45924d' } }}
        >
          + Release an Item
        </Button>
      </Card>

      {/* How It Works */}
      <Card sx={{ mb: 6, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          🌱 How the Circular Economy Works
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: '#52a552' }}>
                1️⃣
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Release
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Post items you no longer wear or use.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: '#52a552' }}>
                2️⃣
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Discover
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Someone finds your item and loves it.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: '#52a552' }}>
                3️⃣
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Reuse
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Your item gets a second (or third) life.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: '#52a552' }}>
                4️⃣
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Repeat
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  When ready, it can be released again!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Resale Tracking */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        📊 Items in the Loop - Current Resale Cycles
      </Typography>
      <Grid container spacing={3}>
        {resaleItems.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card sx={{ '&:hover': { boxShadow: 5 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {item.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      <strong>Original Value:</strong> ${item.originalValue}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#52a552', fontWeight: 'bold' }}>
                      Current Resale: ${item.resaleValue}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(item.resaleValue / item.originalValue) * 100}
                    sx={{ background: '#e0e0e0', '& .MuiLinearProgress-bar': { background: '#52a552' } }}
                  />
                </Box>

                <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                  <strong>Times Resold:</strong> {item.timesResold} times
                </Typography>
                <Typography variant="body2" sx={{ color: '#52a552', fontWeight: 'bold' }}>
                  <strong>Carbon Saved:</strong> {item.carbonSaved} kg CO₂
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Release Item Dialog */}
      <Dialog open={openReleaseItem} onClose={() => setOpenReleaseItem(false)} fullWidth maxWidth="sm">
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            ♻️ Release an Item into Aurum Loop
          </Typography>
          <TextField
            fullWidth
            label="Item Name/Description"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Tell us about the item's condition, size, color, etc..."
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 2 }}>
            By releasing this item, you're helping reduce textile waste and contributing to a sustainable future!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleReleaseItem}
              sx={{ background: '#52a552', '&:hover': { background: '#45924d' } }}
            >
              Release Item
            </Button>
            <Button variant="outlined" fullWidth onClick={() => setOpenReleaseItem(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default AurumLoop;
