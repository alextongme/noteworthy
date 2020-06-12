import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { openModal } from '../../../../state/actions/modal';

const Sidebar = ({createNote, session, users, logout, notebooks, updateDefaultNotebook}) => {

    const dispatch = useDispatch();
    const currentUser = users[session];
    let history = useHistory();

    const note = {
        title: "Untitled",
        body: ""
    }

    function toggleSidebar() {
        if(document.getElementsByClassName("main")[0].style.gridTemplateColumns === "65px 500px auto") {
            document.getElementsByClassName("main")[0].style.gridTemplateColumns = "250px 500px auto";
        } else {
            document.getElementsByClassName("main")[0].style.gridTemplateColumns = "65px 500px auto";
            
        }
    }

    function darkMode() {
        if(document.getElementsByClassName("noteEditor")[0] && document.getElementsByClassName("notesNav")[0]) {
            document.getElementsByClassName("noteEditor")[0].classList.toggle("noteEditor--darkMode");
            document.getElementsByClassName("notesNav")[0].classList.toggle("notesNav--darkMode");
        }
    }
    
    function createNoteAndRedirect() {
        createNote(note).then((obj) => {
            // debugger
            let noteId = obj.note.id;
            return (history.push(`/main/notes/${noteId}`)) 
        })
    }

    function defaultNbChange(event) {
        const defaultNbId = parseInt(event.target.value);
        updateDefaultNotebook(defaultNbId);
    }

    function notebookNames() {    
        return notebooks.map((notebook, idx) => {
            return (<option key={idx} value={notebook.id}>{notebook.name}</option>);
        })
    }

    function notebookSelector() {
        if(notebooks === undefined || notebooks.length === 0) {
            history.push(`/main/notes`);
            return (
                <div className="custom__select sidebar__navlink"
                    onClick={() => dispatch(openModal("Create notebook"))}>
                    <i className="fas fa-chalkboard-teacher sidebar__icons" />
                    <h3 className="sidebar__titles">
                        Make a new notebook!
                    </h3>
                </div>);
        } else {

            let names = notebookNames();
             return (
                <>
                    <div className="custom__select sidebar__navlink">
                        <i className="fas fa-chalkboard-teacher sidebar__icons"></i>    
                        <select 
                            name="notebook" 
                            className="sidebar__titles"
                            onChange={defaultNbChange}
                            value={currentUser.default_notebook_id}
                            >
                            <option disabled>Select a default notebook</option>
                            {names}
                        </select>
                    </div>
                    <div 
                            className="sidebar__navlink"
                            onClick={() => createNoteAndRedirect()}>
                            <i className="far fa-edit sidebar__icons"></i>
                            <h3 className="sidebar__titles">New note</h3>
                    </div>
                    <NavLink 
                        to="/main/notebooks" 
                        className="sidebar__navlink"
                        activeClassName="sidebar__navlink--active">
                        <i className="fas fa-book sidebar__icons"></i>
                        <h3 className="sidebar__titles">Notebooks</h3>
                    </NavLink>
                    <NavLink
                        to={`/main/notes`}
                        className="sidebar__navlink" 
                        activeClassName="sidebar__navlink--active">

                        <i className="fas fa-sticky-note sidebar__icons" /> 
                        <h3 className="sidebar__titles">Notes</h3>
                    </NavLink>
                    <NavLink
                        to={`/main/tags`}
                        className="sidebar__navlink" 
                        activeClassName="sidebar__navlink--active">

                        <i className="fas fa-tags sidebar__icons"></i>
                        <h3 className="sidebar__titles">Tags</h3>
                    </NavLink>
                </>);
        }
    }

    return (
        <div className="sidebar">
                <NavLink 
                    to="/home" 
                    className="sidebar__navlink" 
                    activeClassName="sidebar__navlink--active">
                    <img src={window.nLogo} className="sidebar__image--logo" />
                    <h1 
                        className="sidebar__logo">
                        noteworthy
                    </h1>
                </NavLink>

                <div className="sidebar__navlink sidebar__navlink--disable">
                    <i className="fas fa-user-circle sidebar__icons" />
                    <h3 
                        className="sidebar__titles">
                        {currentUser.first_name} {currentUser.last_name}
                    </h3>
                    {/* <i className="fas fa-chevron-circle-down chevron-down--sidebar" /> */}
                </div>

                {/* <div className="sidebar__navlink sidebar__navlink--disable">
                    <i className="fas fa-atlas sidebar__icons" />
                    <h3 className="sidebar__titles">Default notebook</h3>
                </div> */}

                {/* search input bar */}
                {/* <input 
                    className="sidebar__search" 
                    placeholder="search not functional" 
                /> */}
                
                {notebookSelector()}

                

            <li className="sidebar__navlink" onClick={logout}>
                <i className="fas fa-sign-out-alt sidebar__icons" />
                <h3 className="sidebar__titles">Logout</h3>
            </li>

            <li className="sidebar__navlink" onClick={darkMode}>
                <i className="fas fas fa-moon sidebar__icons" />
                <h3 className="sidebar__titles">Dark mode</h3>
            </li>

            <li className="sidebar__navlink sidebar__navlink--expand" onClick={toggleSidebar} >
                <i className="fas fa-arrows-alt-h sidebar__icons" ></i>
            </li>
        </div>
    );
}

export default Sidebar;