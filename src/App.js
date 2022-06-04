import React from 'react';
import './App.css';

import Chat from './Chat/Chat';




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      room: ''
    }
    this.prevRoom = null
  }
  handleJoinRoom = () => {
    this.props.socket.emit('join-room', { prev: this.prevRoom, room: this.state.room })
    this.prevRoom = this.state.room
  }
  handleChangeRoom = (event) => {
    this.setState({
      room: event.target.value,
    })
  }
  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder='name...' />
        <input type="text" value={this.state.room} onChange={(event) => this.handleChangeRoom(event)} placeholder='number room chat ...' />
        <button onClick={() => this.handleJoinRoom()}>connect</button>
        <Chat socket={this.props.socket} room={this.state.room} name={this.state.name} />
      </div>
    );
  }
}

export default App;
