import React from 'react';
import NotesNav from './NotesNav/NotesNav';
import NoteEditor from './NoteEditor/NoteEditor';
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
                <NoteEditor notes={this.props.notes} />
                {/* <PrivateRoute exact path='/main/notes/1/edit' component={NoteEditor}/> */}
            </div>
        );
    }
};

export default Notes;