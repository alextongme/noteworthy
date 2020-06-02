import React from "react";
import ReactQuill from 'react-quill';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
        };
        this.handleQuillChange = this.handleQuillChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.modules = {
        //     toolbar: [
        //     [{ 'header': [1, 2, false] }],
        //     ['bold', 'italic', 'underline','strike', 'blockquote'],
        //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        //     ['link', 'image'],
        //     ['clean']
        //     ],
        // };
    }

    // handleChange(value) {
    //     return (() => {
    //         this.setState({
    //             text: value,
    //         });
    //     });
    // }

    // const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    // ];

    handleQuillChange(value) {
        this.setState({
            body : value
        });
    }

    render() {
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
                />
            </div>
        );
    }
}

export default NoteEditor;