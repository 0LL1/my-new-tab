import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import { MdDone } from 'react-icons/md'
import { StyledMainTasks, Title, TaskInput, TaskList, Task } from './styles'

class MainTasks extends Component {
  state = {
    tasks: [],
    input: ''
  }

  setTask = event => {
    this.setState({ input: event.target.value })
  }

  addTask = () => {
    this.setState(prevState => {
      return {
        tasks: [...prevState.tasks, { task: this.state.input, id: uuidv4() }],
        input: ''
      }
    })
  }

  deleteTask = id => {
    this.setState(prevState => {
      return { tasks: prevState.tasks.filter(task => task.id !== id) }
    })
  }

  render() {
    const taskList = this.state.tasks.map(task => {
      return (
        <Task key={task.id}>
          <MdDone className="icon" onClick={() => this.deleteTask(task.id)} />
          {task.task}
        </Task>
      )
    })

    return (
      <StyledMainTasks>
        <Title>main tasks of today</Title>
        <TaskInput
          onChange={this.setTask}
          onKeyDown={e => e.key === 'Enter' && this.addTask()}
          value={this.state.input}
        />
        <TaskList>{taskList}</TaskList>
      </StyledMainTasks>
    )
  }
}

export default MainTasks
