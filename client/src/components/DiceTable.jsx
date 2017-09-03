import React, {Component} from 'react'
import * as bootstrap from 'react-bootstrap'

import Dice from './Dice'

const FormGroup = bootstrap.FormGroup
const FormControl = bootstrap.FormControl
const ControlLabel = bootstrap.ControlLabel
const Button = bootstrap.Button

const Row = bootstrap.Row
const Col = bootstrap.Col
const Grid = bootstrap.Grid

export default class DiceTable extends Component{
    state = {
        amountOfDice: 2,
        kindOfDice: 10
    }

    constructor(){
        super()
    }

    componentDidMount(){

    }

    rollDice = () =>{
        console.log("roll Dice")
    }

    changeKindDice = (e) => {
        console.log("changeKindDice: ", e.target.value.slice(1))
    }

    changeAmountDice = (e) => {
        console.log("changeAmountDice: ", e.target.value)
        this.setState({amountOfDice: e.target.value})
    }

    getDice = () => {
        let number = this.state.amountOfDice
        var dice = []
        for(var i = 0; i < number; ++i){
            dice.push(<Dice/>)
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
                            <FormControl componentClass="select" placeholder="Würfel" onChange={(e) => this.changeKindDice(e)}>
                                <option value="d4">d4</option>
                                <option value="d6">d6</option>
                                <option value="d8">d8</option>
                                <option selected="selected" value="d10">d10</option>
                                <option value="d12">d12</option>
                                <option value="d20">d20</option>
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
                    </Col>
                </Row>
            </Grid>
        )
    }
}