import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Profile.css'

class Profile extends Component {
     render() {
         return (
             <div className={classes.Container}>
                <h3>Name: {this.props.user.name}</h3>
                <h3>Email: {this.props.user.email}</h3>
                <h3>Account Number: #sndk2329fnf92h9nsd</h3>
                <h3>Voted: True</h3>
                <h3>Voted For: Bush</h3>
                <h3>Time Voted: Thursday, February 14, 2018</h3>
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