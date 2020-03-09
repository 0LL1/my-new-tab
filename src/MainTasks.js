import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MdDone } from 'react-icons/md'
import { StyledMainTasks, Title, TaskInput, TaskList, Task } from './styles'

const MainTasks = () => {
  const initialTasks = JSON.parse(localStorage.getItem('tasks'))
  const [tasks, setTasks] = useState(initialTasks)
  const [input, setInput] = useState('')

  window.addEventListener('storage', () => {
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const setTask = event => {
    setInput(event.target.value)
  }

  const addTask = () => {
    if (tasks.length < 3) {
      const newTasks = [...tasks, { task: input, id: uuidv4() }]
      setTasks(newTasks)
      setInput('')
    } else return
  }

  const deleteTask = id => {
    setTasks(prevState => prevState.filter(task => task.id !== id))
  }

  const taskList = tasks.map(task => {
    return (
      <Task key={task.id}>
        <MdDone className="icon" onClick={() => deleteTask(task.id)} />
        {task.task}
      </Task>
    )
  })

  return (
    <StyledMainTasks>
      <Title>main tasks of today</Title>
      <label>
        {tasks.length >= 3 ? 'no more tasks!' : 'new task'}
        <TaskInput
          onChange={setTask}
          onKeyDown={e => e.key === 'Enter' && input && addTask()}
          value={input}
          hidden={tasks.length >= 3}
          maxLength="50"
        />
      </label>
      <TaskList>{taskList}</TaskList>
    </StyledMainTasks>
  )
}

export default MainTasks
