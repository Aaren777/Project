import { Component } from "react";
import React from 'react';

class Name extends React.Component {

    render() {
        const {value} = this.props;
        return(
            <span>{value}</span>
        )
    }
}
export default Name;