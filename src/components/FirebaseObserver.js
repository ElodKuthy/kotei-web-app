import { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import actions from '../actions'

class FirebaseObserver extends Component {

    componentDidMount = () => {
        const { login } = this.props
        this.unsubsribe = auth.onAuthStateChanged(function(user) {
            if (user) {
                login(user)
            } else {
                // TODO: User is signed out
            }
        })
    }

    componentWillUnmount = () => {
        if (this.unsubsribe) {
            this.unsubsribe()
        }
    }

    render () {
        return null
    }
}
  
const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch({ type: actions.LOGIN_SUCCEEDED, payload: user })
})

export default connect(null, mapDispatchToProps)(FirebaseObserver)
