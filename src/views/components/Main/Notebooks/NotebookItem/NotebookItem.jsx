import React from "react";
import { NavLink } from 'react-router-dom';
import NoteItemsContainer from '../NoteItems/NoteItemsContainer'

class NotebookItem extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = {
            expanded: false,
            expandButton: "fas fa-chevron-circle-right chevron-right--notebooks"
        }
        this.cssName = props.cssName;
        // this.idx = props.idx;
        this.notebook = props.notebook;
        // window.currentUser = props.users;
        this.currentUser = Object.values(props.users)[0];
        // debugger
        // window.currentUser1 = this.currentUser;
        // this.expandButton = this.expandButton.bind(this);
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

    ////// changing button showing/hiding notes
    // expandButton() {
    //     if(this.state.expanded == true) {
    //         return (
    //             <i className="fas fa-chevron-circle-down" onClick={this.toggleNoteIndex} />
    //         );
    //     } else {
    //         return (
    //             <i className="fas fa-chevron-circle-right" onClick={this.toggleNoteIndex} />
    //         );
    //     }
    // }

    ////// showing/hiding notes
    noteItems() {
        if(this.state.expanded === true) {
            return (
                <NoteItemsContainer notebook={this.notebook} cssName={this.cssName} />
            );
        }
    }

    toggleNoteIndex(){
        if (this.state.expanded == true){
            this.setState({
                expanded: false,
                expandButton: "fas fa-chevron-circle-right chevron-right--notebooks"
            });
        } else {
            this.setState({
                expanded: true,
                expandButton: "fas fa-chevron-circle-down chevron-down--notebooks"
            });
        }
    }

    render() {
        return (
            <>
                <tr className={this.cssName}>
                    <td
                        className="notebooks__tableCol">
                        <i className={this.state.expandButton} onClick={this.toggleNoteIndex} />
                        <NavLink
                            to={`/main/notebooks/${this.notebook.id}/notes`}
                            className="notebooks__links">
                            {this.notebook.name}
                        </NavLink>
                    </td>

                    <td
                        className="notebooks__tableCol">
                        {this.currentUser.first_name} {this.currentUser.last_name}
                        {/* Alex Tong */}
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
                        {/* <img 
                            src={window.runStationary}
                            onMouseOver={this.src = window.runMoving}
                            onMouseOut={this.src = window.runStationary}/> */}
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