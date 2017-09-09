import React from 'react'
import * as bootstrap from 'react-bootstrap'

import Chat from './Chat'

import '../style/Chat.css'

const Tabs = bootstrap.Tabs
const Tab = bootstrap.Tab
const Button = bootstrap.Button

export default class ChatBox extends React.Component{
    state = {
        isShown: false,
        listMembers: [],
        role: "",
        username: ""
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps in ChatBox: ", nextProps)
        this.setState({listMembers: nextProps.listMembers, role: nextProps.role, username: nextProps.username})
    }

    getTabs = () => {
        console.log("getTabs in ChatBox: ", this.state)
        let tabs = []

        for(var i = 0; i < this.state.listMembers.length; ++i){
            let title = (
                <div>
                    <label className="pointer">{this.state.listMembers[i]}</label>
                    <Button className="tabCloseButton"></Button>
                </div>
            )
            var elem = (
                <Tab ref={"tab_" + i} className="tab" key={i} eventKey={i} title={title}>
                    <Chat role={this.state.role} receiver={this.state.listMembers[i]} username={this.state.username} />
                </Tab>
            )

            tabs.push(elem)
        }
        return tabs
    }

    render(){
        return(
            <div>
                <Tabs id="chatTab" defaultActiveKey={0} animation={false}>
                    {this.getTabs()}
                </Tabs>
            </div>
        )
    }
}