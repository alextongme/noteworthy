import React from "react";
import ReactQuill from 'react-quill';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        return (() => {
            this.setState({
                text: value,
            });
        });
    }

    render() {
        return (
            <div className="noteEditor">
                <ReactQuill className="noteEditor__quill" theme="snow" value={this.state.text} onChange={this.handleChange} />
            </div>
        );
    }
}

export default NoteEditor;