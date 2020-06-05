import React from 'react';
import NotesNavContainer from './NotesNav/NotesNavContainer';
import NoteEditorContainer from './NoteEditor/NoteEditorContainer';
import { PrivateRoute } from '../../../../state/util/route';
import {Route} from 'react-router-dom';

const Notes = () => {

        return (
            <div className="notes">
                <NotesNavContainer />
                {/* <NoteEditorContainer /> */}
                <PrivateRoute 
                    path="/main/notes/:noteId/edit" 
                    component={NoteEditorContainer} />
            </div>
        );
    }

export default Notes;