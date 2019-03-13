import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import { MdDone } from 'react-icons/md'
import { StyledMainTasks, Title, TaskInput, TaskList, Task } from './styles'

class MainTasks extends Component {
  state = {
    tasks: [],
    input: ''
  }

  componentDidMount() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'))
    savedTasks && this.setState({ tasks: savedTasks })
  }

  setTask = event => {
    this.setState({ input: event.target.value })
  }

  addTask = () => {
    if (this.state.tasks.length < 3) {
      this.setState(
        prevState => {
          return {
            tasks: [
              ...prevState.tasks,
              { task: this.state.input, id: uuidv4() }
            ],
            input: ''
          }
        },
        () => {
          localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
        }
      )
    } else return
  }

  deleteTask = id => {
    this.setState(
      prevState => {
        return { tasks: prevState.tasks.filter(task => task.id !== id) }
      },
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
      }
    )
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
        <label>
          {this.state.tasks.length >= 3 ? 'no more tasks!' : 'new task'}
          <TaskInput
            onChange={this.setTask}
            onKeyDown={e => e.key === 'Enter' && this.addTask()}
            value={this.state.input}
            hidden={this.state.tasks.length >= 3}
          />
        </label>
        <TaskList>{taskList}</TaskList>
      </StyledMainTasks>
    )
  }
}

export default MainTasks
