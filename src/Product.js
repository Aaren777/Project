import React, {Component} from 'react';

class Product extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return(
            <div>
                <p>Product name = {this.props.name}</p>
                <p>Price = {this.props.price}</p>
                <p>Description = {this.props.description}</p>
            </div> 
             )
        }
}


export default Product