import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as StreamIO from 'socket.io-stream'
import * as P2P from 'socket.io-p2p'
import SimpleWebRTC from 'simplewebrtc'
import * as Peer from 'simple-peer'
import wrtc from 'wrtc'

import {ButtonGroup, Button} from 'react-bootstrap'

import Video from './Video'

var socket
var stream = StreamIO.createStream()
var webrtc
var peer
// var p2p
const constraints = {
    audio: true,
    video: {
        width: {ideal: 300},
        height: {ideal: 150}
    }
}
// const peerOptions = {
//     peerOpts: {
//         numClients: 10
//     }
// }
class VideoContainer extends Component{

    state = {

    }

    constructor(props){
        super(props)
        // socket = this.props.socket
        // p2p = new P2P(socket, {numClients: 10})
        // p2p.on('ready', () => {
        //     p2p.usePeerConnection = true
        //     p2p.emit('peer-obj', {peerId: peerId})
        // })
    }

    componentDidMount(){
        socket = this.props.socket
        console.log("VideoContainer - componentDidMount(): ", socket)
        webrtc = new SimpleWebRTC({
            localVideoEl: '',
            remoteVideosEl: "remoteVideos",
            autoRequestMedia: true,
            connection: socket,
            socketio: socket
        })

        // this.startStream()
        console.log("stream: ", stream, "\np2p: ", webrtc)

        this.handleReceiveMessage()
        // p2p = new P2P(socket, peerOptions)
    }

    handleReceiveMessage(){
        // p2p.on("peer-msg", (data) => {
        //     console.log("peer-msg: ", data)
        // })

        // p2p.on("go-private", () => {
        //     p2p.upgrade()
        // })

        // if(media.mediasource.enabled)
        //     console.log("mediasource: ", true)
        // else
        //     console.log("mediasource: ", false)


        // let mediaSource = new MediaSource()
        // document.getElementById("source-1").objSource = window.URL.createObjectURL(mediaSource)
        // mediaSource.addEventListener('sourceopen', function(event){
        //     let sourceBuffer = mediaSource.addSourceBuffer('<the mimetype and codec, like : video/mp4;codecs="avc1.4d001e,mp4a.40.2" ')
        //     socket.on('video', (data) => {
        //         console.log("received video-streaming")
        //         sourceBuffer.append(new Uint8Array(data))
        //     })
        // })


        // StreamIO(socket).on("video", function(stream){
        //     console.log("VideoContainer - stream: ", stream)
        // })

    }

    startStream = () => {
        // const peerOptions = {
        //     peerOpts: {
        //         numClients: 10
        //     }
        // }

        webrtc.on('readyToCall', () => {
            console.log("webrtc will connect to room")
            webrtc.joinRoom('crazyShit')
        })

        // navigator.mediaDevices.getUserMedia(constraints)
        //     .then(function(mediaStream) {
        //         var audioContext = new window.AudioContext()
        //         var mediaStreamSource = audioContext.createMediaStreamSource(mediaStream)
        //         var mediaStreamDestination = audioContext.createMediaStreamDestination()
        //         mediaStreamSource.connect(mediaStreamDestination)
        //
        //         let p2p = new P2P(socket, {peerOpts: {
        //             numClients: 10,
        //             stream: mediaStreamDestination.stream
        //         }})
        //
        //         p2p.on('ready', () => {
        //             p2p.usePeerConnection = true
        //         })
        //
        //         console.log("p2p after start-stream: ", p2p)
        //
        //         p2p.emit('ready', {peerId: p2p.peerId})
        //     })
    }

    sendData = () => {
        // p2p.emit("peer-msg", {
        //     data: "peer-msg"
        // })
        // socket.emit("peer-msg", {
        //     data: "socket-msg"
        // })
    }

    getVideos(){

    }

    render(){
        return(
            <div>
                <div id="remoteVideos"></div>
                <ButtonGroup vertical>
                    <Button onClick={() => this.startStream()}>Send Data</Button>
                </ButtonGroup>
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