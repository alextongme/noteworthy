import React from "react";
import { NavLink } from 'react-router-dom';
import NoteItemsContainer from '../NoteItems/NoteItemsContainer';
import DropdownContainer from '../../Dropdown/DropdownContainer';
import * as ComUtil from '../../../utils/utils';

class NotebookItem extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = {
            expanded: false,
            expandButton: "fas fa-chevron-circle-right chevron-right--notebooks",
            dropdown: false,
        }
        this.cssName = props.cssName;
        this.openDropdown = props.openDropdown;
        this.currentUser = Object.values(props.users)[0];

        this.time = this.time.bind(this);
        this.noteItems = this.noteItems.bind(this);
        this.toggleNoteIndex = this.toggleNoteIndex.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleNextDropdown = this.toggleNextDropdown.bind(this);

    }


    time() {
        const timestamp = ComUtil.time(this.props.notebook.updated_at);
        return (
            <td className="notebooks__tableCol">
                {timestamp}
            </td>)
    }

    ////// showing/hiding notes
    noteItems() {
        if(this.state.expanded === true) {
            return (
                <NoteItemsContainer notebook={this.props.notebook} cssName={this.cssName} />
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


    
    ////////////////////////////////////////////////// showing hiding dropdown
    
    toggleNextDropdown(){
        // debugger
        if (this.state.dropdown == true){
            this.setState({
                dropdown: false,
            });
        } else {
            this.setState({
                dropdown: true,
            });
        }
    }
        
    dropdown() {
        if(this.state.dropdown === true) {
            return (
                <DropdownContainer
                    toggleDropdown={this.toggleDropdown}
                    toggleNextDropdown={this.toggleNextDropdown}
                    notebookId={this.props.notebook.id} 

                    />
            );
        }
    }

    toggleDropdown(){
        // debugger
        if (this.state.dropdown == true){
            this.props.editNotebookId(null);
            this.setState({
                dropdown: false,
            });
        } else {
            this.props.editNotebookId(this.props.notebook.id);
            this.setState({
                dropdown: true,
            });
        }
    }

    render() {
        // debugger
        return (
            <>
                <tr className={this.cssName}>
                    <td
                        className="notebooks__tableCol">
                        <i className={this.state.expandButton} onClick={this.toggleNoteIndex} />
                        <NavLink
                            to={`/main/notebooks/${this.props.notebook.id}/notes`}
                            className="notebooks__links">
                            {this.props.notebook.name}
                        </NavLink>
                    </td>

                    <td
                        className="notebooks__tableCol">
                        {this.currentUser.first_name} {this.currentUser.last_name}
                    </td>

                    {this.time()}

                    <td
                        className="notebooks__tableCol">
                        Only you
                    </td>

                    <td
                        className="notebooks__tableCol">
                        <i 
                            className="fas fa-running"
                            onClick={this.toggleDropdown} 
                            />
                        {this.dropdown()}
                    </td>
                </tr>
                
                {this.noteItems()}
            </>
        )
    }
}

export default NotebookItem;