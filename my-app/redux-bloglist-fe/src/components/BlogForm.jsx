import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            name='Title'
            id='title-input'
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            name='Author'
            id='author-input'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            value={url}
            name='Url'
            id='url-input'
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button type='create' id='create-button'>
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm