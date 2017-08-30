import React, {Component} from 'react'

import {FormGroup, ListGroup, ListGroupItem, FormControl, ControlLabel, Button, ButtonGroup} from 'react-bootstrap'

import {FieldGroup} from "../Components"

export default class Chat extends Component{

    constructor(){
        super()
    }

    sendMessage(){

    }

    render(){
        return(
            <div>
                <div id="chatComponent">
                    <div id="messageBlock">
                        <ListGroup></ListGroup>
                    </div>
                    <div id="chatInput">
                        <FieldGroup
                            id="chatUsername"
                            type="text"
                            placeholder="Type your Username in here..."
                            label="Username"
                            onFocus={() => {
                                console.log("onFocus")
                                // var elem = document.getElementById("chatComponent")
                                // console.log(elem)
                                document.getElementById("chatComponent").setAttribute("active", "true")
                            }}
                            onBlur={() => {
                                console.log("onBlur")
                                document.getElementById("chatComponent").setAttribute("active", "false")
                            }}
                        />

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
                            <FormControl componentClass="textarea" placeholder="Type your Message in here..." />
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