import {
    RECEIVE_TAGS,
    RECEIVE_TAG,
    REMOVE_TAG
} from "../actions/tag";

import {
    REMOVE_NOTE
} from "../actions/note";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    let nextState = Object.assign({}, prevState);
    switch(action.type) {
        case RECEIVE_TAGS:
            const newTags = {};
            Object.values(action.tags).forEach((tag) => {
                newTags[tag.id] = tag;
            })
            return Object.assign({}, prevState, newTags);
        case RECEIVE_TAG:
            const newTag = { [action.tag.id]: action.tag };
            return Object.assign({}, prevState, newTag);
        case REMOVE_TAG:
            delete nextState[action.tag.id]
            return nextState;

        // // when a note is removed, delete the note-id association in the tag
        case REMOVE_NOTE:
            action.note.tag_ids.forEach((tag_id) => {
                debugger
                let index = nextState[tag_id].note_ids.indexOf(action.note.id)
                nextState[tag_id].note_ids.splice(index, 1)
            })
            return nextState;

            // let index = nextState[action.note.tag_ids].note_ids.indexOf(action.note.id)
            // nextState[action.note.tag_id].note_ids.splice(index, 1)
            // debugger
            // return nextState;
    
        default:
            return prevState;
    }
};