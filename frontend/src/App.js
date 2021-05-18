import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Table from './components/Table';
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
        <Route exact path="/" component={Table} />
        <Route path="/new" />
      </Switch>
    </Router>
  )
}

export default App;
