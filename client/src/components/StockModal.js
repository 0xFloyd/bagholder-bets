import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { addStock } from '../actions/stockActions';



  
class StockModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            name: '',
            price: '',
            quantity: ''
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const newStock = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
        }

        // Add item via AddStock redux action
        this.props.addStock(newStock);

        this.toggle();
    } 

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" onClick={this.toggle}  onClose={this.toggle}>Modal</Button>
                <Dialog open={this.state.isOpen} onClose={this.toggle} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                    <form onSubmit={this.onSubmit}>
                        <TextField fullWidth onChange={this.onChange} name="name" id="name" label="Name" />
                        <TextField fullWidth onChange={this.onChange} name="price" id="price" label="Price" />
                        <TextField fullWidth onChange={this.onChange} name="quantity" id="quantity" label="Quantity" />
                        <br></br>
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stock: state.stock
});

export default connect(mapStateToProps, { addStock })(StockModal);