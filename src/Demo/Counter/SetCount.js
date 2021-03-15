import React from 'react'
import Increment from './Increment'
import Decrement from './Decrement'

function SetCount(props) {
    return (
        <div>
            <Increment />
            <Decrement />
        </div>
    )
}
export default SetCount