import React from 'react'

import '../style/Components.css'

import CreatePicture from './CreatePicture'

export default class OptionalComponents extends React.Component{
    render(){
        return(
            <div className="componentsContainer">
                <CreatePicture socket={this.props.socket} memberList={this.props.memberList} />
            </div>
        )
    }
}