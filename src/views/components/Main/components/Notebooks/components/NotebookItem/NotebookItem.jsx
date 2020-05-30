import React from "react";

const NotebookItem = ({ id, notebook }) => {
    return (
        <tr className="notebookNavItem" id={id}>
            <td>{notebook.name}</td>
            <td>{notebook.name}</td>
            {/* {console.log(notebook)}; */}
        </tr>
    );
}

export default NotebookItem;