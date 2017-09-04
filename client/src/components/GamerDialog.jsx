import React, {Component} from 'react'
import * as bootstrap from 'react-bootstrap'

const Modal = bootstrap.Modal

export default class GamerDialog extends Component{
    state = {

    }

    render(){
        return(
            <Modal show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                    {this.props.header}
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.footer}
                </Modal.Footer>
            </Modal>
        )
    }
}