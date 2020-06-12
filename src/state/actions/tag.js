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

// export const createtag = (tag) => (dispatch) => {
//     return APIUtil.createtag(tag).then((tag) => {
//         // debugger
//         return dispatch(receivetag(tag));
//     });
// };

// export const updatetag = (tag) => (dispatch) => {
//     // debugger
//     return APIUtil.updatetag(tag).then((tag) => {
//         // debugger
//         return dispatch(receivetag(tag));
//     });
// };

// export const deletetag = (tagId) => (dispatch) => {
//     return APIUtil.deletetag(tagId).then((tag) => {
//         return dispatch(removetag(tag));
//     });
// };