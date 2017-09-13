import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as StreamIO from 'socket.io-stream'

import Video from './Video'

var socket
var stream = StreamIO.createStream()
const constraints = {
    audio: true,
    video: {
        width: {ideal: 300},
        height: {ideal: 150}
    }
}
class VideoContainer extends Component{

    state = {

    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        socket = this.props.socket

        console.log("stream: ", stream)

        this.handleReceiveMessage()
    }

    handleReceiveMessage(){
        // if(media.mediasource.enabled)
        //     console.log("mediasource: ", true)
        // else
        //     console.log("mediasource: ", false)
        let mediaSource = new MediaSource()
        document.getElementById("source-1").objSource = window.URL.createObjectURL(mediaSource)
        mediaSource.addEventListener('sourceopen', function(event){
            let sourceBuffer = mediaSource.addSourceBuffer('<the mimetype and codec, like : video/mp4;codecs="avc1.4d001e,mp4a.40.2" ')
            socket.on('video', (data) => {
                console.log("received video-streaming")
                sourceBuffer.append(new Uint8Array(data))
            })
        })

        // StreamIO(socket).on("video", function(stream){
        //     console.log("VideoContainer - stream: ", stream)
        // })

    }

    getVideos(){

    }

    render(){
        return(
            <div>
                <Video id="source-1" />
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