import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';
import BootstrapNav from './components/BootstrapNav';
import CompanyPages from './components/CompanyPages';
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
          </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
