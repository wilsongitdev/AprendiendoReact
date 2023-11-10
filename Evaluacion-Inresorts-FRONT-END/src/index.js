import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainHeader from './Common/MainHeader';
import MainFooter from './Common/MainFooter';

ReactDOM.render(
  <React.StrictMode>
    
    <Router basename='/'>
      <MainHeader/>
      <main id='main-content'>
        <Route exact path='/' component={App}/>   
      </main>
      <MainFooter/>
    </Router>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
