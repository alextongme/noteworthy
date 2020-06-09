import React from "react";

import Modal from './Modal/Modal';
import SidebarContainer from "./Sidebar/SidebarContainer";
import Notebooks from './Notebooks/Notebooks';
import NotesNavContainer from "./Notes/NotesNav/NotesNavContainer";
import NoteEditorContainer from "./Notes/NoteEditor/NoteEditorContainer";

import { PrivateRoute } from '../../../state/util/route';
// import { Redirect, useHistory } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        // this.history = useHistory();
    }

    componentDidMount() {
        this.props.fetchNotes();
        this.props.fetchNotebooks();
    }

    // firstNoteId () {
    //     // debugger
    //     if(Object.keys(this.props.notes).length !== 0) {
    //         return Object.values(this.props.notes)[0].id;
    //     } else {
    //         return "1";
    //     }
    // }

    render() {
        // debugger
        // let firstNote = this.props.notes[0].id;

        const loginRoute = () => {
            if(Object.keys(this.props.notes).length !== 0) {
                return (<PrivateRoute 
                    path='/main/notes' 
                    component={NotesNavContainer} />);
            } else {
                return (<PrivateRoute 
                    path='/main/notes' 
                    component={NotesNavContainer} />);
            }
        }

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
                    path='/main/notebooks/:notebookId/notes' 
                    component={NotesNavContainer}
                />
                <PrivateRoute 
                    exact path='/main/notebooks/:notebookId/notes/:noteId' 
                    component={NoteEditorContainer}
                />

                {/* show all notes nav, and a specific note when clicked */}
                <PrivateRoute 
                    path='/main/notes' 
                    component={NotesNavContainer} />
                <PrivateRoute
                    exact path='/main/notes/:noteId'
                    component={NoteEditorContainer} />
        </div>
        );
    }
};

export default Main;