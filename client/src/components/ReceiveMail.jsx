import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Label, Modal} from 'react-bootstrap'

import ImageContainer from './ImageContainer'

import mail from '../res/eMail.png'

var socket
class ReceiveMail extends Component{
    state = {
        receivedMails: 0,
        dataSource: [],
        showModal: false
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("props in ReceiveMail: ", this.props)
        socket = this.props.socket
        this.handleReceiveMessage()
    }

    handleReceiveMessage = () => {
        socket.on("mail", (data) => {
            console.log("mail data", data)
            // this.setState({receivedMails: ++this.state.receivedMails})
            let source = this.state.dataSource
            source.push(data.dataURL)
            this.setState({dataSource: source})
        })
    }

    getImages = () => {
        let elems = []
        for(let i = 0; i < this.state.dataSource.length; ++i){
            elems.push(<ImageContainer key={"image_" + i} source={this.state.dataSource[i]} />)
        }
        return elems
    }

    show = () => {
        this.setState({showModal: true})
    }

    close = () => {
        this.setState({showModal: false})
    }

    getContainerModal() {
        const style = {
            height: "80vh",
            overflowY: "auto"
        }
        return(
            <Modal show={this.state.showModal} style={style} onHide={this.close}>
                <Modal.Header closeButton><Modal.Title>Alle Nachrichten</Modal.Title></Modal.Header>
                <Modal.Body>
                    {
                        this.getImages()
                    }
                </Modal.Body>
            </Modal>
        )
    }

    getButtonContent = () => {
        return (
            <div className="componentsDiv" onClick={this.show}>
                <img className="componentsIcon" src={mail} height={32} width={32} />
                <p className="componentsFont">Nachrichten</p>
            </div>
        )
    }

    render(){
        const style = {
            height: "38px",
            width: "38px"
        }
        return(
            <div>
                {this.getContainerModal()}
                <div style={style}>{this.getButtonContent()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.socket,
        members: state.members
    }
}

export default connect(mapStateToProps)(ReceiveMail)