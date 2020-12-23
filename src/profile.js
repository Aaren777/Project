import React from 'react'

function Name(props) {
    return (
    <span>{props.name}</span>
    )
}

function Surname(props) {
    return (
    <span>{props.surname}</span>
    )
}

function Profile(props) {
    return (
        <div>
            <h2>I am <Name name={props.name}/> <Surname surname={props.surname || 'surname'}/></h2>
            <a href={props.href}>Go to Facebook</a>
        </div>
    )
}
export default Profile

