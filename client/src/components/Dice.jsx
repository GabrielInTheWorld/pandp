import React from 'react'
import '../App.css'

export default class Dice extends React.Component{
    state = {
        value: 0
    }

    componentDidMount(){
        this.setState({value: this.props.value})
    }

    componentWillReceiveProps(newProps){
        // console.log("newProps: ", newProps)
        this.setState({value: newProps.value})
    }

    render(){
        return(
            <div className="dice">{this.state.value}</div>
        )
    }
}