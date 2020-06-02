import React from 'react';
import NotesNav from './NotesNav/NotesNav';
import NoteEditorContainer from './NoteEditor/NoteEditorContainer';
import { PrivateRoute } from '../../../../state/util/route';
// import NotebookItem from './components/NotebookItem/NotebookItem';

class Notes extends React.Component {
    componentDidMount() {
        this.props.fetchNotes();
        this.props.fetchNotebooks();
    }

    render() {
        return (
            <div className="notes">
                <NotesNav notes={this.props.notes} />
                {/* <NoteEditor notes={this.props.notes} /> */}
                <PrivateRoute path="/main/notes/:noteId/edit" component={NoteEditorContainer} />
                {/* <NoteEditorContainer /> */}
                
            </div>
        );
    }
};

export default Notes;