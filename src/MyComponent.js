import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  handleReset = () => {
    this.setState({ count: 0 });
  };

  componentDidMount() {
    // This method is called immediately after the component is mounted
    console.log('Component did mount');
    // Simulate fetching data from an API or other side-effects
    this.setState({ count: 10 });
  }

  componentDidUpdate(prevProps, prevState) {
    // This method is called immediately after updating occurs
    if (prevState.count !== this.state.count) {
      console.log('Component did update');
    }
  }

  componentWillUnmount() {
    // This method is called immediately before the component is unmounted and destroyed
    console.log('Component will unmount');
    this.setState({ count: 200 });
  }

  render() {
    return (
      <div>
        <h1>Counter: {this.state.count}</h1>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}


export default MyComponent