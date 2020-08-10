import * as APIUtil from '../util/tagApi';

export const RECEIVE_TAG = "RECEIVE_TAG";
export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const REMOVE_TAG = "REMOVE_TAG";


export const receiveTag = (tag) => {
    return {
        type: RECEIVE_TAG,
        tag
    }
};

export const receiveTags = (tags) => {
    return {
        type: RECEIVE_TAGS,
        tags
    }
};

export const removeTag = (tag) => {
    return {
        type: REMOVE_TAG,
        tag
    }
};


// action thunk creators for getting tags of current user
export const fetchTags = () => (dispatch) => {
    return APIUtil.fetchTags().then((tags) => {
        return dispatch(receiveTags(tags));
    });
};

export const fetchTag = (tagId) => (dispatch) => {
    return APIUtil.fetchTag(tagId).then((tag) => {
        return dispatch(receiveTag(tag));
    });
};

export const createTag = (tag) => (dispatch) => {
    return APIUtil.createTag(tag).then((tag) => {
        return dispatch(receiveTag(tag));
    });
};

// export const updatetag = (tag) => (dispatch) => {
//     // debugger
//     return APIUtil.updatetag(tag).then((tag) => {
//         // debugger
//         return dispatch(receivetag(tag));
//     });
// };

export const deleteTag = (tagId) => (dispatch) => {
    return APIUtil.deleteTag(tagId).then((tagId) => {
        return dispatch(removeTag(tagId));
    });
};

export const deleteNoteTag = (tag) => (dispatch) => {
    return APIUtil.deleteNoteTag(tag).then((tag) => {
        return dispatch(receiveTag(tag));
    });
};