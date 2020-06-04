import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginAsDemo = this.loginAsDemo.bind(this);
    }

    handleChange(field) {
        return ((event) => {
            this.setState({
                [field]: event.currentTarget.value
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return (
            <>
                {this.props.errors.map((error, idx) => {
                    return (
                        <p key={idx} className="sessionForm__errors">{error}</p>
                    );
                })}
            </>
        );
    }

    loginAsDemo() {
        const demo = {
            username: 'demo',
            password: '123456',
        };
        this.props.processForm(demo);
    }

    demoButton() {
        if(this.props.formType === "Login") {
            return (
                <button 
                        className="sessionForm__button" 
                        onClick={this.loginAsDemo}
                >
                    Demo
                </button>
            );
        }
    };

    signup() {
        if(this.props.formType === "Signup") {
            return (
                <>
                    <input 
                        type="text" 
                        className="sessionForm__input sessionForm__input--fName" 
                        value={this.state.first_name} 
                        onChange={this.handleChange('first_name')} placeholder="First name" 
                    />
                    <input 
                        type="text" 
                        className="sessionForm__input sessionForm__input--lName" 
                        value={this.state.last_name} 
                        onChange={this.handleChange('last_name')} placeholder="Last name"
                    />
                    <input 
                        type="text" 
                        className="sessionForm__input sessionForm__input--email" 
                        value={this.state.email} 
                        onChange={this.handleChange('email')} placeholder="Email"
                    />
                </>
            );
            
        }
    }


    render() {
        return (
            <div className="sessionForm">
                <section className="sessionForm__section--form">
                    <section className="sessionForm__section--header">
                        <img src={window.nLogo} className="sessionForm__logo" />
                        <h1 className="sessionForm__h1">noteworthy</h1>
                        <h2 className="sessionForm__h2">Never miss a roar.</h2>
                    </section>

                    <form onSubmit={this.handleSubmit} className="sessionForm__form">
                        {/* Please {this.props.formType} or {this.props.navLink} */}
                        {this.signup()}
                        <input 
                            type="text" 
                            className="sessionForm__input sessionForm__input--username" 
                            value={this.state.username} 
                            onChange={this.handleChange('username')} placeholder="Username" 
                        />
                        <input 
                            type="current-password" 
                            className="sessionForm__input sessionForm__input--password" 
                            value={this.state.password} 
                            onChange={this.handleChange('password')} placeholder="Password" 
                        />

                        {this.renderErrors()}

                        <input 
                            type="submit" 
                            className="sessionForm__button" 
                            value={this.props.formType}
                        />
                    </form>

                    {this.demoButton()}

                    <h2 className="sessionForm__h3">
                        Don't have an account?<br/>
                        {this.props.navLink}
                    </h2>
                </section>
            </div>
        );
    }
}

export default SessionForm;