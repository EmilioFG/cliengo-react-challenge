import React from 'react';

import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';

import './styles.scss';

function App() {
  return (
    <div className="app layout">
      <aside>
        <header> <div className="logo"/> </header>
        <nav>
          <ul>
            <li>
              <NavLink to="/users" activeClassName="active">Users</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <Switch>
          <Route exact path="/" component={UserList}/>
          <Route exact path="/users" component={UserList}/>
          <Route exact path="/users/c" component={UserForm} />
          <Route exact path="/users/u/:id" component={UserForm} />
          <Route path="*">
            <Redirect to="/users" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default React.memo(App);
