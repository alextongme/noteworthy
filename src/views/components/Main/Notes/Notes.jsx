import React from 'react';
import NotesNav from './NotesNav/NotesNav';
import NoteEditor from './NoteEditor/NoteEditor';
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