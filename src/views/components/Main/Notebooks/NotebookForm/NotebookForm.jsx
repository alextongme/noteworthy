import React from 'react';

class NotebookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.notebook;

        // this.closeModal = props.closeModal;
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
                <div className="notebookForm__topContainer">
                    <h3>
                        {this.props.formType}
                    </h3>
                    <i className="fas fa-times-circle" onClick={this.props.closeModal} />
                </div>
                
                <h2>
                    Notebooks are useful for grouping notes around a common topic. They can be private or shared.
                </h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                    </label>
                        <input type="text" value={this.state.name} onChange ={this.handleChange('name')} className="notebookForm__input" placeholder="notebook name" />
                    <hr></hr>
                    <button
                        className="notebookForm__button--submit"
                        // onClick={this.closeModal}>
                    >
                    </button>

                    <button 
                        type="submit"
                        className="notebookForm__button--submit">
                        Continue
                    </button>
                    
                </form>
            </div>
        );
    }
};

export default NotebookForm;