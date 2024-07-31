import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload)
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload.id)
    },
    commentBlog: (state, action) => {
      return [...state, action.payload]
    }
  }
})

export const { setBlogs,
  appendBlog,
  updateBlog,
  deleteBlog,
  commentBlog
} = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLike = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeABlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch(deleteBlog(blog))
  }
}

export const addComment = (blog, message) => {
  return async dispatch => {
    const newComment = await blogService.comment(blog, message)
    dispatch(commentBlog(newComment))
  }
}

export default blogSlice.reducer