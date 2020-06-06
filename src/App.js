import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import City from './Pages/City';
import Tag from './Pages/Tag';
import PostDetails from './Pages/PostDetails';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:city" component={City} />
              <Route exact path="/:city/:tag" component={Tag} />
              <Route exact path="/:city/:tag/:post_id" component={PostDetails} />
            </Switch>
          </div>
        </Router>
      </>
    )
  }
}

export default App;

