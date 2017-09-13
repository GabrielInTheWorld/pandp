import React, {Component} from 'react'
import * as stream from 'socket.io-stream'
import {connect} from 'react-redux'

import {Button} from 'react-bootstrap'

import '../style/Components.css'

// var socket
var camera
class Video extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // socket = this.props.socket
        this.handleReceiveMessage()

        console.log("Video.jsx: ", this.refs.camera)
        camera = this.refs.camera
    }

    componentWilReceiveProps(nextProps){
        console.log("Video.jsx: nextProps", nextProps)
    }

    play(){
        // let constraints = {audio: true, video: {
        //     width: {min: 1024, ideal: 1280, max: 1920},
        //     height: {min: 576, ideal: 720, max: 1080}
        // }}
        // let constraints = {
        //     audio: true,
        //     video: {
        //         width: {ideal: 300},
        //         height: {ideal: 150}
        //     }
        // }
        // navigator.mediaDevices.getUserMedia(constraints)
        //     .then(function(mediaStream) {
        //         camera.srcObject = mediaStream
        //         camera.onloadedmetadata = function(e){
        //             camera.play()
        //         }
        //     })
        //     .catch(function(err){
        //         console.log("Something went wrong: ", err.name + ": ", err.message)
        //     })
    }

    handleReceiveMessage = () => {

    }

    render(){
        return(
            <div>
                <video id={this.props.id} className="cameraStream" ></video>
            </div>
        )
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return{
//         socket: state.socket,
//         members: state.members
//     }
// }
//
// export default connect (mapStateToProps)(Video)

export default Video