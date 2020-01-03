import React from 'react';
import './App.css';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppNavBar from './components/AppNavbar'
import StockTable from './components/StockTable';
import StockWatchList from './components/StockWatchList';
import StockModal from './components/StockModal';


import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar></AppNavBar>
        <br></br>
        <div className="appBody">
          <Grid container>
            <Grid item xs={12}>
              <StockTable/>
            </Grid>
            <Grid item xs={12}>
              <StockModal/>
            </Grid>
          </Grid> 
        </div>
      </div>
    </Provider>
  );
}

export default App;
