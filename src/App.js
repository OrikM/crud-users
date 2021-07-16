import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Nav from './components/Nav';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import UserList from './components/UserList';
import AddUser from './components/AddUser'
import User from './components/User';


function App() {
  return (
      <Router >
        <Nav />
        <div className="container mt-3">
          <Switch>
            <Route  exact path={["/", "/users"]}
                    component = { UserList } /> 
            <Route exact path="/add" component={AddUser} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;