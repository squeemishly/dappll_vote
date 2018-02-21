import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Profile.css'

class Profile extends Component {
     render() {
         return (
             <div className={classes.Container}>
                <h2>Name: {this.props.user.name}</h2>
                <h2>Email: {this.props.user.email}</h2>
                <h2>Account Number: #sndk2329fnf92h9nsd</h2>
                <h2>Voted: True</h2>
                <h2>Voted For: Bush</h2>
                <h2>Time Voted: Thursday, February 14, 2018</h2>
            </div>
         )
     }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Profile);