import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log('Users', users)
  return (
    <div>
      <h2>users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><h5>users</h5></td>
            <td><h5>blogs created</h5></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr> )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users