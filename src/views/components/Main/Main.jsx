import React from "react";

import Modal from './Modal/Modal';
import Dropdown from './Dropdown/Dropdown';
import SidebarContainer from "./Sidebar/SidebarContainer";
import Notebooks from './Notebooks/Notebooks';
import NotesNavContainer from "./Notes/NotesNav/NotesNavContainer";
import NoteEditorContainer from "./Notes/NoteEditor/NoteEditorContainer";

import { PrivateRoute } from '../../../state/util/route';

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchNotes();
        this.props.fetchNotebooks();
    }

    render() {
        // debugger
        // let firstNote = this.props.notes[0].id;
        return (
            <div className="main">
                <Modal />
                {/* <Dropdown /> */}
                <SidebarContainer />

                {/* just notebooks */}
                <PrivateRoute 
                    exact path='/main/notebooks' 
                    component={Notebooks}
                />

                {/* show all notes this notebook contains */}
                <PrivateRoute 
                    exact path='/main/notebooks/:notebookId/notes' 
                    component={NotesNavContainer}
                />
                <PrivateRoute 
                    exact path='/main/notebooks/:notebookId/notes/:noteId' 
                    component={NoteEditorContainer}
                />

                {/* show all notes */}
                <PrivateRoute 
                    path='/main/notes' 
                    component={NotesNavContainer}>
                    {/* <Redirect to={`/main/notes/${firstNote}`} /> */}
                </PrivateRoute>
                {/* <PrivateRoute 
                    exact path='/main/notes' 
                    component={NoteEditorContainer}
                /> */}

                {/* show a specific note */}
                <PrivateRoute
                    exact path='/main/notes/:noteId'
                    component={NoteEditorContainer}
                />
        </div>
        );
    }
};

export default Main;