import React from "react";

import Modal from './Modal/Modal';
import Sidebar from "./Sidebar/Sidebar";
import Notebooks from './Notebooks/Notebooks';
import NotebooksIntro from "./Notebooks/NotebooksIntro/NotebooksIntro";

import NotesNav from "./Notes/NotesNav/NotesNav";
import NotesIntro from "./Notes/NotesIntro/NotesIntro";
import NoteEditorContainer from "./Notes/NoteEditor/NoteEditorContainer";

import Tags from './Tags/Tags'

import { PrivateRoute } from '../../../state/util/route';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchNotes();
        this.props.fetchNotebooks();
        this.props.fetchTags();
    }

    render() {

        return (
            <div className="main">
                <Modal />
                {/* <Dropdown /> */}
                <Sidebar />

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
                    exact path='/main/notebooks/:notebookId/notes' 
                    component={NotebooksIntro}
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
                    exact path='/main/tags' 
                    component={Tags} />

                {/* show all notes associated with tags */}
                <PrivateRoute
                    path='/main/tags/:tagId/notes' 
                    component={NotesNav}
                />
                <PrivateRoute 
                    exact path='/main/tags/:tagId/notes/:noteId' 
                    component={NoteEditorContainer}
                />
        </div>
        );
    }
};

export default Main;