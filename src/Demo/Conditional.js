import React, { Component } from 'react';
import styles from './styles.module.css';

class Conditional extends Component {
    state = {
        text1: 'Good Morning',
        text2: 'Good Bye',
        showFirst: true,
        name: 'Aren',
        showName: true
    };

    toggle = () => {
        this.setState({
            showFirst: !this.state.showFirst
        });
    };
    toggleName = () => {
        this.setState({
            showName: !this.state.showName
        })
    }

    render() {
        const { text1, text2, showFirst, name, showName } = this.state;

        return (
            <div className={styles.block}>
                { showFirst ?
                    <h2>{text1}</h2> :
                    <h2>{text2}</h2>
                }
                <button
                    onClick={this.toggle}
                >
                    Toggle
                </button>

                <button
                    onClick={this.toggleName}
                >
                    {
                        showName ? 'Show Name' : 'Hide Name'
                    }
                </button>
                {
                    showName && <h1>{name}</h1> 
                }
            </div>
        )
    }
}
