const express = require('express');
const router = express.Router();
const blogController = require('./../controllers/blogController');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get single blog
router.get('/:id', blogController.getBlogById);

// Create new blog (JWT required)
router.post('/', blogController.createBlog);

// Update blog
router.put('/:id', blogController.updateBlog);

// Delete blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
