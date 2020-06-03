import React from 'react';
import NotesNav from './NotesNav/NotesNav';
import NoteEditorContainer from './NoteEditor/NoteEditorContainer';
import { PrivateRoute } from '../../../../state/util/route';
import {Route} from 'react-router-dom';
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
                <PrivateRoute exact path="/main/notes/:noteId/edit" component={NoteEditorContainer} />
            </div>
        );
    }
};

export default Notes;