import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getStocks, deleteStock } from '../actions/stockActions';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

class StockTable extends Component {
  
  // call api, or making action request, is done as component mounts
  componentDidMount() {
    this.props.getStocks();
  }

  
  
  onDeleteClick = (id) => {
    this.props.deleteStock(id);
  }
  render() {
    //stock represents entire state store. stocks is array of stocks inside
    //this.props.stock.stocks
    
    // this grabs stocks option from state
    const { stocks } = this.props.stock;
    return (
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">quantity</TableCell>
                <TableCell align="right">value</TableCell>
                <TableCell align="right">iD</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map(item => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${Math.round(item.quantity*item.price)}</TableCell>
                  <TableCell align="right">{item._id}</TableCell>
                  <TableCell align="right"><Button onClick={this.onDeleteClick.bind(this, item._id)}>Sell</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
}
}


// when you bring in action from redux (ex: getStocks), it's store as react prop
/*
Reacts propTypes is essentially a dictionary where you define 
what props your component needs and what type(s) they should be.
*/

StockTable.propTypes ={
  getStocks: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired
}


/*
connect takes in the map to the state, and then any actions we used in component, followed by the component 
in the second set of parentheses

mapStateToProps we want to map state into component property, so we can always access it from this.props.< whatever >
*/

// stock is what we used in rootReducer 
const mapStateToProps = state => ({
  stock: state.stock
}) 

// all actions used in component go in second argument after mapStateToProps
export default connect(mapStateToProps, { getStocks, deleteStock })(StockTable);

