import React, {Component} from 'react'
import {connect} from 'react-redux'
// import * as StreamIO from 'socket.io-stream'
// import * as P2P from 'socket.io-p2p'
// import SimpleWebRTC from 'simplewebrtc'
import * as Peer from 'simple-peer'
// import *as wrtc from 'wrtc'

import {ButtonGroup, Button} from 'react-bootstrap'

import Video from './Video'

var socket
// var stream = StreamIO.createStream()
// var webrtc
var peer
// var p2p
// const constraints = {
//     audio: true,
//     video: {
//         width: {ideal: 300},
//         height: {ideal: 150}
//     }
// }
// const peerOptions = {
//     peerOpts: {
//         numClients: 10
//     }
// }
var isInitiator = false
var bufferSignal
class VideoContainer extends Component{

    state = {
        // isInitiator: false
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
        console.log("VideoContainer - componentDidMount(): ", socket, this.props)
        // webrtc = new SimpleWebRTC({
        //     localVideoEl: '',
        //     remoteVideosEl: "remoteVideos",
        //     autoRequestMedia: true,
        //     connection: socket,
        //     socketio: socket
        // })
        //
        // // this.startStream()
        // console.log("stream: ", stream, "\np2p: ", webrtc)

        // console.log("navigator.getUserMedia: ", navigator.mediaDevices.getUserMedia(constraints))
        // navigator.mediaDevices.enumerateDevices()
        //     .then((devices) => {
        //         devices.forEach((device) => {
        //             console.log(device.kind + ": " + device.label + " id = " + device.deviceId)
        //             if(device.kind === "videoinput"){
        //                 console.log("videoinput found")
        //                 // return
        //             }
        //         })
        //     })
        // navigator.mediaDevices.getUserMedia(constraints, this.gotMedia, () => {})

        this.handleReceiveMessage()
        // p2p = new P2P(socket, peerOptions)
        // socket.on("masterIsChosen", (data) => {
        //     console.log("masterIsChosen: ", data)
        // })
    }

    componentWillReceiveProps(nextProps){
        console.log("VideoContainer - nextProps: ", nextProps)
        // this.setState({isInitiator: nextProps.initiator})
        isInitiator = nextProps.initiator
        this.initiateStream()
    }

    initiateStream = () => {
        // let hasVideo
        // navigator.mediaDevices.enumerateDevices()
        //     .then((devices) => {
        //         devices.forEach((device) => {
        //             console.log(device.kind + ": " + device.label + " id = " + device.deviceId)
        //             if(device.kind === "videoinput"){
        //                 // console.log("videoinput found")
        //                 hasVideo = {
        //                     width: {ideal: 300},
        //                     height: {ideal: 150}
        //                 }
        //                 // return
        //             }else{
        //                 hasVideo = false
        //             }
        //         })
        //     })

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

    // getVideoConstraint(){
    //     let hasVideo
    //     navigator.mediaDevices.enumerateDevices()
    //         .then((devices) => {
    //             devices.forEach((device) => {
    //                 console.log(device.kind + ": " + device.label + " id = " + device.deviceId)
    //                 if(device.kind === "videoinput"){
    //                     // console.log("videoinput found")
    //                     hasVideo = {
    //                         width: {ideal: 300},
    //                         height: {ideal: 150}
    //                     }
    //                     // return
    //                 }else{
    //                     hasVideo = false
    //                 }
    //             })
    //         })
    //     console.log("getVideoConstraint")
    //     return hasVideo
    // }

    handleReceiveMessage(){
        socket.on("receiveSignal", (data) => {
            console.log("receivedSignal: ", data)
            if(peer){
                peer.signal(JSON.parse(data))
            }else{
                bufferSignal = data
            }
        })

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

    gotMedia = (stream) => {
        console.log("Hello World")
        peer = new Peer({initiator: isInitiator, stream: stream, trickle: false})
        // var peer2 = new Peer({})
        // var peer3 = new Peer({})

        peer.on('signal', (data) => {
            console.log("got signalstream in VideoContainer", data)
            // peer.signal(data)
            // peer2.signal(data)
            socket.emit("sendSignal", JSON.stringify(data))
        })

        if(bufferSignal){
            console.log("bufferSignal is buffering data: ", bufferSignal)
            peer.signal(JSON.parse(bufferSignal))
        }
        // peer2.on('signal', (data) =>{
        //     console.log("got signal in VideoContainer")
        //     peer.signal(data)
        // })

        peer.on("stream", (stream) => {
            console.log("got stream for peer1")
            let video = document.getElementById("remoting")
            video.src = window.URL.createObjectURL(stream)
            video.play()
        })

        // peer2.on('stream', (stream) => {
        //     console.log("got stream in VideoContainer")
        //     var video = document.getElementById("remoting")
        //     video.src = window.URL.createObjectURL(stream)
        //     video.play()
        // })
        //
        // peer3.on("stream", (stream) => {
        //     console.log("got stream for peer3")
        // })
    }

    startStream = () => {
        // const peerOptions = {
        //     peerOpts: {
        //         numClients: 10
        //     }
        // }

        console.log("clicked")
        // webrtc.on('readyToCall', () => {
        //     console.log("webrtc will connect to room")
        //     webrtc.joinRoom('crazyShit')
        // })

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
                <video id="remoting"></video>
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