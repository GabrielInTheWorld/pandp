import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Peer from 'simple-peer'

// import {ButtonGroup, Button} from 'react-bootstrap'

import Video from './Video'

var socket
var peer
var isInitiator = false
var bufferSignal
class VideoContainer extends Component{

    state = {

    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        socket = this.props.socket
        console.log("VideoContainer - componentDidMount(): ", socket, this.props)
        this.handleReceiveMessage()
    }

    componentWillReceiveProps(nextProps){
        console.log("VideoContainer - nextProps: ", nextProps)
        isInitiator = nextProps.initiator
        this.initiateStream()
    }

    initiateStream = () => {
        const constraints = {
            audio: true,
            video: {
                width: {ideal: 300},
                height: {ideal: 150}
            }
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                console.log("getUserMedia: ", constraints)
                this.gotMedia(stream)
            })
            .catch((error) =>{
                console.log("Something went wrong: ", error)
            })
    }

    handleReceiveMessage(){
        socket.on("receiveSignal", (data) => {
            console.log("receivedSignal: ", data)
            if(peer){
                peer.signal(JSON.parse(data))
            }else{
                bufferSignal = data
            }
        })
    }

    gotMedia = (stream) => {
        console.log("Hello World")
        peer = new Peer({initiator: isInitiator, stream: stream, trickle: false})

        peer.on('signal', (data) => {
            console.log("got signalstream in VideoContainer", data)
            socket.emit("sendSignal", JSON.stringify(data))
        })

        if(bufferSignal){
            console.log("bufferSignal is buffering data: ", bufferSignal)
            peer.signal(JSON.parse(bufferSignal))
        }

        peer.on("stream", (stream) => {
            console.log("got stream for peer1")
            let video = document.getElementById("remoting")
            video.src = window.URL.createObjectURL(stream)
            video.play()
        })
    }

    getVideos(){

    }

    render(){
        return(
            <div>
                <div id="remoteVideos"></div>
                <video id="remoting"></video>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        socket: state.socket
    }
}

export default connect(mapStateToProps)(VideoContainer)