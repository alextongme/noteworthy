import React from "react";
import ReactQuill, {Quill} from 'react-quill';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        if(props.note) {
            this.state = props.note;
        }
        this.handleQuillChange = this.handleQuillChange.bind(this);
        // this.showToolbar = this.showToolbar.bind(this);
        this.hideToolbarAndSave = this.hideToolbarAndSave.bind(this);
    }

    handleChange(field) {
        return ((event) => {
            this.setState({
                [field]: event.currentTarget.value
            });
        });
    }

    handleQuillChange(content, delta, source, editor) {
        this.setState({
            body : content
        })
        console.log(editor.getLength())
    }

    showToolbar() {
        document.getElementsByClassName('ql-snow')[0].classList.add('ql-toolbar--show');
    }

    hideToolbarAndSave() {
        this.props.updateNote(this.state);
        document.getElementsByClassName('ql-snow')[0].classList.remove('ql-toolbar--show');
    }

    componentDidMount() {
        if(this.props.note) {
            // this.autosaveInterval = setInterval(() => (this.props.updateNote(this.state)), 20000);
        }

        this.saveOnClose = window.addEventListener('beforeunload', () => this.props.updateNote(this.state));
    }
    
    componentWillUnmount() {
        if(this.props.note) {
            this.props.updateNote(this.state);
            // clearInterval(this.autosaveInterval);
        }
        window.removeEventListener('beforeunload', this.saveOnClose);
    }

    render() {
        const modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                [{ 'color': [] }, { 'background': [] }],
                ['link', 'image'],
                ['clean']
            ],
            };
        
        const formats = [
            'font',
            'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
            'list', 'bullet', 'indent',
            'color', 'background',
            'link', 'image'
        ];
    

        return (
            <div className="noteEditor">
                <header className="noteEditor__header">
                    <h2 className="universal__h2 noteEditor__h2--header" >
                    <i className="fas fa-book noteEditor__icons" />&nbsp;{this.props.notebookName}</h2>
                    {/* <i className="fas fa-running noteEditor__button--action" /> */}
                    <i className="fas fa-trash-alt noteEditor__button--action" onClick={() => this.props.deleteNote(this.props.note.id)}/>
                </header>

                <input
                    type='text'
                    className="universal__h2 noteEditor__input--title" 
                    value={this.state.title} 
                    onChange={this.handleChange('title')}
                    placeholder="Untitled"
                    onBlur={() => this.hideToolbarAndSave() }
                    onFocus={() => this.showToolbar()}
                />

                <div 
                    className="noteEditor__quillContainer" 
                    onBlur={() => this.hideToolbarAndSave() } 
                    onFocus={() => this.showToolbar()}>
                    <ReactQuill 
                        // className="noteEditor__quill" 
                        theme="snow"
                        value={this.state.body} 
                        onChange={this.handleQuillChange}
                        placeholder={"Start your note..."}
                        modules={modules}
                        formats={formats} />
                    
                </div>

                <section className="noteEditor__footer">
                    <a href='http://www.tongsalex.com' className ="noteEditor__link--personalWeb">
                        aT
                    </a>
                    <a href='http://www.github.com/tongsalex'>
                        <img src={window.github} alt='github' className="noteEditor__button" />
                    </a>
                    <a href='http://www.linkedin.com/in/tongsalex'>
                        <img src={window.linkedin} alt='linkedin' className="noteEditor__button" />
                    </a>
                </section>

            </div>
        
        );
    }
}

export default NoteEditor;