import React, {Component} from 'react'
import * as bootstrap from 'react-bootstrap'
import {connect} from 'react-redux'

import Dice from './Dice'

const FormGroup = bootstrap.FormGroup
const FormControl = bootstrap.FormControl
const ControlLabel = bootstrap.ControlLabel
const Button = bootstrap.Button

const Row = bootstrap.Row
const Col = bootstrap.Col
const Grid = bootstrap.Grid

var socket
class DiceTable extends Component{
    state = {
        amountOfDice: 2,
        kindOfDice: 10,
        diceValue: [-99, -99],
        sum: -198,
        username: ""
    }

    componentDidMount(){
        console.log("DiceTable: ", this.props)
        let tmp = []
        for(var i = 0; i < this.state.amountOfDice; ++i){
            // this.setState({diceValue[i] = -99})
            tmp.push(-99)
        }
        this.setState({
            diceValue: tmp
        })

        socket = this.props.socket
        // console.log("hello: ", tmp, this.state.diceValue)
    }

    componentWillReceiveProps(nextProps){
        this.setState({username: nextProps.username})
    }

    getSum(array){
        let sum = 0
        for(var i = 0; i < array.length; ++i){
            sum += array[i]
        }
        return sum
    }

    rollDice = () =>{
        // console.log("roll Dice")
        let sum = []
        for(var i = 0; i < this.state.amountOfDice; ++i) {
            // console.log("dice: ", this.refs["dice_" + i])
            if (this.state.kindOfDice !== 10) {
                sum[i] = Math.floor((Math.random() * this.state.kindOfDice) + 1)
            } else {
                sum[i] = Math.floor(Math.random() * this.state.kindOfDice)
            }
            this.refs["dice_" + i].innerText = sum[i]
        }
        this.setState({diceValue: sum, sum: this.getSum(sum)})
        socket.emit("rollDice", {
            emitter: this.state.username,
            message: this.state.username + " erzielte mit [" + this.state.amountOfDice + "  W" + this.state.kindOfDice + "]: " + this.getSum(sum)
        })
        // console.log("roll: ", this.getSum(sum))
    }

    changeKindDice = (e) => {
        // console.log("changeKindDice: ", e.target.value.slice(1))
        this.setState({kindOfDice: e.target.value.slice(1)})
    }

    changeAmountDice = (e) => {
        // console.log("changeAmountDice: ", e.target.value)
        let tmp = []
        for(var i = 0; i < e.target.value; ++i){
            // this.setState({diceValue[i] = -99})
            tmp.push(-99)
        }
        this.setState({
            amountOfDice: e.target.value,
            diceValue: tmp,
            sum: e.target.value * -99
        })
        // console.log("diceValue: ", tmp, this.state.diceValue)
    }

    getDice = () => {
        let number = this.state.amountOfDice
        var dice = []
        // console.log("getDice: ", this.state.diceValue)
        for(var i = 0; i < number; ++i){
            dice.push(<Dice id={"dice_" + i} ref={"dice_" + i} key={"dice_" + i} value={this.state.diceValue[i]} />)
        }
        return dice
    }

    render(){
        return(
            <Grid>
                <Row>
                    <Col md={3} xs={5}>
                        <FormGroup>
                            <ControlLabel className="alignLeft">Art des Würfels:</ControlLabel>
                            <FormControl defaultValue="W10" componentClass="select" placeholder="Würfel" onChange={(e) => this.changeKindDice(e)}>
                                <option value="W4">W4</option>
                                <option value="W6">W6</option>
                                <option value="W8">W8</option>
                                <option value="W10">W10</option>
                                <option value="W12">W12</option>
                                <option value="W20">W20</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col md={3} xs={5}>
                        <FormGroup>
                            <ControlLabel className="alignLeft">Anzahl Würfel:</ControlLabel>
                            <input className="react-stepper" type="number" value={this.state.amountOfDice} min="1" step="1" onChange={(e) => this.changeAmountDice(e)}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row id="rowOfDice">
                    <Col md={6} xs={12}>
                        {this.getDice()}
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12}>
                        <Button onClick={() => this.rollDice()}>Würfel rollt!</Button>
                        <label className="bigFont newLine">Ergebnis: {this.state.sum}</label>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.socket,
        members: state.members
    }
}

export default connect(mapStateToProps)(DiceTable)