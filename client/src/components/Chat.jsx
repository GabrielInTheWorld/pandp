import React, {Component} from 'react'

import {FormGroup, ListGroup, FormControl, ControlLabel, Button, ListGroupItem} from 'react-bootstrap'

import '../style/Chat.css'
// import {FieldGroup} from "../Components"

var socket
var counter = 0

export default class Chat extends Component{

    state = {
        receiver: "",
        username: "",
        message: []
    }

    // constructor(){
    //     super()
    // }

    componentDidMount(){
        socket = this.props.socket
        this.handleReceiveMessage()
        // this.setState({receiver: this.props.receiver})
        // console.log("socket in Chat: ", this.state)
    }

    componentWillReceiveProps(nextProps){
        // socket = nextProps.socket
        this.setState({receiver: nextProps.receiver, username: nextProps.username})
        // console.log("nextProps in Chat: ", nextProps, this.state)
    }

    handleReceiveMessage = () => {
        socket.on("message", (data) => {
            console.log("received data: ", data)
            if(this.state.username === data.user)
                this.onReceiveMessage(data)
        })
    }

    onReceiveMessage = (data) => {
        // if(!this.state.listMembers.includes(data.emitter)){
        //     let members = this.state.listMembers
        //     members.push(data.emitter)
        //     this.setState({listMembers: members})
        // }
        console.log("receiveMessage: ", data)
        let elem = (
            <ListGroupItem key={"message_" + counter++} className="receivedMessage">{data.message}</ListGroupItem>
        )
        let messageList = this.state.message
        messageList.push(elem)
        this.setState({message: messageList})
    }

    sendMessage = () => {
        let data = {
            user: this.state.receiver,
            message: document.getElementById("chatMessageInput").value,
            emitter: this.state.username
        }
        console.log("message data: ", data)

        let elem = (
            <ListGroupItem key={"message_" + counter++} className="sentMessage">{data.message}</ListGroupItem>
        )
        let messageList = this.state.message
        messageList.push(elem)
        this.setState({message: messageList})

        socket.emit("message", data)
        document.getElementById("chatMessageInput").value = ""
    }

    render(){
        return(
            <div>
                <div id="chatComponent">
                    <div id="messageBlock">
                        <ListGroup>{this.state.message}</ListGroup>
                    </div>
                    <div id="chatInput">
                        <FormGroup
                            controlId="chatMessageInput"
                            onFocus={() => {
                                // console.log("onFocus textarea")
                                document.getElementById("chatComponent").setAttribute("active", "true")
                            }}
                            onBlur={() => {
                                document.getElementById("chatComponent").setAttribute("active", "false")
                            }}
                        >
                            <ControlLabel>Message</ControlLabel>
                            <FormControl ref="messageInput" componentClass="textarea" placeholder="Type your Message in here..." rows="10" />
                        </FormGroup>

                        <Button id="chatSendButton" type="submit" onClick={() => this.sendMessage()}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}