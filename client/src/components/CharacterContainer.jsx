import React, {Component} from 'react'
import superagent from 'superagent'

// import {FieldGroup} from '../Components'

import {Grid, Row, Col, Button} from 'react-bootstrap'
import '../style/CharacterContainer.css'


var filesInput
export default class CharacterContainer extends Component{
    state = {
        fileList: []
    }

    getFileContainer(){

    }

    handleOnFileUploaded = () => {
        let formData = new FormData()
        const files = filesInput.files
        console.log("files: ", files)
        for(let key in files){
            if(files.hasOwnProperty(key) && files[key] instanceof File){
                formData.append(key, files[key])
            }
        }
        superagent.post('/upload')
            .send(formData)
            .end((err, response) => {
                if(err){
                    console.log("Something went wrong.")
                    return
                }else if(response.ok){
                    console.log("Everything fine.")
                }else{
                    console.log("Anything else: ", response)
                }
            })
    }

    render(){
        const style = {
            textAlign: "left"
        }

        return(
            <Grid>
                <Row className="fileContainer">
                    {this.getFileContainer()}
                    <div style={style}>
                        <div style={style}>
                            <label htmlFor="fileUploadCharacterSheet" id="fileUploader">+</label>
                            <input type="file" id="fileUploadCharacterSheet" ref={(input) => {filesInput = input}} onChange={() => this.handleOnFileUploaded()} />
                        </div>
                        <Button bsStyle="primary">Neu</Button>
                    </div>
                </Row>
            </Grid>
        )
    }
}