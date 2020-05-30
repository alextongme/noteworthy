import React from "react";
import Sidebar from '../Sidebar/Sidebar';
import NoteEditor from '../NoteEditor/NoteEditor';
import NoteNav from '../NoteNav/NoteNav';
import NotebookNavContainer from '../NotebookNav/NotebookNavContainer'

const Main = () => {
    return (
        <div className="main">
            <Sidebar />
            <NotebookNavContainer />
            <NoteNav />
            <NoteEditor />
        </div>
    );
}

export default Main;