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
            const boxMessage = document.getElementById('box-chat')
            let wrapItem = document.createElement('div')
            let item = document.createElement('span')
            let small = document.createElement('small')
            wrapItem.appendChild(item)
            wrapItem.appendChild(small)
            wrapItem.classList.add('left')
            item.classList.add("receive-message")
            item.textContent = data.message
            small.textContent = data.time
            boxMessage.appendChild(wrapItem)
        })
    }
    componentDidUpdate(prevProps, prevState) {
        // if (prevState.message !== this.state.message) {
        //     (document.querySelector('#box-chat')).appendChild(document.createElement('li').textContent(this.state.message))
        // }
    }
    handleSendMessage = async () => {
        let payload = {
            name: this.props.name,
            room: this.props.room,
            message: this.state.message,
            time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
        }
        await this.props.socket.emit('send-message', payload)
        const boxMessage = document.getElementById('box-chat')
        let wrapItem = document.createElement('div')
        let item = document.createElement('span')
        let small = document.createElement('small')
        wrapItem.appendChild(small)
        wrapItem.appendChild(item)
        wrapItem.classList.add('right')
        item.classList.add('send-message', "right")
        item.textContent = this.state.message
        small.textContent = payload.time
        boxMessage.appendChild(wrapItem)

        this.setState({
            message: ''
        })
    }
    render() {
        return (
            <div className="Chat">
                <h1>Chat room</h1>
                <input type="text" value={this.state.message} onChange={(event) => this.setState({ message: event.target.value })} />
                <button onClick={() => this.handleSendMessage()}>send</button>
                <div id='box-chat'>

                </div>
            </div>
        );
    }
}

export default Chat;
