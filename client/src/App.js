import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client'
import './App.css';

// self = null
const socket = io("http://localhost:3001")

class App extends Component {
    state = {
        passwords: [],
        data: {}
    }

    //Fetch the passwords from server after first mount
    componentDidMount(){
        console.log("socket: ", socket)
        this.getPasswords()

        var elem = this.refs.serverTime
        // var socket = io()
        socket.on("time", function(timeString){
            elem.innerText = "Servertime: " + timeString
            // console.log("logged in to server at: ", timeString)
        })

        // var elem = this.getElementById("serverTime")
        // console.log("serverTime: ", this.refs.serverTime.innerText)
        // var HOST = location.origin.replace(/^http/, "ws")
        // var ws = new WebSocket(HOST)
        //
        // ws.onmessage = function(event) {
        //     this.serverTime.innerHTML = "Servertime: " + event.data
        // }
        // console.log("componentDidMount", this)
        // self = this
    }

    getPasswords = () => {
        // console.log("getPasswords: ", this)
        fetch('/api/passwords')
            .then(res => res.json())
            .then(passwords => this.setState({
                passwords: passwords
            }))
    }

    render() {
        // console.log("render", this)
        const {passwords} = this.state

        return(
            <div className="App">
                {passwords.length ? (
                    <div>
                        <h1>5 Passwords</h1>
                        <ul className="passwords">
                            {passwords.map((password, index) =>
                                <li key={index}>
                                    {password}
                                </li>
                            )}
                        </ul>
                        <button
                            className="more"
                            onClick={this.getPasswords}>
                            Get more!
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1>No passwords :(</h1>
                        <button
                            className="more"
                            onClick={this.getPasswords}>
                            Try again?
                        </button>
                    </div>
                )
                }
                <p id="servertime"
                    ref="serverTime">Servertime: </p>
            </div>
        )
      }
}

export default App;
