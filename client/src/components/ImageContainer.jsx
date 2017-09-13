import React from 'react'

import {Image} from 'react-bootstrap'

export default class ImageContainer extends React.Component{
    state = {
        source: ""
    }

    componentDidMount(){
        console.log("ImageContainer: ", this.props)
        this.setState({source: this.props.source})
    }

    render(){
        return(
            <Image src={this.state.source} thumbnail/>
        )
    }
}