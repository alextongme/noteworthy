import React from "react";
import ReactQuill from 'react-quill';
import {NavLink} from 'react-router-dom';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        if(props.note) {
            this.state = {
                id: null,
                title: "",
                body: "",
                name: ""
            }
        }
        this.length = "Loading...";
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.hideToolbarAndSave = this.hideToolbarAndSave.bind(this);
        this.trash = this.trash.bind(this);
        this.handleTagSubmit = this.handleTagSubmit.bind(this);
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
        this.length = editor.getLength();
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
        // set the note
        this.setState({
            id: this.props.note.id,
            title: this.props.note.title,
            body: this.props.note.body
        })

        this.saveOnClose = window.addEventListener('beforeunload', () => this.props.updateNote(this.state));
    }
    
    componentWillUnmount() {
        if(this.props.note) {
            // this.props.updateNote(this.state);
        //     // clearInterval(this.autosaveInterval);
        }
        window.removeEventListener('beforeunload', this.saveOnClose);
    }

    componentDidUpdate() {

    }

    trash() {
        this.props.deleteNote(this.props.note.id).then(() => (this.props.history.push('/main/notes') ) );
    }

    handleTagSubmit(event) {
        event.preventDefault();
        let tempTag = {
            name: this.state.name,
            note_id: this.props.noteId
        };
        const tag = Object.assign({}, tempTag);
        this.props.createTag(tag);
        this.setState({
            name: ""
        })
    }

    render() {
        const modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                [{ 'color': [] }, { 'background': [] }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            };
        
        const formats = [
            'font',
            'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
            'list', 'bullet', 'indent',
            'color', 'background',
            'link', 'image', 'video'
        ];
        

        return (
            <div className="noteEditor">
                <header className="noteEditor__header">
                    <div className="noteEditor__header--left">
                        <i className="fas fa-book noteEditor__icons" />
                        <NavLink to={`/main/notebooks/${this.props.notebook.id}/notes`}>
                        <h2 className="universal__h2 noteEditor__h2--header" >
                            {this.props.notebook.name}
                            </h2>
                        </NavLink>
                    </div>
                    <div className="noteEditor__header--right">
                        <i 
                        className="far fa-folder-open noteEditor__button--move" onClick={() => this.props.moveNote()} 
                        />
                       
                        <i className="fas fa-trash-alt noteEditor__button--trash" onClick={this.trash} />
                    </div>
                    
                </header>

                <input
                    type='text'
                    className="universal__h2 noteEditor__input--title" 
                    value={this.state.title} 
                    onChange={this.handleChange('title')}
                    placeholder="Title your note"
                    onBlur={() => this.hideToolbarAndSave() }
                    onFocus={() => this.showToolbar()}
                    maxLength="40"
                />

                <div 
                    className="noteEditor__quillContainer" 
                    onBlur={() => this.hideToolbarAndSave() } 
                    onFocus={() => this.showToolbar()}>
                    <ReactQuill 
                        theme="snow"
                        value={this.state.body} 
                        onChange={this.handleQuillChange}
                        placeholder={"Start your note..."}
                        modules={modules}
                        formats={formats} />
                </div>

                <section className="noteEditor__tags">
                    {this.props.note.tags.map((tag, key) => {
                        return (<div className="universal__h3 noteEditor__link--tags" key={key} >{tag.name}</div>)
                    })}
                    <form onSubmit={this.handleTagSubmit} className="noteEditor__form--tag">
                        <input
                            type="text" 
                            value={this.state.name}
                            onChange ={this.handleChange('name')} className="universal__input" 
                            placeholder="Tag name" />
                    </form>

                </section>

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