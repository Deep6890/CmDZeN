const Blog = require('./../models/Blogs');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('userId', 'name avatar');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('userId', 'name avatar');
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new blog
exports.createBlog = async (req, res) => {
  try {
    const { userId, title, content, image, tags } = req.body;
    const blog = new Blog({ userId, title, content, image, tags });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update blog (only owner)
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.userId.toString() !== req.body.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.tags = tags || blog.tags;
    blog.updatedAt = Date.now();

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete blog (only owner)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.userId.toString() !== req.body.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    await blog.remove();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
