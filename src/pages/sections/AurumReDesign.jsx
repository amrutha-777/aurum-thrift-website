import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Grid, Dialog, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const mockRequests = [
  {
    id: 1,
    title: 'Custom Denim Jacket Design',
    customer: 'Sarah Johnson',
    description: 'Looking for a vintage-style denim jacket with custom patches and embroidery.',
    budget: '$80-150',
    status: 'Open',
    responses: 3,
  },
  {
    id: 2,
    title: 'Vintage Leather Bag Restoration',
    customer: 'Michael Brown',
    description: 'Need to restore a 1980s leather handbag. Repair + upgrade needed.',
    budget: '$50-100',
    status: 'In Progress',
    responses: 1,
  },
  {
    id: 3,
    title: 'Custom Sweater Redesign',
    customer: 'Emma Davis',
    description: 'Want to transform a plain sweater into a trendy streetwear piece.',
    budget: '$40-80',
    status: 'Open',
    responses: 5,
  },
];

const mockDesigners = [
  {
    id: 1,
    name: 'Alex Martinez',
    specialty: 'Embroidery & Patches',
    rating: 4.8,
    portfolio: ['Custom Jacket', 'Patch Design', 'Embroidered Sweater'],
    reviews: 47,
  },
  {
    id: 2,
    name: 'Lisa Wong',
    specialty: 'Leather Restoration',
    rating: 4.9,
    portfolio: ['Bag Restoration', 'Leather Coloring', 'Hardware Upgrade'],
    reviews: 63,
  },
  {
    id: 3,
    name: 'James Taylor',
    specialty: 'Upcycling & Fashion',
    rating: 4.7,
    portfolio: ['Streetwear', 'Vintage Redesign', 'Color Blocking'],
    reviews: 52,
  },
];

function AurumReDesign() {
  const [openCustomRequest, setOpenCustomRequest] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDesc, setRequestDesc] = useState('');
  const [requestBudget, setRequestBudget] = useState('');
  const [requests, setRequests] = useState(mockRequests);
  const [selectedTab, setSelectedTab] = useState('requests');

  const handlePostRequest = () => {
    if (requestTitle && requestDesc && requestBudget) {
      const newRequest = {
        id: requests.length + 1,
        title: requestTitle,
        customer: 'You',
        description: requestDesc,
        budget: requestBudget,
        status: 'Open',
        responses: 0,
      };
      setRequests([newRequest, ...requests]);
      setRequestTitle('');
      setRequestDesc('');
      setRequestBudget('');
      setOpenCustomRequest(false);
      alert('Request posted successfully!');
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        🎨 Aurum ReDesign - Customize Your Treasures
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Connect with talented designers to transform your items or request custom creations.
      </Typography>

      {/* Tab Navigation */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
        <Button
          variant={selectedTab === 'requests' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('requests')}
          sx={{ background: selectedTab === 'requests' ? '#6b5b95' : 'transparent', color: selectedTab === 'requests' ? '#fff' : '#6b5b95' }}
        >
          Design Requests
        </Button>
        <Button
          variant={selectedTab === 'designers' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('designers')}
          sx={{ background: selectedTab === 'designers' ? '#6b5b95' : 'transparent', color: selectedTab === 'designers' ? '#fff' : '#6b5b95' }}
        >
          Browse Designers
        </Button>
      </Box>

      {/* Design Requests Section */}
      {selectedTab === 'requests' && (
        <>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpenCustomRequest(true)}
            sx={{ mb: 4, background: '#6b5b95', '&:hover': { background: '#5a4a84' } }}
          >
            + Post a Design Request
          </Button>

          <Grid container spacing={3}>
            {requests.map((request) => (
              <Grid item xs={12} md={6} key={request.id}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 5 } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {request.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          by {request.customer}
                        </Typography>
                      </Box>
                      <Chip label={request.status} color={request.status === 'Open' ? 'success' : 'warning'} />
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                      {request.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6b5b95' }}>
                        Budget: {request.budget}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#999' }}>
                        {request.responses} designer responses
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ color: '#6b5b95', borderColor: '#6b5b95' }}
                    >
                      View Details & Bid
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Post Request Dialog */}
          <Dialog open={openCustomRequest} onClose={() => setOpenCustomRequest(false)} fullWidth maxWidth="sm">
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Post a Design Request
              </Typography>
              <TextField
                fullWidth
                label="Request Title"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Describe what you need..."
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Budget (e.g., $50-100)"
                value={requestBudget}
                onChange={(e) => setRequestBudget(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePostRequest}
                  sx={{ background: '#6b5b95' }}
                >
                  Post Request
                </Button>
                <Button variant="outlined" fullWidth onClick={() => setOpenCustomRequest(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Dialog>
        </>
      )}

      {/* Designers Section */}
      {selectedTab === 'designers' && (
        <Grid container spacing={3}>
          {mockDesigners.map((designer) => (
            <Grid item xs={12} md={4} key={designer.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 5 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {designer.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b5b95', fontWeight: 'bold' }}>
                        {designer.specialty}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                        {designer.rating}⭐
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#999' }}>
                        {designer.reviews} reviews
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Portfolio:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {designer.portfolio.map((item, idx) => (
                      <Chip key={idx} label={item} size="small" />
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ background: '#6b5b95', '&:hover': { background: '#5a4a84' } }}
                  >
                    View Profile & Hire
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default AurumReDesign;
