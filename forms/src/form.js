import React from "react";
class Form extends React.Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.refs.name.value);
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input type="text" ref="name" />
        <button type="submit">submit</button>
      </form>
    );
  }
}
export default Form;
