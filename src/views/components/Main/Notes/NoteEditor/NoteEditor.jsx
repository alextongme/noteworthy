import React from "react";
import ReactQuill, {Quill} from 'react-quill';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        if(props.note) {
            this.state = props.note;
        }
        this.length = "Loading...";
        this.handleQuillChange = this.handleQuillChange.bind(this);
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
        // debugger
        this.length = editor.getLength();
        // debugger
    }

    showToolbar() {
        document.getElementsByClassName('ql-snow')[0].classList.add('ql-toolbar--show');
        document.getElementsByClassName('footer__characterLength')[0].classList.add('footer__characterLength--show');

        document.getElementsByClassName('noteEditor__button--trash')[0].classList.add('noteEditor__button--trash--show');
    }

    hideToolbarAndSave() {
        this.props.updateNote(this.state);
        document.getElementsByClassName('ql-snow')[0].classList.remove('ql-toolbar--show');
        document.getElementsByClassName('footer__characterLength')[0].classList.remove('footer__characterLength--show');
        document.getElementsByClassName('noteEditor__button--trash')[0].classList.remove('noteEditor__button--trash--show');
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
                    <i className="fas fa-trash-alt noteEditor__button--trash" onClick={() => this.props.deleteNote(this.props.note.id)}/>
                </header>

                <input
                    type='text'
                    className="universal__h2 noteEditor__input--title" 
                    value={this.state.title} 
                    onChange={this.handleChange('title')}
                    placeholder="Untitled"
                    onBlur={() => this.hideToolbarAndSave() }
                    onFocus={() => this.showToolbar()}
                    maxLength="40"
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
                   
                    <h3 className="universal__h3 footer__characterLength">
                    {this.length} / ∞</h3>
                    <div>
                        <a href='http://www.tongsalex.com' className ="noteEditor__link--personalWeb">
                            aT
                        </a>
                        <a href='http://www.github.com/tongsalex'>
                            <img src={window.github} alt='github' className="noteEditor__button" />
                        </a>
                        <a href='http://www.linkedin.com/in/tongsalex'>
                            <img src={window.linkedin} alt='linkedin' className="noteEditor__button" />
                        </a>
                    </div>
                </section>

            </div>
        
        );
    }
}

export default NoteEditor;