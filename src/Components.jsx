import React, {Component} from 'react'
import * as bootstrap from 'react-bootstrap'

const FormGroup = bootstrap.FormGroup
const ControlLabel = bootstrap.ControlLabel
const FormControl = bootstrap.FormControl
const HelpBlock = bootstrap.HelpBlock

export function FieldGroup ({id, label, help, ...props}){
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    )
}