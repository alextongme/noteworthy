import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <ul>
                {this.props.errors.map((error, idx) => {
                    return (
                        <li key={idx}>{error}</li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-form-container">
                <form onSubmit={this.handleSubmit}>
                    Please {this.props.formType} or {this.props.navLink}
                    {this.renderErrors()}
                    <label>Email:
                        <input type="text" value={this.state.email} onChange={this.handleChange('email')} />
                    </label>
                    <label>Username:
                        <input type="text" value={this.state.username} onChange={this.handleChange('username')} />
                    </label>
                    <label>Password:
                        <input type="password" value={this.state.password} onChange={this.handleChange('password')} />
                    </label>
                    <input type="submit" value={this.props.formType} />
                </form>
            </div>
        );
    }
}

export default SessionForm;