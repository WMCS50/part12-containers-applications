import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs,
  updateLike,
  removeABlog,
  addComment
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

let updated

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if(!blog){
    return null
  }

  if (!updated) {
    dispatch(initializeBlogs())
    updated = true
  }

  const addLike = () => {
    dispatch(updateLike(blog))
    dispatch(setNotification(`One like added for "${blog.title}" !`, 5))
    updated = undefined
  }

  const removeBlog = async () => {
    console.log('blog to remove', blog.id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeABlog(blog))
        dispatch(setNotification(`${blog.title} by ${blog.author} removed`, 5))
      } catch (error) {
        dispatch(setNotification(`Not able to delete ${error.message}`, 5))
      }
    }
    updated = undefined
  }

  const showDeleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <Button id='remove' onClick={removeBlog}> {' '} remove{' '}
        </Button>
      )
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const message = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog, message))
    updated = undefined
  }

  return (
    <div>
      <h2>blog</h2>
      <h2>{blog.title} {blog.author}</h2>
      <p>
        {blog.url} <br></br>
        {blog.likes} {' '} likes
        <Button id='like' onClick={addLike}> {' '} like{' '}</Button> <br></br>
        {showDeleteButton()}
      </p>
      <p>added by {blog.user.username}</p>
      <div>
        <Form onSubmit={handleComment}>
          <Form.Control id='comment'/>
          <Button id='comment-button' type='submit'> comment </Button>
        </Form>
        <h5>comments</h5>
        {blog.comments.map(comment => (
          <li key={comment.id}>
            {comment.message}
          </li>
        ))
        }
      </div>
    </div>
  )
}

export default Blog

