import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client'
import {Button, FormControl, FormGroup, ListGroup, ListGroupItem, Grid, Col, Row, Panel} from 'react-bootstrap'

import './App.css';

import Dialog from './components/Dialog'
import GamerDialog from './components/GamerDialog'
import CharacterContainer from './components/CharacterContainer'
import DiceTable from './components/DiceTable'
import ChatBox from './components/ChatBox'
import OptionalComponents from './components/OptionalComponents'
// import CloseButton from "react-error-overlay/lib/components/CloseButton";
// self = null
const socket = io()

class App extends Component {
    state = {
        passwords: [],
        data: {},
        username: "",
        loggedIn: "",
        role: "",
        master: "",
        showModal: true,
        showGamerDialog: false,
        listItems: [],
        amountOfMembers: 0,
        listMembers: [], //list only with members in chat
        memberList: [] //list with all members in room
    }

    componentDidMount(){
        this.handleOnReceiveMessage()
        // console.log("socket: ", socket)
        console.log("App.js: ")

        let elem = this.refs.serverTime
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
            this.setState({listItems: []})
            console.log("received allUsers: ", allUsers, this.state.listItems)
            for(let i = 0; i < allUsers.length; ++i){
                if(allUsers[i] !== this.state.loggedIn)
                    this.getListItem(allUsers[i])
            }
        })

        socket.on("message", (data) => {
            // console.log("received data: ", data)
            if(this.state.loggedIn === data.user)
                this.onReceiveMessage(data)
        })

        socket.on("Role", (role) => {
            this.setState({showGamerDialog: false, role: role})
        })

        socket.on("masterIsChosen", (user) => {
            this.setState({master: user})
        })

        socket.on("rollDice", (data) => {
            if(this.state.role === "Meister"){
                this.onReceiveMessage(data)
            }else if(this.state.loggedIn === data.emitter){
                if(!this.state.listMembers.includes(this.state.master)){
                    let members = this.state.listMembers
                    members.push(this.state.master)
                    this.setState({listMembers: members})
                }
                this.setTabActive(this.state.master)
            }
        })
    }

    onReceiveMessage = (data) => {
        if(!this.state.listMembers.includes(data.emitter)){
            let members = this.state.listMembers
            members.push(data.emitter)
            this.setState({listMembers: members})
        }
        // console.log("receiveMessage: ", document.getElementById("chatTab-tab-" + this.state.listMembers.indexOf(data.emitter)))
        if(this.state.role !== "Meister")
            this.setTabActive(data.emitter)
    }

    setTabActive(target){
        document.getElementById("chatTab-tab-" + this.state.listMembers.indexOf(target)).setAttribute("active", "true")
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
            this.openGamerDialog()
        }
    }

    onClose(){
        this.setState({
            showModal: false
        })
    }

    openGamerDialog(){
        this.setState({
            showGamerDialog: true
        })
    }

    /**
     * end of handling
     */
    onClickUser(e){
        console.log("You've clicked on ...", e, this.state.listMembers)
        // this.setState(prevState => {
        //     listMembers: [prevState.listMembers, e]
        // })
        if(!this.state.listMembers.includes(e)) {
            let members = this.state.listMembers
            members.push(e)
            this.setState({listMembers: members})
        }
        this.onOpenChatbox()
    }

    onOpenChatbox(){

    }

    getListItem(username){
        let user = username
        let memberList = this.state.memberList
        memberList.push(username)

        let array = this.state.listItems
        const element = (
            <ListGroupItem
                onClick={() => this.onClickUser(user)}
                key={username}>
                {username}
            </ListGroupItem>
        )
        array.push(element)
        this.setState({listItems: array, memberList: memberList, amountOfMembers: array.length})
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
                <GamerDialog show={this.state.showGamerDialog} username={this.state.loggedIn} socket={socket} />

                <h1>Krasses Pen and Paper Dashboard</h1>
                <p id="servertime"
                    ref="serverTime">Servertime: </p>

                <Grid>
                    <Row id="topRow">
                        <Col id="fileComponent" md={9}>
                            <CharacterContainer/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Panel header="Du bist eingeloggt als:">
                                {this.state.loggedIn}, {this.state.role}
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <DiceTable socket={socket} username={this.state.loggedIn} />
                        </Col>
                        <Col md={1}>
                            <OptionalComponents socket={socket} memberList={this.state.memberList} />
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
                            <ChatBox username={this.state.loggedIn} listMembers={this.state.listMembers} members={this.state.amountOfMembers} role={this.state.role} socket={socket} />
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Grid>
            </div>
        )
      }
}

export default App;
