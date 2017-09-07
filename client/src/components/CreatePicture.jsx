import React from 'react'

import {Modal, Button} from 'react-bootstrap'

import EditPage from './EditPage'

import '../style/Components.css'
import pen from '../res/pen.png'

export default class CreatePicture extends React.Component{
    state = {
        show: false,
        showCanvas: false
    }

    onOpenCanvas = () => {
        console.log("You've clicked to draw on canvas.")
        this.setState({show: true})
    }

    newPage = () => {
        this.setState({show: false, showCanvas: true})
    }

    hideModal = () => {
        this.setState({show: false})
    }

    getChooseModal(){
        return (
            <Modal
                show={this.state.show}
                onHide={this.hideModal}>
                <Modal.Header closeButton><Modal.Title>Wähle...</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Button bsStyle="success" onClick={() => this.newPage()}>Neu</Button>
                    <Button bsStyle="primary">Öffnen</Button>
                </Modal.Body>
            </Modal>
        )
    }

    getButtonContent = () => {
        let elem = (
            <div onClick={() => this.onOpenCanvas()} className="componentsDiv">
                <img className="componentsIcon" src={pen} height={32} width={32}/>
                <p className="componentsFont">Bild zeichnen</p>
            </div>
        )

        return elem
    }

    render(){
        const style = {
            width: "38px",
            height: "38px"
        }
        console.log("render-method")
        return(
            <div>
                {this.getChooseModal()}
                <EditPage show={this.state.showCanvas} socket={this.props.socket} memberList={this.props.memberList} />
               <div style={style}>{this.getButtonContent()}</div>
            </div>
        )
    }
}