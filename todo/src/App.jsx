import { useState } from 'react'
import Todo from './components/todo.jsx'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Todo/>
    </>
  )
}

export default App
