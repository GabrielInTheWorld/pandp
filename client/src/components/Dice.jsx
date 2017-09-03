import React from 'react'
import '../App.css'

export default class Dice extends React.Component{
    state = {
        value: -99
    }

    willReceiveNewProps(newProps){
        console.log("newProps: ", newProps)
    }

    render(){
        return(
            <div className="dice">{this.state.value}</div>
        )
    }
}