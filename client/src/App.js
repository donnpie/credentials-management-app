import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Auth from './components/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Route component={Nav}/> */}
        <Switch>
          <Route exact={true} path="/" component={Auth}/>


        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
