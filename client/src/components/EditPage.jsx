import React, {Component} from 'react'

import {Modal, Button} from 'react-bootstrap'

import '../style/Components.css'

var canvas
export default class EditPage extends Component{
    state = {
        show: false
    }

    // componentDidMount(){
    //     console.log("canvas: ", document.getElementById("canvas"))
    // }

    componentWillReceiveProps(nextProps){
        this.setState({show: nextProps.show})
    }

    /**
     *
     * @param event contains the mousedata
     * TODO: set a variable which tells if the mouse is pressed. If this is true, the user will draw something on the canvas by mousemove
     */
    onDraw(event){
        var canvas = document.getElementById("canvas")
        var rect = canvas.getBoundingClientRect()
        console.log("canvas: ", event.clientY, event.clientY - rect.top, document.getElementById("canvas"))
        var context = canvas.getContext("2d")
        context.fillRect(event.clientX-rect.left, event.clientY-rect.top, 4, 4)
        // context.fill
    }

    render(){
        return(
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
                        ref={(can) => {canvas = can}}
                        onClick={(event) => this.onDraw(event)}
                        onMouseMove={(event) => this.onDraw(event)}></canvas>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success">Senden</Button>
                    <Button bsStyle="primary">Speichern</Button>
                    <Button bsStyle="danger">Schließen</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}