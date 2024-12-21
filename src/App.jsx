import React, { useState } from 'react'
    import { useTransition, animated } from 'react-spring'

    function App() {
      const [todos, setTodos] = useState([])
      const [inputValue, setInputValue] = useState('')

      const addTodo = () => {
        if (inputValue.trim()) {
          setTodos([...todos, inputValue.trim()])
          setInputValue('')
        }
      }

      const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index))
      }

      const transitions = useTransition(todos, {
        keys: (item, index) => index,
        from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
      })

      return (
        <div className="todo-container">
          <h1>Todo List</h1>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo"
          />
          <ul>
            {transitions((props, item, index) => (
              <animated.li style={props}>
                {item}
                <button onClick={() => removeTodo(index)}>Remove</button>
              </animated.li>
            ))}
          </ul>
        </div>
      )
    }

    export default App
