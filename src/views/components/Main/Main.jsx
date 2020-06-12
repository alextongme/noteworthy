import React from "react";

import Modal from './Modal/Modal';
import SidebarContainer from "./Sidebar/SidebarContainer";
import Notebooks from './Notebooks/Notebooks';

import NotesNav from "./Notes/NotesNav/NotesNav";
import NotesIntro from "./Notes/NotesIntro/NotesIntro";
import NoteEditorContainer from "./Notes/NoteEditor/NoteEditorContainer";

import Tags from './Tags/Tags'

import { PrivateRoute } from '../../../state/util/route';
// import { Redirect, useHistory } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // debugger
        this.props.fetchNotes();
        this.props.fetchNotebooks();
    }

    render() {

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
                    component={NotesNav}
                />
                <PrivateRoute 
                    exact path='/main/notebooks/:notebookId/notes/:noteId' 
                    component={NoteEditorContainer}
                />

                {/* show all notes nav, and a specific note when clicked */}
                <PrivateRoute 
                    path='/main/notes' 
                    component={NotesNav} />
                
                <PrivateRoute 
                    exact path='/main/notes' 
                    component={NotesIntro} />

                <PrivateRoute
                    exact path='/main/notes/:noteId'
                    component={NoteEditorContainer} />

                {/* show all tags */}
                <PrivateRoute 
                    path='/main/tags' 
                    component={Tags} />
        </div>
        );
    }
};

export default Main;