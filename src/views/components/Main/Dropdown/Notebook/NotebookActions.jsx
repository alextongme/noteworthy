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
            
            </div>
        );
    }
};

export default NotebookActions;