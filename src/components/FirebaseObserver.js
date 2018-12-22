import { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import actions, { logout } from '../actions'

class FirebaseObserver extends Component {

    componentDidMount = () => {
        const { login } = this.props
        this.unsubsribe = auth.onAuthStateChanged(function(user) {
            if (user) {
                login(user)
            } else {
                logout()
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
    login: (user) => dispatch({ type: actions.LOGIN_SUCCEEDED, payload: user }),
    logout: () => dispatch({ type: actions.LOGOUT_SUCCEEDED }),
})

export default connect(null, mapDispatchToProps)(FirebaseObserver)
