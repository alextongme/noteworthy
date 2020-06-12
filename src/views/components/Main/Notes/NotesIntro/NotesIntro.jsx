import React from "react";
import * as ComUtil from '../../../utils/utils';

import { useSelector } from "react-redux";

const NotesIntro = () => {
    const users = useSelector(state => Object.values(state.entities.users));
    let firstName = "";
    
    // debugger
    if(users[0].first_name !== "") {
        firstName = users[0].first_name;
    }

    // debugger
    return (
        <div className="notesIntro">
            <section className="notesIntro__welcome">
                <h1 className="notesIntro__h1">Hello {firstName}! 
                </h1>
                <h2 className="notesIntro__h2">Choose a note or make a new one...</h2>
            </section>

        </div>
    );
}

export default NotesIntro;