export const fetchTags = () => {
    return ($.ajax({
        method: "GET",
        url: "api/tags"
    })
    );
}

export const fetchTag = (tagId) => {
        return ($.ajax({
            method: "GET",
            url: `api/tags/${tagId}`,
        })
    );
}

export const createTag = (tag) => {
    return ($.ajax({
        method: "POST",
        url: `api/tags`,
        data: { tag }
    }));
}

export const deleteTag = (id) => {
    return ($.ajax({
        method: "DELETE",
        url: `api/tags/${id}`,
    }));
}

export const deleteNoteTag = (tag) => {
    return ($.ajax({
        method: "DELETE",
        url: `api/tags/${tag.id}`,
        data: { tag }
    }));
}

// export const updateDefaulttag = (default_tag_id) => {
//     return ($.ajax({
//         method: "PATCH",
//         url: `api/user`,
//         data: { default_tag_id }
//     }));
// }

// export const updatetag = (tag) => {
//     // debugger
//     return ($.ajax({
//         method: "PATCH",
//         url: `api/tags/${tag.id}`,
//         data: { tag }
//     }));
// }