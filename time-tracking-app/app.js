class App extends React.Component {
  render() {
    return (
      <TimerDashboard />
    )
  }
}

class Timer extends React.Component {
  render() {
    const {title, project, elapsed} = this.props
    return (
      <div className="timer">
        <div>{this.props}</div>
      </div>
    )
  }
}

class TimerList extends React.Component {

  render() {
    const timerComponents = this.props.timers.map(timer => {
      return (
        <Timer 
          key={timer.id}
          project={timer.project}
          title={timer.title}
          elapsed={timer.elapsed}
        />
      )
    })
    return (
      <div className="timer-list">
        {this.timerComponents}
      </div>
    )
  }
}

class ToggleableTimeForm extends React.Component {
  render() {
    return (

    )
  }
}

class TimerForm extends React.Component {
  render(){
    return (

    )
  }
}

class TimerDashboard extends React.Component {
  state = {
    timer: [
      {
        "title": "Mow the lawn",
        "project": "House Chores",
        "elapsed": 5456099,
        "id": "0a4a79cb-b06d-4cb1-883d-549a1e3b66d7"
      },
      {
        "title": "Clear paper jam",
        "project": "Office Chores",
        "elapsed": 1273998,
        "id": "a73c1d19-f32d-4aff-b470-cea4e792406a"
      },
      {
        "title": "Ponder origins of universe",
        "project": "Life Chores",
        "id": "2c43306e-5b44-4ff8-8753-33c35adbd06f",
        "elapsed": 11750,
        "runningSince": 1456225941911
      }
    ]    
  }
  render() {
    return (
      <div className="dashboard">
        <TimerList timers={this.state.timers}/>
        <ToggleableTimeForm />
      </div>
    )
  }
}

