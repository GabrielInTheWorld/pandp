import React, {Component} from 'react'
import {connect} from 'react-redux'

import {FormGroup, ListGroup, FormControl, ControlLabel, Button, ListGroupItem} from 'react-bootstrap'

import '../style/Chat.css'
// import {FieldGroup} from "../Components"

var socket
var counter = 0

class Chat extends Component{

    state = {
        receiver: "",
        username: "",
        message: [],
        role: "",
        // master: ""
    }

    constructor(props){
        super(props)
        console.log("constructor in Chat: ", this.props)
        // this.setState({receiver: this.props.receiver, username: this.props.username, role: this.props.role})
    }

    componentDidMount(){
        socket = this.props.socket
        // this.setState({receiver: this.props.receiver})
        console.log("socket in Chat: ", this.state, this.props)
        this.setState({receiver: this.props.receiver, username: this.props.username, role: this.props.role})
        this.handleReceiveMessage()
    }

    // componentWillReceiveProps(nextProps){
    //     // socket = nextProps.socket
    //     this.setState({receiver: nextProps.receiver, username: nextProps.username, role: nextProps.role})
    //     console.log("nextProps in Chat: ", nextProps, this.state)
    // }

    handleReceiveMessage = () => {
        socket.on("message", (data) => {
            console.log("received data: ", this.state, data)
            if(this.state.username === data.user || this.props.username === data.user)
                this.onReceiveMessage(data)
        })

        // socket.on("masterIsChosen", (user) => {
        //     this.setState({master: user})
        // })

        socket.on("rollDice", (data) => {
            console.log("rollDice: ", data)
            if(this.state.role === "Meister" && this.state.username !== data.emitter){
                this.onReceiveMessage(data)
            }else if(this.state.username === data.emitter){
                this.onRollDiceMessage(data.message)
            }
        })
    }

    onReceiveMessage = (data) => {
        // if(!this.state.listMembers.includes(data.emitter)){
        //     let members = this.state.listMembers
        //     members.push(data.emitter)
        //     this.setState({listMembers: members})
        // }
        console.log("receivedMessage: ", data)
        let elem = (
            <ListGroupItem key={"message_" + counter++} className="receivedMessage">{data.message}</ListGroupItem>
        )
        let messageList = this.state.message
        messageList.push(elem)
        this.setState({message: messageList})
    }

    sendMessage = () => {
        console.log("chatMessageInput: ", document.getElementById("chatMessageInput"))
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

    onRollDiceMessage = (message) => {
        let elem = (
            <ListGroupItem key={"message_" + counter++} className="sentMessage">{message}</ListGroupItem>
        )
        let messageList = this.state.message
        messageList.push(elem)
        this.setState({message: messageList})
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

const mapStateToProps = (state, ownProps) => {
    return{
        socket: state.socket,
        members: state.members
    }
}

export default connect (mapStateToProps)(Chat)