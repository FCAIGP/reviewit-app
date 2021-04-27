import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';
import BootstrapNav from './components/BootstrapNav';
import CompanyPages from './components/CompanyPages';
import CompanyDetails from './components/CompanyDetails'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
        <BootstrapNav/>
        <div>
          <Switch>
            <Route exact path="/company" component={CompanyPages}></Route>
            <Route path="/company/:companyId" component={CompanyDetails}></Route>
          </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
