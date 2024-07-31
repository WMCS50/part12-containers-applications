import { useDispatch }from 'react-redux'
import { loginAUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    event.target.username.value = ''
    event.target.password.value = ''

    dispatch(loginAUser(username, password))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
          />
          <br></br>
        </Form.Group>
        <Button id='login-button' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
