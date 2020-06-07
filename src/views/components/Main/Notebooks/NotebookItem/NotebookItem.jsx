import React from "react";
import { NavLink } from 'react-router-dom';
import NoteItemsContainer from '../NoteItems/NoteItemsContainer';
import DropdownContainer from '../../Dropdown/DropdownContainer';

class NotebookItem extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = {
            expanded: false,
            expandButton: "fas fa-chevron-circle-right chevron-right--notebooks",
            dropdown: false,
            notebook: this.props.notebook
            // state is not being redefined on notebook
        }
        this.cssName = props.cssName;
        // this.state.notebook = props.notebook;
        this.openDropdown = props.openDropdown;
        this.currentUser = Object.values(props.users)[0];

        this.time = this.time.bind(this);
        this.noteItems = this.noteItems.bind(this);
        this.toggleNoteIndex = this.toggleNoteIndex.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleNextDropdown = this.toggleNextDropdown.bind(this);

        // this.dropdownItems = {
        //     edit: "Rename notebook",
        //     delete: "Delete notebook"
        // }
    }

    componentDidUpdate(prevProps) {
        // debugger
        if (this.props.notebook !== prevProps.notebook) {
        
            this.setState({
                notebook: this.props.notebook
            })
          }
    }

    time() {
        const timestamp = this.state.notebook.updated_at;
        return (
            <td
                className="notebooks__tableCol">
                    {timestamp.slice(5, 7)}-{timestamp.slice(8, 10)}-{timestamp.slice(0, 4)}
            </td>);
    }

    ////// showing/hiding notes
    noteItems() {
        if(this.state.expanded === true) {
            return (
                <NoteItemsContainer notebook={this.state.notebook} cssName={this.cssName} />
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
                    // onBlur={() => this.toggleDropdown()}
                    // tabIndex="0"
                    toggleDropdown={this.toggleDropdown}
                    toggleNextDropdown={this.toggleNextDropdown}
                    notebookId={this.state.notebook.id} 
                    // toggleNextDropdown={this.toggleNextDropdown} 

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
            this.props.editNotebookId(this.state.notebook.id);
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
                            to={`/main/notebooks/${this.state.notebook.id}/notes`}
                            className="notebooks__links">
                            {this.state.notebook.name}
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
                            // onBlur={() => this.toggleDropdown()}
                            // tabIndex="0"
                            onClick={this.toggleDropdown} 
                            />
                            {/* onClick={this.toggleDropdown}> */}
                        
                        {this.dropdown()}
                    </td>
                    
                </tr>
                
                {this.noteItems()}
            </>
        )
    }
}

export default NotebookItem;