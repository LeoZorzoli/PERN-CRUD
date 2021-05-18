import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import { useDispatch } from 'react-redux';
import { getTurns } from './reducers/turnsReducer';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getTurns());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  )
}

export default App;
