class App extends React.Component {
  render() {
    return <TimersDashboard />;
  }
}

class TimersDashboard extends React.Component {
  state = {
    timers: [],
  };
  componentDidMount() {
    console.log(this);
    this.loadTimersFromServer();
  }
  loadTimersFromServer() {
    client.getTimers().then((timers) => {
      this.setState({
        timers,
      });
    });
  }
  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };
  createTimer = (timer) => {
    client.createTimer(timer).then(() => {
      this.loadTimersFromServer();
    });
  };
  handleTrashClick = (id) => {
    client.deleteTimer({ id }).then(() => {
      this.loadTimersFromServer();
    });
  };
  handleEditFormSubmit = (newTimer) => {
    client.updateTimer(newTimer).then(() => {
      this.loadTimersFromServer();
    });
  };
  handleStartClick = (id) => {
    client
      .startTimer({
        start: Date.now(),
        id,
      })
      .then(() => {
        this.loadTimersFromServer();
      });
  };
  render() {
    return (
      <div className="dashboard">
        <h1 className="title">timer</h1>
        <div className="wrap">
          <EditableTimerList
            timers={this.state.timers}
            onTrashClick={this.handleTrashClick}
            onEditFormSubmit={this.handleEditFormSubmit}
            onStartClick={this.handleStartClick}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
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
          onTrashClick={this.props.onTrashClick}
          onEditFormSubmit={this.props.onEditFormSubmit}
          onStartClick={this.props.onStartClick}
        />
      );
    });
    return <div>{editableTimers}</div>;
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  };
  handleEditClick = () => {
    this.openForm();
  };
  handleFormClose = () => {
    this.closeForm();
  };
  openForm = () => {
    this.setState({
      editFormOpen: true,
    });
  };
  closeForm = () => {
    this.setState({
      editFormOpen: false,
    });
  };
  handleEditFormSubmit = (newTimer) => {
    this.props.onEditFormSubmit(newTimer);
    this.setState({
      editFormOpen: false,
    });
  };
  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          project={this.props.project}
          title={this.props.title}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleEditFormSubmit}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          project={this.props.project}
          title={this.props.title}
          elapsed={this.props.elapsed}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
        />
      );
    }
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    open: false,
  };
  handleToggleCreateForm = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleFormClose = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    if (!open) {
      return (
        <div className="toggleCreateForm">
          <i className="bi-plus" onClick={this.handleToggleCreateForm}></i>
        </div>
      );
    } else {
      return (
        <div className="toggleCreateForm">
          <TimerForm
            onFormClose={this.handleFormClose}
            onFormSubmit={this.handleFormSubmit}
          />
        </div>
      );
    }
  }
}

class Timer extends React.Component {
  render() {
    const { title, project, elapsed, id, onEditClick } = this.props;
    const elapsedString = helpers.renderElapsedString(elapsed);
    return (
      <div className="timer">
        <div className="content">
          <div className="t-title">title: {title}</div>
          <div className="project">project: {project}</div>
          <div className="action">
            <i className="bi-pencil-square" onClick={onEditClick}></i>
            <i
              className="bi-trash"
              onClick={() => this.props.onTrashClick(id)}
            ></i>
          </div>
          <div className="time">{elapsedString}</div>
        </div>
        <div className="control">
          <div
            className="btn"
            onClick={() => {
              this.props.onStartClick(this.props.id);
            }}
          >
            start
          </div>
        </div>
      </div>
    );
  }
}

class TimerForm extends React.Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || "",
  };
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  handleProjectChange = (e) => {
    this.setState({
      project: e.target.value,
    });
  };
  handleFormSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project,
    });
  };
  render() {
    const submitText = this.props.id ? "Edit" : "Create";
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
          <div className="submit" onClick={this.handleFormSubmit}>
            {submitText}
          </div>
          <div className="cancel" onClick={this.props.onFormClose}>
            cancel
          </div>
        </div>
      </>
    );
  }
}

const element = document.getElementById("root");
ReactDOM.render(<App />, element);
