import React from 'react'

import '../style/Components.css'

import CreatePicture from './CreatePicture'
import ReceiveMail from './ReceiveMail'

export default class OptionalComponents extends React.Component{
    render(){
        return(
            <div className="componentsContainer">
                <CreatePicture />
                <ReceiveMail/>
            </div>
        )
    }
}