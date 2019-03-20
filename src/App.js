import React, { Component } from 'react';
import style from './App.scss';
import jetImg from './assets/jet.jpg';
import Header from './Header';
import Landing from './Landing';
import Contact from './Contact';
import QuoteForm from './QuoteForm';
import { Route, Switch } from 'react-router-dom';
import { PATHS } from './constants';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="cover-img" src={jetImg}/>
        <div className="app-content">
          <Switch>
            <Route exact path={ PATHS.CONTACT } component={ Contact } />
            <Route exact path={ PATHS.QUOTE } component={ QuoteForm } />
            <Route component={ Landing } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
