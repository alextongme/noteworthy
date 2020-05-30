import React from "react";
import { Link } from 'react-router-dom';

const NotebookNavItem = ({ id, notebook }) => {
    return (
        <div className="notebookNavItem" id={id}>
            <h1>{notebook.name}</h1>
        </div>
    );
}

export default NotebookNavItem;