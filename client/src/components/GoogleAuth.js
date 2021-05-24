import React from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component{
   

    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId:'525131594929-dtp48hcj91bugs3amisks2ber7o63op0.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance()
                //this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.onAuthChange(this.auth.isSignedIn.get()) // show boolean
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn)=>{
        //this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId()) //show userId
        }else{
            this.props.signOut()
        }
    }

    onSignInClick = ()=>{
        this.auth.signIn()
    }

    onSignOutClick = ()=>{
        this.auth.signOut()
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        }else if(this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>Sign Out</button>
            )
        }else{
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>Sign In</button>
            )
        }
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStatetoProps = (state)=>{
    return { isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStatetoProps, { signIn, signOut })(GoogleAuth)