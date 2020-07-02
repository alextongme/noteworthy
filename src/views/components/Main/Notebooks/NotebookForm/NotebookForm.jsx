import React from 'react';

class NotebookForm extends React.Component {
    constructor(props) {
        // debugger
        super(props);
        this.state = props.notebook;

        // this.closeModal = props.closeModal;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // debugger
        event.preventDefault();
        const notebook = Object.assign({}, this.state);
        // debugger
        if(this.props.notebooks) {
            if(this.props.notebooks.length === 0) {
                this.props.action(notebook).then((nb) => {
                    this.props.updateDefaultNotebook(nb.notebook.id);
                })
            } else {
                this.props.action(notebook);
            }
        } else {
            this.props.action(notebook)
        }
        this.props.closeModal();
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
                    <h2 className="universal__h2 notebookForm__h2--header">
                        {this.props.formType}
                    </h2>
                    <i className="fas fa-times-circle" onClick={this.props.closeModal} />
                </div>
                
                <h3 className="universal__h3">
                    Notebooks are useful for grouping notes around a common topic. They can be private or shared.
                </h3>

                <form onSubmit={this.handleSubmit} className="notebookForm__form">
                    <label className="universal__h3 notebookForm__label">
                        Name
                    </label>
                    <br></br>
                        <input 
                            type="text" 
                            value={this.state.name} 
                            onChange ={this.handleChange('name')} className="notebookForm__input universal__input" 
                            placeholder="Notebook name" />
                    <hr></hr>

                    <div className="notebookForm__buttonContainer">
                        <button
                            type="button"
                            className="universal__button notebookForm__button--cancel"
                            onClick={this.props.closeModal}>
                            Cancel
                        </button>

                        <button 
                            type="submit"
                            className="universal__button notebookForm__button--submit">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default NotebookForm;