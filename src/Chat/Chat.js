import React from 'react';
import './Chat.scss';


class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messageReceive: ''
        }
    }
    componentDidMount() {
        this.props.socket.off('receive-message').on('receive-message', (data) => {
            this.createMessageUI("receive-message", 'left', data.message, data.time)
        })
    }
    handleSendMessage = async () => {
        let payload = {
            name: this.props.name,
            room: this.props.room,
            message: this.state.message,
            time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
        }
        await this.props.socket.emit('send-message', payload)
        this.createMessageUI('send-message', "right", this.state.message, payload.time, true)
        this.setState({
            message: ''
        })
    }
    createMessageUI = (cssbox, position, message, time, isSend) => {
        const boxMessage = document.getElementById('box-chat')
        let wrapItem = document.createElement('div')
        let item = document.createElement('span')
        let small = document.createElement('small')
        if (isSend) {
            wrapItem.appendChild(small)
            wrapItem.appendChild(item)
        } else {
            wrapItem.appendChild(item)
            wrapItem.appendChild(small)
        }
        wrapItem.classList.add(position)
        item.classList.add(cssbox, position)
        item.textContent = message
        small.textContent = time
        boxMessage.appendChild(wrapItem)
    }
    handleSend = (event) => {
        if (event.code === 'Enter') {
            this.handleSendMessage()
        }
    }
    render() {
        return (
            <div className="Chat">
                <h1>Chat room</h1>
                <div id='box-chat'></div>
                <div className="input-message">
                    <input className='text' type="text" value={this.state.message} onChange={(event) => this.setState({ message: event.target.value })}
                        onKeyUp={(event) => this.handleSend(event)} />
                    <button className='btn' onClick={() => this.handleSendMessage()}>send</button>
                </div>

            </div>
        );
    }
}

export default Chat;
