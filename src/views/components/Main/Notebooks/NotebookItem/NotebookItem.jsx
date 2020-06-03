import React from "react";
import { Switch, NavLink, Link } from 'react-router-dom';
import NotebookNoteItems from '../NotebookNoteItems/NotebookNoteItems'

class NotebookItem extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = {
            expanded: false,
        }
        this.cssName = props.cssName;
        this.idx = props.idx;
        this.notebook = props.notebook;

        this.time = this.time.bind(this);
        this.noteItems = this.noteItems.bind(this);
        this.toggleNoteIndex = this.toggleNoteIndex.bind(this);
    }

    time() {
        const timestamp = this.notebook.updated_at;
        return (
            <td
                className="notebooks__tableCol"
            >
                {timestamp.slice(5, 7)}-{timestamp.slice(8, 10)}-{timestamp.slice(0, 4)}
            </td>);
    }

    noteItems() {
        if(this.state.expanded === true) {
            return (
                <NotebookNoteItems />
            );
        }
    }

    toggleNoteIndex(){
        if (this.state.expanded == true){
            this.setState({
                expanded: false
            });
        } else {
            this.setState({
                expanded: true
            });
        }
    }

    render() {
        return (
            <>
                <tr className={this.cssName} idx={this.idx}>
                {/* <td 
                    className="notebooks__tableCol"
                >
                    {idx}
                </td> */}

                    <td
                        className="notebooks__tableCol">
                        <i className="fas fa-chevron-circle-right" onClick={this.toggleNoteIndex} />
                        
                        <Link
                            // to={`/main/notebooks/${notebook.id}/edit`}
                            to={`/main/notes`}
                            className="notebooks__links">
                            {this.notebook.name}
                        </Link>
                    </td>

                    <td
                        className="notebooks__tableCol">
                        Alex Tong
                    </td>

                    {this.time()}

                    <td
                        className="notebooks__tableCol">
                        Only you
                    </td>

                    <td
                        className="notebooks__tableCol">
                        <i 
                            className="fas fa-running"></i>
                    </td>

                {/* <td>{notebook.created_at}</td> */}
                {/* <td>{notebook.updated_at}</td> */}
                </tr>

                {this.noteItems()}
            </>
        )
    }
}

export default NotebookItem;