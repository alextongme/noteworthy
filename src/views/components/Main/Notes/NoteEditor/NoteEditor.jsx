import React from "react";
import ReactQuill from 'react-quill';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = props.note;
        // debugger
        this.handleQuillChange = this.handleQuillChange.bind(this);
       
    }

    handleQuillChange(value) {
        this.setState({
            body : value
        })
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
            <div className="noteEditor">
                <header>
                    <section>
                        <h1>Notebook Title</h1>
                    </section>
                    <section>
                        shared with who?, hamburger menu
                    </section>
                </header>
                <ReactQuill 
                    className="noteEditor__quill" 
                    theme="snow" 
                    value={this.state.body} 
                    onChange={this.handleQuillChange}
                    placeholder={"Start your note..."}
                    modules={modules}
                    formats={formats}
                />
            </div>
        );
    }
}

export default NoteEditor;