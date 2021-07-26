import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useTypeSelector } from '../hooks/useTypeSelector';

interface PrivateRouteProps {
    component: any,
    exact?: boolean,
    path: string
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {

    const { user } = useTypeSelector(state => state.user);

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                user ? <Component {...routeProps} /> : <Redirect to="/login" />
            }
        />
    )
}
