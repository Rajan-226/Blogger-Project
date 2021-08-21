import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./provider/AuthContext"

export default function PrivateRoute({ wantUser, component: Component, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <>
            {
                wantUser ?
                    <Route
                        {...rest}
                        render={props => {
                            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
                        }}
                    /> :
                    <Route {...rest}
                        render={props => {
                            return currentUser ? <Redirect to="/" /> : <Component {...props} />
                        }}
                    />
            }
        </>
    )
}