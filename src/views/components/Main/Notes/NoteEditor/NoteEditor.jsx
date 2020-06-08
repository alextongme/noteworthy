import React from "react";
import ReactQuill, {Quill} from 'react-quill';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        if(props.note) {
            this.state = props.note;
        }
        this.handleQuillChange = this.handleQuillChange.bind(this);
    }

    handleChange(field) {
        return ((event) => {
            this.setState({
                [field]: event.currentTarget.value
            });
        });
    }

    handleQuillChange(value) {
        this.setState({
            body : value
        })
    }

    componentDidMount() {
        // debugger
        if(this.props.note) {
            this.autosaveInterval = setInterval(() => (this.props.updateNote(this.state)), 20000);
        }

        this.saveOnClose = window.addEventListener('beforeunload', () => this.props.updateNote(this.state));
    }
    
    componentWillUnmount() {
        if(this.props.note) {
            this.props.updateNote(this.state);
            clearInterval(this.autosaveInterval);
        }
        window.removeEventListener('beforeunload', this.saveOnClose);
    }

    render() {
        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
            };
        
        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ];
    

        return (
            <>
            <div className="noteEditor">
                <header className="noteEditor__header">
                        <h2>{this.props.notebookName}</h2>
                    <i className="fas fa-running noteEditor__button--action" />
                </header>
                <input
                    type='text'
                    className="universal__h2 noteEditor__input--title" 
                    value={this.state.title} 
                    onChange={this.handleChange('title')}
                    placeholder="Untitled"
                    onBlur={() => this.props.updateNote(this.state)}
                />
                <div onBlur={() => this.props.updateNote(this.state)} >
                    <ReactQuill 
                        className="noteEditor__quill" 
                        theme="snow" 
                        value={this.state.body} 
                        onChange={this.handleQuillChange}
                        placeholder={"Start your note..."}
                        modules={modules}
                        formats={formats} />
                </div>
            </div>
                {/* <button onClick={() => this.props.updateNote(this.state)}>SAVE</button> */}
            </>
        );
    }
}

export default NoteEditor;