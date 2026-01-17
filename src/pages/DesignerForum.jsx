import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Grid, Tabs, Tab, Avatar, Chip, Dialog } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const mockForumPosts = [
  {
    id: 1,
    title: 'Custom Embroidered Jacket - Portfolio Showcase',
    author: 'Alex Martinez',
    avatar: 'AM',
    category: 'Portfolio',
    content: 'Just completed this amazing custom embroidered jacket for a client. Adding vintage patches with modern style.',
    images: ['design1.jpg'],
    likes: 34,
    comments: 8,
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Request: Restore Vintage Louis Vuitton Bag',
    author: 'Sarah Wilson',
    avatar: 'SW',
    category: 'Request',
    content: 'I have a vintage LV bag that needs restoration. Looking for expert help with color restoration and hardware upgrade.',
    likes: 12,
    comments: 5,
    rating: 0,
  },
  {
    id: 3,
    title: 'Upcycled Streetwear Collection - New Work!',
    author: 'James Taylor',
    avatar: 'JT',
    category: 'Portfolio',
    content: 'Excited to share my new upcycled streetwear collection! Transformed old band tees into modern crop tops and oversized fits.',
    images: ['streetwear.jpg'],
    likes: 58,
    comments: 15,
    rating: 4.9,
  },
];

const mockDesignerProfiles = [
  {
    id: 1,
    name: 'Lisa Wong',
    specialty: 'Leather Restoration & Customization',
    rating: 4.9,
    reviews: 67,
    bio: 'Expert in vintage leather goods restoration with 15 years of experience.',
    completed: 156,
  },
  {
    id: 2,
    name: 'Marco Rossi',
    specialty: 'Tailoring & Alterations',
    rating: 4.7,
    reviews: 43,
    bio: 'Professional tailor specializing in high-end alterations and custom fitting.',
    completed: 98,
  },
  {
    id: 3,
    name: 'Priya Kapoor',
    specialty: 'Dyeing & Color Restoration',
    rating: 4.8,
    reviews: 54,
    bio: 'Specialist in natural dyes and sustainable color restoration techniques.',
    completed: 112,
  },
];

function DesignerForum({ user }) {
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState(mockForumPosts);
  const [newPost, setNewPost] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Portfolio');
  const [openNewPost, setOpenNewPost] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLikePost = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (likedPosts[postId] ? -1 : 1) }
          : post
      )
    );
  };

  const handleAddPost = () => {
    if (newPostTitle && newPost) {
      const post = {
        id: posts.length + 1,
        title: newPostTitle,
        author: user?.name || 'Anonymous Designer',
        avatar: 'AD',
        category: postCategory,
        content: newPost,
        likes: 0,
        comments: 0,
        rating: 0,
      };
      setPosts([post, ...posts]);
      setNewPostTitle('');
      setNewPost('');
      setOpenNewPost(false);
      alert('Post published successfully!');
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        💬 Designer Forum
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Connect, share your work, request collaborations, and build your reputation in the design community.
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Forum Posts" />
          <Tab label="Designer Profiles" />
          <Tab label="Collaboration Requests" />
        </Tabs>
      </Box>

      {/* Tab 1: Forum Posts */}
      {tabValue === 0 && (
        <>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpenNewPost(true)}
            sx={{ mb: 4, background: '#ff6b9d', '&:hover': { background: '#e55a8e' } }}
          >
            + Post Your Work / Request
          </Button>

          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card sx={{ '&:hover': { boxShadow: 5 } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Avatar sx={{ background: '#ff6b9d', width: 48, height: 48 }}>
                        {post.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {post.title}
                          </Typography>
                          <Chip label={post.category} size="small" color={post.category === 'Portfolio' ? 'success' : 'warning'} />
                        </Box>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          {post.author} {post.rating > 0 && `• ⭐ ${post.rating}`}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
                      {post.content}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        startIcon={<ThumbUpIcon />}
                        onClick={() => handleLikePost(post.id)}
                        sx={{
                          color: likedPosts[post.id] ? '#ff6b9d' : '#999',
                        }}
                      >
                        {post.likes}
                      </Button>
                      <Button startIcon={<ChatBubbleIcon />} sx={{ color: '#999' }}>
                        {post.comments}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* New Post Dialog */}
          <Dialog open={openNewPost} onClose={() => setOpenNewPost(false)} fullWidth maxWidth="sm">
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Share Your Work or Request
              </Typography>
              <TextField
                fullWidth
                select
                label="Post Type"
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value)}
                sx={{ mb: 2 }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Portfolio">Portfolio - Share Your Work</option>
                <option value="Request">Request - Ask for Help</option>
                <option value="Update">Update - Progress/Finished Projects</option>
              </TextField>
              <TextField
                fullWidth
                label="Post Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Tell your story..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddPost}
                  sx={{ background: '#ff6b9d', '&:hover': { background: '#e55a8e' } }}
                >
                  Publish Post
                </Button>
                <Button variant="outlined" fullWidth onClick={() => setOpenNewPost(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Dialog>
        </>
      )}

      {/* Tab 2: Designer Profiles */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          {mockDesignerProfiles.map((designer) => (
            <Grid item xs={12} md={4} key={designer.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 5 } }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar sx={{ background: '#ff6b9d', width: 80, height: 80, mx: 'auto', mb: 1 }}>
                      {designer.name.split(' ')[0][0]}{designer.name.split(' ')[1][0]}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {designer.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#ff6b9d', fontWeight: 'bold' }}>
                      {designer.specialty}
                    </Typography>
                  </Box>

                  <Box sx={{ background: '#f9f9f9', p: 1.5, borderRadius: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#ff6b9d', fontWeight: 'bold' }}>
                          {designer.rating}⭐
                        </Typography>
                        <Typography variant="caption">Rating</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#ff6b9d', fontWeight: 'bold' }}>
                          {designer.reviews}
                        </Typography>
                        <Typography variant="caption">Reviews</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#ff6b9d', fontWeight: 'bold' }}>
                          {designer.completed}
                        </Typography>
                        <Typography variant="caption">Projects</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    {designer.bio}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ background: '#ff6b9d', '&:hover': { background: '#e55a8e' } }}
                  >
                    View Profile & Hire
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Tab 3: Collaboration Requests */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
            Looking to collaborate? Post your project here and let talented designers bid on your work.
          </Typography>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Active Collaboration Requests
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Check out the Aurum ReDesign section for active collaboration opportunities and customer requests!
            </Typography>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default DesignerForum;
