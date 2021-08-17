class App extends React.Component {
  render() {
    return <TimersDashboard />
  }
}

class TimersDashboard extends React.Component {
  state = {
    timers: [],
  }
  componentDidMount() {
    const timers = [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        elapsed: 5456099,
        id: '0a4a79cb-b06d-4cb1-883d-549a1e3b66d7',
      },
      {
        title: 'Clear paper jam',
        project: 'Office Chores',
        elapsed: 1273998,
        id: 'a73c1d19-f32d-4aff-b470-cea4e792406a',
      },
      {
        title: 'Ponder origins of universe',
        project: 'Life Chores',
        id: '2c43306e-5b44-4ff8-8753-33c35adbd06f',
        elapsed: 11750,
      },
    ]

    this.setState({
      timers,
    })
  }
  handleFormSubmit = ({ id, title, project }) => {
    const nextTimers = this.state.timers.concat().push({
      id,
      title,
      project,
      elapsed: 0,
    })
    this.setState({
      timers: nextTimers,
    })
  }
  render() {
    return (
      <div className="dashboard">
        <h1 className="title">timer</h1>
        <div className="wrap">
          <EditableTimerList timers={this.state.timers} />
          <ToggleableTimerForm onFormSubmit={this.handleFormSubmit} />
        </div>
      </div>
    )
  }
}

class EditableTimerList extends React.Component {
  render() {
    const editableTimers = this.props.timers.map((timer) => {
      return (
        <EditableTimer
          key={timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
        />
      )
    })
    return <div>{editableTimers}</div>
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  openForm = () => {
    this.setState({
      editFormOpen: true,
    })
  }
  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }
  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          project={this.props.project}
          title={this.props.title}
          onFormClose={this.handleFormClose}
          onFormSubmit={() => {}}
        />
      )
    } else {
      return (
        <Timer
          id={this.props.id}
          project={this.props.project}
          title={this.props.title}
          elapsed={this.props.elapsed}
          onEditClick={this.handleEditClick}
        />
      )
    }
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    open: false,
  }
  handleToggleCreateForm = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  handleFormClose = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  render() {
    const { open } = this.state
    if (!open) {
      return (
        <div className="toggleCreateForm">
          <i className="bi-plus" onClick={this.handleToggleCreateForm}></i>
        </div>
      )
    } else {
      return (
        <div className="toggleCreateForm">
          <TimerForm
            onFormClose={this.handleFormClose}
            onFormSubmit={this.props.onFormSubmit}
          />
        </div>
      )
    }
  }
}

class Timer extends React.Component {
  render() {
    const { title, project, elapsed, onEditClick } = this.props
    const elapsedString = helpers.renderElapsedString(elapsed)
    return (
      <div className="timer">
        <div className="content">
          <div className="t-title">title: {title}</div>
          <div className="project">project: {project}</div>
          <div className="action">
            <i className="bi-pencil-square" onClick={onEditClick}></i>
            <i className="bi-trash"></i>
          </div>
          <div className="time">{elapsedString}</div>
        </div>
        <div className="control">
          <div className="btn">start</div>
        </div>
      </div>
    )
  }
}

class TimerForm extends React.Component {
  state = {
    title: this.props.title || '',
    project: this.props.project || '',
  }
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }
  handleProjectChange = (e) => {
    this.setState({
      project: e.target.value,
    })
  }
  render() {
    const submitText = this.props.id ? 'Edit' : 'Create'
    return (
      <>
        <div className="timer-form">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
          </div>
          <div className="field">
            <label>Project</label>
            <input
              type="text"
              onChange={this.handleProjectChange}
              value={this.state.project}
            />
          </div>
        </div>
        <div className="timer-form-action">
          <div className="submit" onClick={this.props.onFormSubmit}>
            {submitText}
          </div>
          <div className="cancel" onClick={this.props.onFormClose}>
            cancel
          </div>
        </div>
      </>
    )
  }
}

const element = document.getElementById('root')
ReactDOM.render(<App />, element)
