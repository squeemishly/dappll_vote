import React, { Component } from 'react'
import classes from './Results.css'

class Results extends Component {
    render() {
        return (
            <div className={classes.Container}>
                <h1>Candidates</h1>
                <h2>Votes for Bush: 2</h2>
                <h2>Votes for Clinton: 2</h2>
            </div>
        )
    }
}

export default Results;
