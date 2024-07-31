import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default User