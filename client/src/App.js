import React, { Component } from 'react';
// import logo from './logo.svg';
// import io from 'socket.io-client'
import {Button, FormControl, FormGroup, ListGroup, ListGroupItem, Grid, Col, Row, Panel, HelpBlock} from 'react-bootstrap'
import {connect} from 'react-redux'

import './App.css';

import Dialog from './components/Dialog'
import GamerDialog from './components/GamerDialog'
import CharacterContainer from './components/CharacterContainer'
import DiceTable from './components/DiceTable'
import ChatBox from './components/ChatBox'
import OptionalComponents from './components/OptionalComponents'

import {addUser, createSocket} from './components/actions'
// import CloseButton from "react-error-overlay/lib/components/CloseButton";
// self = null
// const socket = io()
var socket = null
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

    constructor(props){
        super(props)
        // const socket = io()
        // console.log("socket in componentWillMount: ", socket)
        // this.props.createSocket(socket)
        // console.log("constructor with socket: ", socket, this.props, props)
        socket = this.props.socket
}

    // componentWillMount(){
    //     // const socket = io()
    //     console.log("socket in componentWillMount: ", this.props)
    //     // this.props.createSocket(socket)
    // }

    componentDidMount(){
        // const socket = io()
        // socket = this.props.socket
        // this.props.createSocket(socket)
        // console.log("socket: ", socket)

        // console.log("App.js: ", this.props, socket)
        this.handleOnReceiveMessage()
        let elem = this.refs.serverTime
        socket.on("time", function(timeString){
            elem.innerText = "Servertime: " + timeString
            // console.log("logged in to server at: ", timeString)
        })
    }

    componentWillReceiveProps(nextProps){
        // console.log("App.js - componentWillReceiveProps: ", nextProps, this.props)
        this.setState({memberList: nextProps.members})
    }

    /**
     * handle socket messages
     */
    handleOnReceiveMessage = () => {
        // console.log("handleOnReceiveMessage", this.props.socket)
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
        // let helper = this.refs.helpValidation
        let helper = document.getElementById("helpValidation")
        // console.log("getValidationState: ", helper)
        if(this.state.memberList.includes(this.state.username) && helper != undefined){
            // console.log("Helper: ", helper.props["HelpBlock"])
            helper.innerText = "Der Nutzername existiert bereits. Bitte gib einen anderen ein."
            return "error"
        }
        if(length >= 8  && helper != undefined){
            helper.innerText = "Der Nutzername ist krass!"
            return "success"
        }
        else if(length >= 4 && helper != undefined){
            helper.innerText = "Länger wäre besser..."
            return "warning"
        }
        else if(length >= 0 && helper != undefined){
            helper.innerText = "Deutlich zu kurz..."
            return "error"
        }
    }

    confirmUsername(){
        if(this.state.username && this.state.username.length >= 4 && !this.state.memberList.includes(this.state.username)){
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
        // console.log("You've clicked on ...", e, this.state.listMembers)
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
        // TODO: add new member to store instead of local state
        let user = username
        // let memberList = this.state.memberList
        // memberList.push(username)
        this.props.addUser(user)

        let array = this.state.listItems
        const element = (
            <ListGroupItem
                onClick={() => this.onClickUser(user)}
                key={username}>
                {username}
            </ListGroupItem>
        )
        array.push(element)
        // this.setState({listItems: array, memberList: memberList, amountOfMembers: array.length})
        this.setState({listItems: array, amountOfMembers: array.length})
        console.log("App.js - getListItem: ", this.props.members)
    }

    /**
     * render the page
     * @returns {XML}
     */
    render() {
        // console.log("rendering method: ", this.props)
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
                    <HelpBlock id="helpValidation" ref="helpValidation"></HelpBlock>
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
                <GamerDialog show={this.state.showGamerDialog} username={this.state.loggedIn} />

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
                            <DiceTable username={this.state.loggedIn} />
                        </Col>
                        <Col md={1}>
                            <OptionalComponents />
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
                            <ChatBox username={this.state.loggedIn} listMembers={this.state.listMembers} members={this.state.amountOfMembers} role={this.state.role} />
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Grid>
            </div>
        )
      }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("mapstatetoprops: ", state, ownProps)
    return {
        socket: state.socket,
        members: state.members
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log("mapdispatchtoprops", dispatch)
    return{
        createSocket: socket => dispatch(createSocket(socket)),
        addUser: user => dispatch(addUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
