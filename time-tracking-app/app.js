class App extends React.Component {
  render() {
    return <TimerDashboard />
  }
}

class TimerDashboard extends React.Component {
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
  handleFormSubmit = () => {
    console.log('formSubmit')
  }
  render() {
    return (
      <div className="dashboard">
        <h1 className="title">timer</h1>
        <div className="wrap">
          <TimerList timers={this.state.timers} />
          <ToggleableTimeForm onFormSubmit={this.handleFormSubmit} />
        </div>
      </div>
    )
  }
}

class TimerList extends React.Component {
  render() {
    const timerComponents = this.props.timers.map((timer) => {
      return (
        <Timer
          key={timer.id}
          project={timer.project}
          title={timer.title}
          elapsed={timer.elapsed}
        />
      )
    })
    return <div className="timer-list">{timerComponents}</div>
  }
}

class Timer extends React.Component {
  render() {
    const { title, project, elapsed } = this.props
    const elapsedString = helpers.renderElapsedString(elapsed)
    return (
      <div className="timer">
        <div className="content">
          <div className="t-title">title: {title}</div>
          <div className="project">project: {project}</div>
          <div className="action">
            <i className="bi-pencil-square"></i>
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

class ToggleableTimeForm extends React.Component {
  state = {
    open: true,
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

class TimerForm extends React.Component {
  render() {
    return (
      <>
        <div className="timer-form">
          <div className="field">
            <label>Title</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Project</label>
            <input type="text" />
          </div>
        </div>
        <div className="timer-form-action">
          <div className="submit" onClick={this.props.onFormSubmit}>
            submit
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
