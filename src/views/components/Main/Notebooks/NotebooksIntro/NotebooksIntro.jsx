import React from "react";
import { useSelector } from "react-redux";
import {useRouteMatch} from 'react-router-dom';

const NotebooksIntro = () => {
    const notebooks = useSelector(state => state.entities.notebooks);
    const match = useRouteMatch();
    let notebook = notebooks[match.params.notebookId];
    let notebookName = "";
    if(notebook) {
        notebookName = notebook.name;
    }
    return (
        <div className="notebooksIntro">
                <h1 className="notebooksIntro__h1">{notebookName}</h1>
        </div>
    );
}

export default NotebooksIntro;