const router = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
  response.json(blogs)
})

//get single
router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})


router.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title, author, url, 
    likes: likes ? likes : 0
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id
  //added to show user info upon creation of new blog at first render
  await blog.populate('user', {username: 1, name: 1, id: 1})  

  const createdBlog = await blog.save()

  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()

  response.status(201).json(createdBlog)
})

//ability to add comments
router.post('/:id/comments', async (request, response) => {
  const updatedBlog = await Blog.findById(request.params.id)
  
  const { message } = request.body

  const comment = new Comment({
    message,
    blog: updatedBlog.id
  })

  const savedComment = await comment.save()

  updatedBlog.comments = updatedBlog.comments.concat(savedComment._id)
  await updatedBlog.save()

  if (!updatedBlog) {
    response.status(401).json({error: 'unable to post comment' })
  }

  response.status(201).json(savedComment)

})

router.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    user: body.user.id,
    likes: body.likes
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
 
  response.json(updatedBlog)

})

router.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.remove()
  
  response.status(204).end()
})

module.exports = router