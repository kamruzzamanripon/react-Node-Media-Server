import React from 'react'
import Modal from '../Modal'
import history from '../../history'
import {connect} from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'
import {Link} from 'react-router-dom'

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }
    renderAction(){
        const id = this.props.match.params.id
        return (
            <div>
                <button className="ui button negative" onClick={ ()=>this.props.deleteStream(id) }>Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </div>
        )
    } 

    renderContent(){
        if(!this.props.stream){
            return 'Are you Sure you want to delete this stream'
        }

        return `Are you Sure you want to delete this stream with title ${this.props.stream.title}`
    }
    
    render(){
        return(
            <Modal 
                title="delete Stream"
                content={this.renderContent()}
                actions={this.renderAction()}
                onDismiss={ ()=> history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)