import { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import actions, { fetchUserRoles } from '../actions'

class FirebaseObserver extends Component {

    componentDidMount = () => {
        const { login, logout, fetchUserRoles } = this.props
        this.unsubsribe = auth.onAuthStateChanged((user) => {
            if (user) {
                login(user)
                fetchUserRoles(user.uid)
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
    fetchUserRoles: (uid) => dispatch(fetchUserRoles(uid)),
})

export default connect(null, mapDispatchToProps)(FirebaseObserver)
