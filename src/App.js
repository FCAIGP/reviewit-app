import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import React, {Component} from 'react';
import ReviewItNavbar from './components/ReviewItNavbar';
import CompanyPages from './components/CompanyPages';
import CompanyDetails from './components/CompanyDetails'
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <ReviewItNavbar/>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/company" component={CompanyPages}/>
                            <Route path="/company/:companyId" component={CompanyDetails}/>
                            <Route path="/profile/:userId" component={UserProfile}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
