import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Auth from './components/Auth';
import Options from './components/Options';
import ViewAll from './components/ViewAll';
import ViewUser from './components/ViewUser';

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



        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
