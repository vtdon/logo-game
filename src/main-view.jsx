import React from 'react';
import './App.css';
import { LogoGamePlayView } from './game-view';

export class LogoGameMainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameSubmitted: false,
        }

        this.setUsername = this.setUsername.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
    }

    componentDidMount() {
        this.usernameInput.focus();
    }

    setUsername(event) {
        this.setState({ 
            username: event.target.value
        })
    }

    onSubmitName() {
        this.setState({ 
            usernameSubmitted: true
        })
    }

    render() {
        return (
            <div className="mainPage">
                {!this.state.usernameSubmitted ? (          
                    <div className="mainPage">
                        <div className="welcomeText">
                            Hello friend, tell me your name...
                        </div>

                        <input
                            type="text"
                            className="input1"
                            placeholder="Your name here"
                            onChange={this.setUsername}
                            ref={(input) => { this.usernameInput = input; }}
                        />
                        
                        <button 
                            className="button1"
                            type="button"
                            onClick={this.onSubmitName}
                        >
                            <span>Let's go <i className="fas fa-arrow-right"></i></span>
                        </button>
                    </div>
                ) : (
                    <LogoGamePlayView username={this.state.username}></LogoGamePlayView>
                )
                }
            </div>
        )
    }
}