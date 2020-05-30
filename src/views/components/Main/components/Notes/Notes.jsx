import React from 'react';
import NotesNav from './components/NotesNav/NotesNav';
import NoteEditor from './components/NoteEditor/NoteEditor';
// import NotebookItem from './components/NotebookItem/NotebookItem';

class Notes extends React.Component {
    componentDidMount() {
        // this.props.fetchNotebooks();
    }
    
    render() {
        return (
            <div className="notes">
                <NotesNav />
                <NoteEditor />
            </div>
        );
    }
};

export default Notes;