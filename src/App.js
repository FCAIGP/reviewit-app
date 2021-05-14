import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import React, {Component} from 'react';
import ReviewItNavbar from './components/ReviewItNavbar';
import CompanyPages from './components/CompanyPages';
import CompanyDetails from './components/CompanyDetails'
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import ClaimRequestList from "./components/ClaimRequestList";
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {handleRenewToken} from './actions/authedUser';
import UpdatePost from './components/UpdatePost';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleRenewToken());
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <ReviewItNavbar/>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/company" component={CompanyPages}/>
                            <Route exact path="/company/:companyId" component={CompanyDetails}/>
                            <Route path="/company/:companyId/updatePost/:postId" component={UpdatePost}/>
                            <Route path="/profile/:userId" component={UserProfile}/>
                            <Route exact path="/claimrequest" component={ClaimRequestList}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect()(App);
