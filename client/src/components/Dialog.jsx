import React, {Component} from 'react'
import * as bootstrap from 'react-bootstrap'

const Modal = bootstrap.Modal
const Popover = bootstrap.Popover
const Tooltip = bootstrap.Tooltip
const Button = bootstrap.Button
const OverlayTrigger = bootstrap.OverlayTrigger

export default class Dialog extends Component{
    state = {
        showModal: true
    }

    componentWillReceiveProps(nextProps){
        // console.log("nextProps: ", nextProps.showModal)
        this.setState({showModal: nextProps.showModal})
    }

    close = () => {
        this.setState({showModal: false})
    }

    open = () => {
        this.setState({showModal: true})
    }

    render(){
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        return(
            <div>
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
            </div>
        )
    }
}