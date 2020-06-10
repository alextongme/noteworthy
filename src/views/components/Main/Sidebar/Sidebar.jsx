import React from "react";
import { NavLink, useHistory, Redirect } from 'react-router-dom';

const Sidebar = ({createNote, session, users, logout, firstNote, openTags}) => {
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
        if(document.getElementsByClassName("main")[0].style.gridTemplateColumns === "55px 500px auto") {
            // document.getElementsByClassName("sidebar")[0].classList.toggle("sidebarClosed");
            document.getElementsByClassName("main")[0].style.gridTemplateColumns = "250px 500px auto";
        } else {
            // document.getElementsByClassName("sidebar")[0].classList.toggle("sidebarClosed");

            document.getElementsByClassName("main")[0].style.gridTemplateColumns = "55px 500px auto";
            
        }
        // document.getElementsByClassName("notebooks")[0].classList.toggle("notebooksClosed");
        // if(document.getElementsByClassName("notesNav").length !== 0) {
        //     document.getElementsByClassName("notesNav")[0].classList.toggle("notesNavClosed");
        // } else {
        //     document.getElementsByClassName("notebooks")[0].classList.toggle("notebooksClosed");
        // }
    }

    function createNoteAndRedirect() {
        createNote(note).then((obj) => {
            // debugger
            let noteId = obj.note.id;
            return (history.push(`/main/notes/${noteId}`)) });
  
    }

    return (
        <div className="sidebar">
            {/* <ul className="sidebar__listContainer"> */}
                <div className="sidebar__navlink" onClick={() => (null)}>
                    <i className="fas fa-user-circle sidebar__icons" />
                    <h3 
                        className="sidebar__titles">
                        {currentUser.first_name} {currentUser.last_name}
                    </h3>
                    {/* <i className="fas fa-chevron-circle-down chevron-down--sidebar" /> */}
                </div>
                {/* search input bar */}

                {/* <input 
                    className="sidebar__search" 
                    placeholder="search not functional" 
                /> */}
                <div 
                    className="sidebar__navlink"
                    onClick={() => createNoteAndRedirect()}>
                    <i className="far fa-edit sidebar__icons"></i>
                    {/* <h1  */}
                        {/* // className="sidebar__add"> */}
                        <h3 className="sidebar__titles">New notes</h3>
                    {/* </h1> */}
                </div>
                <NavLink 
                    to="/main/notebooks" 
                    className="sidebar__navlink"
                    activeClassName="sidebar__navlink--active">
                    <i className="fas fa-book sidebar__icons"></i>
                    <h3 className="sidebar__titles">Notebooks</h3>
                </NavLink>
                <NavLink
                    to={`/main/notes/${firstNoteId()}`}
                    // to={`/main/notes`}
                    className="sidebar__navlink" 
                    activeClassName="sidebar__navlink--active">

                    <i className="fas fa-sticky-note sidebar__icons" /> 
                    <h3 className="sidebar__titles">Notes</h3>
                    {/* <Redirect to={`/main/notes/${firstNoteId()}`} /> */}
                </NavLink>

            <li className="sidebar__navlink" onClick={() => openTags()}>
                <i class="fas fa-tags sidebar__icons"></i>
                <h3 className="sidebar__titles">Tags</h3>
            </li>

            <li className="sidebar__navlink" onClick={logout}>
                <i className="fas fa-sign-out-alt sidebar__icons" />
                <h3 className="sidebar__titles">Logout</h3>
            </li>

            <li className="sidebar__navlink sidebar__navlink--expand" onClick={toggleSidebar} >
                <i className="fas fa-arrows-alt-h sidebar__icons" ></i>
            </li>
        </div>
    );
}

export default Sidebar;