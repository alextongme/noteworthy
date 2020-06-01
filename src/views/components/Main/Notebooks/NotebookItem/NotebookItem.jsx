import React from "react";
import { Switch, NavLink, Link } from 'react-router-dom';

const NotebookItem = ({ idx, notebook }) => {
    const timestamp = notebook.updated_at;
    const time = () => {
        return (<td>
            {timestamp.slice(5, 7)}-{timestamp.slice(8, 10)}-{timestamp.slice(0, 4)}
        </td>);
    };

    return (
        <tr className="notebookNavItem" idx={idx}>
            <td>{idx}</td>
            <td>
                {/* <Switch> */}
                    <Link to={`/main/notebooks/${notebook.id}/edit`}>{notebook.name}</Link>
                {/* </Switch> */}
            
            </td>
            {time()}
            {/* <td>{notebook.created_at}</td> */}
            {/* <td>{notebook.updated_at}</td> */}
        </tr>
    );
}

export default NotebookItem;