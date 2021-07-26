import { FC, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, CreatePost, Login, Signup } from './pages';
import './App.css';
import { useAction } from './hooks/useAction';
import { PrivateRoute } from './components/PrivateRoute';
import { useTypeSelector } from './hooks/useTypeSelector';
import { Progress } from './components/Progress';

/*
Add hooks
Add components
Add global styles
Think about /services
Signup, signin with firebase
Create /pages
Create routes.tsx
Add /types
Add post
Think about like and comments
Add redux
Add redux-thunk
*/

const App: FC = () => {

  const { initAuthAction } = useAction();
  const { isLoaded } = useTypeSelector(state => state.user);

  useEffect(() => {
    initAuthAction();
  }, []);

  return (
    !isLoaded ?
      <Progress />
      :
      (<BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/create_post" component={CreatePost} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="*">
            404 not found
          </Route>
        </Switch>
      </BrowserRouter>)
  );
}

export { App };
