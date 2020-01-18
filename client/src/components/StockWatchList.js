import React, { Component } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default class StockWatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [
        { name: "Facebook", price: 435.67 },
        { name: "Amazon", price: 56.91 },
        { name: "Apple", price: 143.04 },
        { name: "Netflix", price: 23.45 },
        { name: "Google", price: 893.53 },
        { name: "Facebook", price: 435.67 },
        { name: "Amazon", price: 56.91 },
        { name: "Apple", price: 143.04 },
        { name: "Netflix", price: 23.45 },
        { name: "Google", price: 893.53 },
        { name: "Facebook", price: 435.67 },
        { name: "Amazon", price: 56.91 },
        { name: "Apple", price: 143.04 },
        { name: "Netflix", price: 23.45 },
        { name: "Google", price: 893.53 }
      ]
    };
  }

  render() {
    const { stocks } = this.state;
    return (
      <div className="stockWatchListContainer">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map(({ name, price }) => (
                <TableRow>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell align="right">${price}</TableCell>
                  <TableCell align="right">
                    <Button
                      key={name}
                      onClick={() => {
                        this.setState(state => ({
                          stocks: state.stocks.filter(
                            stock => stock.name !== name
                          )
                        }));
                      }}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
