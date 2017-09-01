import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client'
import {Button, FormControl, ListGroup, ListGroupItem, Grid, Col, Row} from 'react-bootstrap'

import './App.css';

import Dialog from './components/Dialog'
// import CloseButton from "react-error-overlay/lib/components/CloseButton";
// self = null
const socket = io()

class App extends Component {
    state = {
        passwords: [],
        data: {},
        username: "",
        showModal: true,
        listItems: []
    }

    componentDidMount(){
        this.handleOnReceiveMessage()
        console.log("socket: ", socket)

        var elem = this.refs.serverTime
        // var socket = io()
        socket.on("time", function(timeString){
            elem.innerText = "Servertime: " + timeString
            // console.log("logged in to server at: ", timeString)
        })
    }

    /**
     * handle socket messages and dialog
     */
    handleOnReceiveMessage(){
        socket.on("username", (user) => {
            console.log("received User: ", user)
            this.getListItem(user)
        })
    }

    // getPasswords = () => {
    //     // console.log("getPasswords: ", this)
    //     fetch('/api/passwords')
    //         .then(res => res.json())
    //         .then(passwords => this.setState({
    //             passwords: passwords
    //         }))
    // }

    onChangeUsername = (username) => {
        // console.log("user: ", username)
        this.setState({username: username})
        // console.log("username: ", this.state.username)
    }

    confirmUsername(){
        if(this.state.username){
            // console.log("Username: ", this.state.username)
            socket.emit("username", this.state.username)
            this.onClose()
        }
    }

    onClose(){
        this.setState({
            showModal: false
        })
    }

    /**
     * end of handling
     */
    onClickUser(e){
        console.log("You've clicked on ...", e)
        this.onOpenChatbox()
    }

    onOpenChatbox(){

    }

    getListItem(username){
        var user = username
        var array = this.state.listItems
        const element = (
            <ListGroupItem
                onClick={() => this.onClickUser(user)}
                key={username}>
                {username}
            </ListGroupItem>
        )
        array.push(element)
        this.setState({listItems: array})
    }

    /**
     * render the page
     * @returns {XML}
     */
    render() {
        const body = (
            <div>
                <FormControl
                    type="text"
                    placeholder="Dein Nutzername:"
                    onChange={(e) => this.onChangeUsername(e.target.value)} />
            </div>
        )
        const footer = (
            <div>
                <Button
                    bsStyle="success"
                    onClick={() => this.confirmUsername()}>
                    Bestätigen
                </Button>
            </div>
        )

        return(
            <div className="App">

                <Dialog showModal={this.state.showModal} title="Bitte gib deinen Nutzernamen ein:" body={body} footer={footer}/>

                <h1>Cooles Pen and Paper Dashboard</h1>
                <p id="servertime"
                    ref="serverTime">Servertime: </p>

                <Grid>
                    <Row>
                        <Col md={4}>
                            <ListGroup componentClass="ul">
                                {this.state.listItems}
                            </ListGroup>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
      }
}

export default App;
