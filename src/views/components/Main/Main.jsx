import React from "react";

import Modal from './Modal/Modal'
import NotebooksContainer from './Notebooks/NotebooksContainer'
import Notes from "./Notes/Notes";
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
                    exact path='/main/notebooks' 
                    component={NotebooksContainer}
                />

                {/* <PrivateRoute 
                    exact path='/main/notebooks/:notebookId' 
                    component={Notes}
                /> */}

                <PrivateRoute 
                    path='/main/notes' 
                    component={Notes}
                />
        </div>
        );
    }
};

export default Main;