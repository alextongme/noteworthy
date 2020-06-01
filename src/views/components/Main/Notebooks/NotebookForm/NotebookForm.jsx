import React from 'react';

class NotebookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const notebook = Object.assign({}, this.state);
        // formData.append('notebook[name]', this.state.name);
        // debugger
        // const notebook = {
        //     notebook: {
        //         name: "hello"
        //     }
        // }

        this.props.createNotebook(notebook);
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                    </label>
                        <input type="text" value={this.state.name} onChange ={this.handleChange('name')} className="notebookForm__input" placeholder="notebook name">
                    </input>

                    <input
                        type="submit"
                        value="create new notebook"
                        className="notebookForm__button--submit"
                     />
                </form>
            </div>
        );
    }
};

export default NotebookForm;