import React from "react";

import Modal from './Modal/Modal'
import NotebooksContainer from './Notebooks/NotebooksContainer'
import NotesContainer from "./Notes/NotesContainer";
import SidebarContainer from "./Sidebar/SidebarContainer";

import { PrivateRoute } from '../../../state/util/route';

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchNotes();
        this.props.fetchNotebooks();
    }

    render() {
        return (
            <div className="main">
                <Modal />
                <SidebarContainer />
                <PrivateRoute 
                    path='/main/notebooks' 
                    component={NotebooksContainer}
                />
                <PrivateRoute 
                    path='/main/notebooks/:notebookId/notes' 
                    component={NotesContainer}
                />
                <PrivateRoute 
                    path='/main/notes' 
                    component={NotesContainer}
                />
        </div>
        );
    }
};

export default Main;