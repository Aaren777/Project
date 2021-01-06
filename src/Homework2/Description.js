import { Component } from "react";
import React from "react";

class Description extends React.Component{
    render() {
        const {value} = this.props;
        return(
            <span>{value}</span>
        )
    }
}
export default Description;