import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client'
import {Button, FormControl, FormGroup, ListGroup, ListGroupItem, Grid, Col, Row, Panel} from 'react-bootstrap'

import './App.css';

import Dialog from './components/Dialog'
import DiceTable from './components/DiceTable'
// import CloseButton from "react-error-overlay/lib/components/CloseButton";
// self = null
const socket = io()

class App extends Component {
    state = {
        passwords: [],
        data: {},
        username: "",
        loggedIn: "",
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
     * handle socket messages
     */
    handleOnReceiveMessage(){
        socket.on("username", (user) => {
            console.log("received User: ", user)
            this.getListItem(user)
        })

        socket.on("allUsers", (allUsers) => {
            for(var i = 0; i < allUsers.length; ++i){
                this.getListItem(allUsers[i])
            }
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

    /**
     * handle dialog input and buttons
     * @param username
     */
    onChangeUsername = (username) => {
        // console.log("user: ", username)
        this.setState({username: username})
        // console.log("username: ", this.state.username)
    }

    getValidationState(){
        const length = this.state.username.length
        if(length >= 8) return "success"
        else if(length >= 4) return "warning"
        else if(length >= 0) return "error"
    }

    confirmUsername(){
        if(this.state.username && this.state.username.length >= 4){
            // console.log("Username: ", this.state.username)
            socket.emit("username", this.state.username)
            this.setState({loggedIn: this.state.username})
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
            <form>
                <FormGroup
                    controlId="usernameInput"
                    validationState={this.getValidationState()}>
                    <FormControl
                        type="text"
                        placeholder="Dein Nutzername:"
                        onChange={(e) => this.onChangeUsername(e.target.value)} />
                    <FormControl.Feedback />
                </FormGroup>
            </form>
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
                        <Col md={3}>
                            <Panel header="Du bist eingeloggt als:">
                                {this.state.loggedIn}
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <ListGroup id="memberList" componentClass="ul">
                                <div className="bigFont">Eingeloggte Mitglieder</div>
                                {this.state.listItems}
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <DiceTable/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
      }
}

export default App;
