import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import AddIssue from './components/AddIssue/AddIssue';
import IssuePage from './components/IssuePage/IssuePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import IssueUpdate from './components/IssueUpdate';
import './App.css';

const App = () => {
  return (
   <Switch>
     <Route exact path='/' component={MainPage}/>
     <Route path='/add-issue' exact component={AddIssue}/>
     <Route path='/issue/:id' exact component={IssuePage}/>
     <Route path='/update-issue/:id' exact component={IssueUpdate}/>
     <Route component={ErrorPage}/>
   </Switch>
  );
}

export default App;
