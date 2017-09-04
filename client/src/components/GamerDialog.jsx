import React, {Component} from 'react'
import * as bootstrap from 'react-bootstrap'

const Modal = bootstrap.Modal
const Button = bootstrap.Button
const Tooltip = bootstrap.Tooltip
const OverlayTrigger = bootstrap.OverlayTrigger

var socket
export default class GamerDialog extends Component{
    state = {
        showModal: false,
        username: ""
    }

    componentDidMount(){
        socket = this.props.socket
        this.setState({showModal: this.props.show})
    }

    componentWillReceiveProps(nextProps){
        this.setState({showModal: nextProps.show, username: nextProps.username})
    }

    setRole = (role) => {
        // switch (role){
        //     case "Master":
        //         console.log("You will be playing as Master.")
        //         socket.on("Role", {username: this.state.username, role: "Master"})
        //         break
        //     case "Player":
        //         console.log("You will be playing as Player.")
        //         socket.on("Role", {username: this.state.username, role: "Player"})
        //         break
        //     default:
        //         break
        // }
        socket.emit("Role", {username: this.state.username, role: role})
        this.closeDialog()
    }

    closeDialog(){
        this.setState({showModal: false})
    }

    render(){
        const tooltipPlayer = (
            <Tooltip id="tooltipPlayer">Spiele als <strong>Spieler</strong>!</Tooltip>
        )
        const tooltipMaster = (
            <Tooltip id="tooltipMaster">Sei der <strong>Master</strong> des Spiels!</Tooltip>
        )
        const style = {
            textAlign: "center"
        }


        return(
            <Modal show={this.state.showModal}>
                <Modal.Header>
                    <Modal.Title style={style}>Bestimme Dein Schicksal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={style}>
                        <OverlayTrigger placement="top" overlay={tooltipPlayer}>
                            <Button bsStyle="primary" onClick={() => this.setRole("Spieler")}>Spieler</Button>
                        </OverlayTrigger>
                    </div>
                    <div style={style}>
                        <OverlayTrigger placement="top" overlay={tooltipMaster}>
                            <Button bsStyle="danger" onClick={() => this.setRole("Meister")}>Meister</Button>
                        </OverlayTrigger>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}