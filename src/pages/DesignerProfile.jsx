import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Avatar, Tab, Tabs, Dialog, TextField, Rating, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const mockDesigners = {
  'designer-1': {
    id: 'designer-1',
    name: 'Lisa Wong',
    avatar: 'LW',
    specialty: 'Leather Restoration & Customization',
    bio: 'Expert in vintage leather goods restoration with 15 years of experience. Specializing in luxury brand repairs and customization.',
    isVerified: true,
    joinDate: 'Mar 2023',
    rating: 4.9,
    reviews: 67,
    projectsCompleted: 156,
    followers: 1240,
    responseTime: '1 hour',
    coverImage: 'linear-gradient(135deg, #6b5b95 0%, #9d84b7 100%)',
    portfolio: [
      {
        id: 1,
        title: 'Luxury Leather Bag Restoration',
        before: 'before.jpg',
        after: 'after.jpg',
        description: 'Restored vintage Louis Vuitton bag - color restoration, hardware upgrade.',
        likes: 87,
        views: 342,
      },
      {
        id: 2,
        title: 'Custom Leather Jacket Embroidery',
        before: 'before2.jpg',
        after: 'after2.jpg',
        description: 'Added custom embroidery design to vintage leather jacket.',
        likes: 124,
        views: 521,
      },
      {
        id: 3,
        title: 'Leather Color Restoration',
        before: 'before3.jpg',
        after: 'after3.jpg',
        description: 'Restored faded leather handbag to original vibrant color.',
        likes: 156,
        views: 743,
      },
    ],
    hourlyRate: '$50-100',
    testimonials: [
      { author: 'Emma D.', rating: 5, text: 'Exceptional work! My vintage bag looks brand new. Highly skilled and professional.' },
      { author: 'James K.', rating: 5, text: 'Lisa is talented and reliable. Great communication throughout the project.' },
    ],
  },
};

function DesignerProfile() {
  const { designerId } = useParams();
  const designer = mockDesigners[designerId] || mockDesigners['designer-1'];
  const [tabValue, setTabValue] = useState(0);
  const [openRequest, setOpenRequest] = useState(false);
  const [requestData, setRequestData] = useState({ title: '', description: '', budget: '', deadline: '' });

  const handleSubmitRequest = () => {
    if (requestData.title && requestData.description && requestData.budget) {
      alert('Customization request sent to ' + designer.name + '!');
      setRequestData({ title: '', description: '', budget: '', deadline: '' });
      setOpenRequest(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Cover Section */}
      <Box sx={{ background: designer.coverImage, height: 220, borderRadius: 2, mb: 3 }} />

      {/* Profile Header */}
      <Card sx={{ mx: 'auto', mt: -10, mb: 4, maxWidth: '900px', position: 'relative', zIndex: 10 }}>
        <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Avatar sx={{ width: 140, height: 140, background: '#6b5b95', fontSize: 48, fontWeight: 'bold' }}>
            {designer.avatar}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {designer.name}
              </Typography>
              {designer.isVerified && (
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified Designer"
                  sx={{ background: '#4CAF50', color: '#fff', fontWeight: 'bold' }}
                />
              )}
            </Box>

            <Typography variant="h6" sx={{ color: '#6b5b95', fontWeight: 'bold', mb: 1 }}>
              {designer.specialty}
            </Typography>

            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              {designer.bio}
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6b5b95' }}>
                    {designer.rating}
                  </Typography>
                </Box>
                <Typography variant="caption">({designer.reviews} reviews)</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6b5b95' }}>
                  {designer.projectsCompleted}
                </Typography>
                <Typography variant="caption">Projects Completed</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6b5b95' }}>
                  {designer.followers}
                </Typography>
                <Typography variant="caption">Followers</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6b5b95' }}>
                  {designer.responseTime}
                </Typography>
                <Typography variant="caption">Response Time</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => setOpenRequest(true)}
                sx={{ background: '#6b5b95', '&:hover': { background: '#5a4a84' } }}
              >
                Request Customization
              </Button>
              <Button variant="outlined" sx={{ color: '#6b5b95', borderColor: '#6b5b95' }}>
                Follow Designer
              </Button>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6b5b95', mb: 1 }}>
              {designer.hourlyRate}
            </Typography>
            <Typography variant="caption">Estimated Cost</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`Portfolio (${designer.portfolio.length})`} />
          <Tab label="Testimonials" />
          <Tab label="About" />
        </Tabs>
      </Box>

      {/* Portfolio Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {designer.portfolio.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <Box
                  sx={{
                    height: 250,
                    background: 'linear-gradient(135deg, #e8d5c4 0%, #d4b5a0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Typography sx={{ color: '#999' }}>Before/After Gallery</Typography>
                  <Chip
                    label="Before & After"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#6b5b95',
                      color: '#fff',
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6b5b95', fontWeight: 'bold' }}>
                      ❤️ {project.likes}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b5b95', fontWeight: 'bold' }}>
                      👁️ {project.views}
                    </Typography>
                  </Box>
                  <Button variant="contained" fullWidth sx={{ background: '#6b5b95', '&:hover': { background: '#5a4a84' } }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Testimonials Tab */}
      {tabValue === 1 && (
        <Grid container spacing={2}>
          {designer.testimonials.map((testimonial, idx) => (
            <Grid item xs={12} key={idx}>
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar sx={{ background: '#6b5b95' }}>
                    {testimonial.author.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {testimonial.author}
                    </Typography>
                    <Rating value={testimonial.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* About Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  📋 About {designer.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                  {designer.bio}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Specialties:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="Leather Restoration" />
                  <Chip label="Color Restoration" />
                  <Chip label="Hardware Upgrade" />
                  <Chip label="Custom Designs" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  💼 Work Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
                      Response Time
                    </Typography>
                    <Typography variant="body2">{designer.responseTime}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
                      Estimated Rate
                    </Typography>
                    <Typography variant="body2">{designer.hourlyRate} per project</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
                      Member Since
                    </Typography>
                    <Typography variant="body2">{designer.joinDate}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Request Dialog */}
      <Dialog open={openRequest} onClose={() => setOpenRequest(false)} fullWidth maxWidth="sm">
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Request Customization from {designer.name}
          </Typography>
          <TextField
            fullWidth
            label="Project Title"
            value={requestData.title}
            onChange={(e) => setRequestData({ ...requestData, title: e.target.value })}
            sx={{ mb: 2 }}
            placeholder="e.g., Restore my leather jacket"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Describe your project in detail"
            value={requestData.description}
            onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Budget (e.g., $50-100)"
            value={requestData.budget}
            onChange={(e) => setRequestData({ ...requestData, budget: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Desired Deadline"
            type="date"
            value={requestData.deadline}
            onChange={(e) => setRequestData({ ...requestData, deadline: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmitRequest}
              sx={{ background: '#6b5b95', '&:hover': { background: '#5a4a84' } }}
            >
              Send Request
            </Button>
            <Button variant="outlined" fullWidth onClick={() => setOpenRequest(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default DesignerProfile;
