import React from "react";
import NoteEditor from './components/Notes/components/NoteEditor/NoteEditor';
import NoteNav from './components/Notes/components/NotesNav/NotesNav';
import NotebookNavContainer from './components/Notebooks/NotebooksContainer'
import { PrivateRoute } from '../../util/route';
import NotesContainer from "./components/Notes/NotesContainer";
import SidebarContainer from "./components/Sidebar/SidebarContainer";

const Main = () => {
    return (
        <div className="main">
            <SidebarContainer />
            
            <PrivateRoute path='/main/notebooks' component={NotebookNavContainer}/>
            <PrivateRoute path='/main/notes' component={NotesContainer}/>
        </div>
    );
}

export default Main;