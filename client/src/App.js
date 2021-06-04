import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Auth from './components/Auth';
import Options from './components/Options';
import ViewAll from './components/ViewAll';
import ViewUser from './components/ViewUser';
import EditName from './components/EditName';
// import EditPassword from './components/EditPassword';
// import EditOu from './components/EditOu';
// import EditDivision from './components/EditDivision';
// import EditRole from './components/EditRole';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Route component={Nav}/> */}
        <Switch>
          <Route exact={true} path="/" component={Auth}/>
          <Route exact={true} path="/options" component={Options}/>
          <Route exact={true} path="/viewAll" component={ViewAll}/>
          <Route exact={true} path="/user/:id" component={ViewUser}/>
          <Route exact={true} path="/edit/name" component={EditName}/>
          {/* <Route exact={true} path="/edit/name" render={(props) => <EditName {...props}/>}/> */}
          {/* <Route path="/test/new" render={(props) => <NewTestComp {...props}/>}/> */}
          {/* <Route exact={true} path="/edit/password" component={EditPassword}/>
          <Route exact={true} path="/edit/ou" component={EditOu}/>
          <Route exact={true} path="/edit/division" component={EditDivision}/>
          <Route exact={true} path="/edit/role" component={EditRole}/> */}



        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
