import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUser, logoutTheUser } from './reducers/userReducer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsersInfo } from './reducers/usersReducer'
import User from './components/User'
import { Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  //effect hook to handle initial loading of page
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsersInfo())
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutTheUser(null))
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
    } catch (error) {
      dispatch(setNotification(`Adding blog unsuccessful ${error.message}`, 5))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (!user) {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }

  const Home = () => {
    return (
      <div>
        <h2> blog app </h2>
        {blogForm()}
        <br></br>
        <BlogList/>
      </div>
    )
  }

  const padding = { padding: 5 }

  return (

    <div className='container'>
      <Notification/>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={{ padding, color: 'white' }} to='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={{ padding, color: 'white' }} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              { !user
                ? <Link style={{ padding, color: 'white' }} to='/login'>login</Link>
                : <em className="p-1 bd-highlight" style={{ padding, color: 'white' }}>
                  {user.username} logged in </em>
              }
            </Nav.Link>
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={!user ? <LoginForm/> : <Home/>} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>

  )
}

export default App