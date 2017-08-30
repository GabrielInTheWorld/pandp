import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// self = null

class App extends Component {
    state = {
        passwords: []
    }

    //Fetch the passwords from server after first mount
    componentDidMount(){
        this.getPasswords()
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
            </div>
        )
      }
}

export default App;
