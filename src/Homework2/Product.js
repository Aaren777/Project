import React, {Component} from 'react';
import Name from './Name.js';
import Price from './Price.js';
import Description from "./Description.js";

class Product extends Component {

    
    render() {
        const {name, price, description} = this.props;
        return(
            <>
                <Name value= {name}/>
                <Price value= {price}/>
                <Description value= {description}/>
            </> 
             )
        };
}


export default Product