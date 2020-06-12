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

// export const createtag = (tag) => {
//     // debugger
//     return ($.ajax({
//         method: "POST",
//         url: `api/tags`,
//         data: { tag }
//     }));
// }

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

// export const deletetag = (tagId) => {
//     return ($.ajax({
//         method: "DELETE",
//         url: `api/tags/${tagId}`,
//     }));
// }