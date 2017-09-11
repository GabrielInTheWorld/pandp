import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Modal, Button, Checkbox} from 'react-bootstrap'

import '../style/Components.css'

var isPressing = false
var socket
var refList = []
class EditPage extends Component{
    state = {
        show: false,
        showSendDialog: false,
        memberList: [],
        receivers: []
    }

    componentDidMount(){
        socket = this.props.socket
        // console.log("socket: ", socket)
    }

    componentWillReceiveProps(nextProps){
        console.log("EditPage: ", nextProps)
        this.setState({show: nextProps.show, memberList: nextProps.members})
    }

    /**
     *
     * @param event contains the mousedata
     */
    close = () => {
        this.setState({show: false})
    }


    onDraw(event) {
        if (isPressing) {
            var canvas = document.getElementById("canvas")
            var rect = canvas.getBoundingClientRect()
            // console.log("canvas: ", event.clientY, event.clientY - rect.top, document.getElementById("canvas"))
            var context = canvas.getContext("2d")
            context.fillRect(event.clientX - rect.left, event.clientY - rect.top, 4, 4)
            // context.fill
        }
    }

    getMembers(){
        let elems = []
        for(var i = 0; i < this.state.memberList.length; ++i){
            elems.push(
                <Checkbox key={"checkbox_" + i}
                          inputRef={
                              (ref) => {
                                  // this.inputRef = ref
                                  let reference = refList
                                  reference.push(ref)
                                  refList = reference
                                  console.log("this.inputRef: ", refList)
                              }
                          }
                >{this.state.memberList[i]}</Checkbox>
            )
        }
        return elems
    }

    getSendDialog(){
        return (
            <Modal
                show={this.state.showSendDialog}>
                <Modal.Header><Modal.Title>Wähle deine Ziele...</Modal.Title></Modal.Header>
                <Modal.Body>
                    {
                        this.getMembers()
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => {
                        let receivers = []
                        // let reference = refList
                        for(let i = 0; i  < refList.length; ++i){
                            console.log("elem: ", refList[i])
                            if(refList[i].checked)
                                receivers.push(this.state.memberList[i])
                        }
                        console.log("receiverList: ", receivers)
                        socket.emit("mail", {
                            receivingUsers: receivers,
                            dataURL: document.getElementById("canvas").toDataURL()
                        })
                        this.setState({showSendDialog: false})
                    }} >Bestätigen</Button>
                    <Button bsStyle="danger" onClick={() => {this.setState({showSendDialog: false})}}>Abbechen</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render(){
        return(
            <div>
                {this.getSendDialog()}
                <Modal
                    show={this.state.show}
                    >
                    <Modal.Header closeButton><Modal.Title>Hier kannst du zeichnen</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <canvas
                            id="canvas"
                            className="drawing"
                            width={568}
                            height={500}
                            onMouseDown={(event) => {
                                isPressing = true
                                this.onDraw(event)
                            }}
                            onMouseMove={(event) => this.onDraw(event)}
                            onMouseUp={() => {
                                // console.log("onMouseUp")
                                isPressing = false
                            }}
                        ></canvas>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={() => {
                            this.setState({showSendDialog: true})
                            // this.onSend()
                        }}>Senden</Button>
                        <Button bsStyle="primary">Speichern</Button>
                        <Button bsStyle="danger" onClick={this.close}>Schließen</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        socket: state.socket,
        members: state.members
    }
}

export default connect(mapStateToProps)(EditPage)