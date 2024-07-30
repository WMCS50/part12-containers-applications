/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from '../Todos/List'

describe('TodoList component', () => {
  it('renders the todo with Set as done button', () => {
    const todos = {
      text: 'This is the todo for testing',
      done: false
    }
  
    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();

    render(<TodoList todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    expect(screen.getByText('This is the todo for testing')).toBeInTheDocument();
    expect(screen.getByText('Set as done')).toBeInTheDocument();
    expect(screen.getByText('This todo is not done')).toBeInTheDocument();
  })

})
