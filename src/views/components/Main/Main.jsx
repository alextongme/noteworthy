import React from "react";
import NotebooksContainer from './Notebooks/NotebooksContainer'
import { PrivateRoute } from '../../../state/util/route';
import NotesContainer from "./Notes/NotesContainer";
import SidebarContainer from "./Sidebar/SidebarContainer";

const Main = () => {
    return (
        <div className="main">
            <SidebarContainer />
            
            <PrivateRoute path='/main/notebooks' component={NotebooksContainer}/>
            <PrivateRoute path='/main/notes' component={NotesContainer}/>
        </div>
    );
}

export default Main;