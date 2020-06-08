import React from "react";
import { NavLink, useHistory, Redirect } from 'react-router-dom';


const Sidebar = ({createNote, session, users, logout, firstNote}) => {
    const currentUser = users[session];
    let history = useHistory();
    
    const firstNoteId = () => {
        // debugger
        if(Object.keys(firstNote).length !== 0) {
            return Object.values(firstNote)[0].id;
        } else {
            return "";
        }
    }

    const note = {
        title: "",
        body: ""
    }

    function toggleSidebar() {
        // firstNote
        // debugger
        document.getElementsByClassName("sidebar")[0].classList.toggle("sidebarClosed");
        // document.getElementsByClassName("notebooks")[0].classList.toggle("notebooksClosed");
        document.getElementsByClassName("notesNav")[0].classList.toggle("notesNavClosed");
    }

    function createNoteAndRedirect() {
        createNote(note).then((obj) => {
            // debugger
            let noteId = obj.note.id;
            return (history.push(`/main/notes/${noteId}`)) });
  
    }

    return (
        <div className="sidebar">
            <ul className="sidebar__listContainer">
                <div className="sidebar__userContainer" onClick={() => (null)}>
                    <i className="fas fa-user-circle sidebar__userLogo" />
                    <h1 
                        className="sidebar__username">
                        {currentUser.first_name} {currentUser.last_name}
                    </h1>
                    <i 
                        className="fas fa-chevron-circle-down chevron-down--sidebar"></i>
                </div>
                {/* search input bar */}

                {/* <input 
                    className="sidebar__search" 
                    placeholder="search not functional" 
                /> */}
                    <div 
                        className="sidebar__addContainer"
                        onClick={() => createNoteAndRedirect()}>
                        <img 
                            src={window.addButton} className="sidebar__button--add sidebar__icons" />
                        <h1 
                            className="sidebar__add">
                            New note
                        </h1>
                    </div>
                <NavLink 
                    to="/main/notebooks" 
                    className="sidebar__navlink"
                    activeClassName="sidebar__navlink--active">
                    <i className="fas fa-book sidebar__icons"></i>
                    Notebooks
                </NavLink>
                <NavLink
                    // to={`/main/notes/${firstNoteId()}`}
                    to={`/main/notes`}
                    className="sidebar__navlink" 
                    activeClassName="sidebar__navlink--active">
                    <i className="fas fa-sticky-note sidebar__icons" /> 
                    Notes
                    {/* <Redirect to={`/main/notes/${firstNoteId()}`} /> */}
                </NavLink>
            </ul>

            <li className="sidebar__navlink">
                <button 
                    onClick={logout} 
                    className="sidebar__button--logout">
                    Logout
                </button>
            </li>
            <li className="sidebar__navlink">
                <button onClick={toggleSidebar} className="universal__button">
                    Close
                </button>
            </li>
        </div>
    );
}

export default Sidebar;