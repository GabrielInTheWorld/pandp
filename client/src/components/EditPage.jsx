import React, {Component} from 'react'

import {Modal, Button} from 'react-bootstrap'

import '../style/Components.css'

var isPressing = false
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
     */
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
                        onMouseDown={(event) => {
                            isPressing = true
                            this.onDraw(event)
                        }}
                        onMouseMove={(event) => this.onDraw(event)}
                        onMouseUp={() => {
                            console.log("onMouseUp")
                            isPressing = false
                        }}
                    ></canvas>
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