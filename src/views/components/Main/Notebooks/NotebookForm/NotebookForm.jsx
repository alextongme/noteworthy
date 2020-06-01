import React from 'react';

class NotebookForm extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = props.notebook;
        // debugger

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // debugger
        event.preventDefault();
        const notebook = Object.assign({}, this.state);

        this.props.action(notebook);
    }

    handleChange(field) {
        return ((event) => {
            this.setState({
                [field]: event.currentTarget.value
            });
        });
    }
    
    render() {
        return (
            <div className="notebookForm">
                {this.props.formType}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                    </label>
                        <input type="text" value={this.state.name} onChange ={this.handleChange('name')} className="notebookForm__input" placeholder="notebook name" />

                    <button type="submit"
                        className="notebookForm__button--submit"
                        >{this.props.formType}</button>
                </form>
            </div>
        );
    }
};

export default NotebookForm;