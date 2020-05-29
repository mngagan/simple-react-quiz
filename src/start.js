import React from 'react'

export default class StartPage extends React.Component{
    render(){
        return(
            <div>start page
                <button onClick = {this.props.closeStartPage}>button</button>
            </div>
        )
    }
}