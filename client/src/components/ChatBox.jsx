import React from 'react'
import * as bootstrap from 'react-bootstrap'

import Chat from './Chat'

const Tabs = bootstrap.Tabs
const Tab = bootstrap.Tab
const Button = bootstrap.Button

export default class ChatBox extends React.Component{
    state = {
        isShown: false,
        amountMembers: 0,
        listMembers: [],
        role: ""
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        // console.log("nextProps: ", nextProps)
        this.setState({amountMembers: nextProps.members, listMembers: nextProps.listMembers, role: nextProps.role})
    }

    getTabs = () => {
        let tabs = []

        for(var i = 0; i < this.state.amountMembers; ++i){
            let title = (
                <div>
                    <label className="pointer">{this.state.listMembers[i]}</label>
                    <Button className="tabCloseButton"></Button>
                </div>
            )
            var elem = (
                <Tab ref={"tab_" + i} className="tab" key={i} eventKey={i} title={title}>
                    <Chat socket={this.props.socket} role={this.state.role} receiver={this.state.listMembers[i]} username={this.props.username} />
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