import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, userId, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                userId ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

const mapStateToProps = state => ({
    userId: state.auth.id,
})

export default connect(mapStateToProps)(PrivateRoute)