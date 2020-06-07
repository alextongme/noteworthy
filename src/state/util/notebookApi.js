export const fetchNotebooks = () => {
    return ($.ajax({
        method: "GET",
        url: "api/notebooks"
    })
    );
}

export const fetchNotebook = (notebookId) => {
    return ($.ajax({
        method: "GET",
        url: `api/notebooks/${notebookId}`,
    })
    );
}

export const createNotebook = (notebook) => {
    // debugger
    return ($.ajax({
        method: "POST",
        url: `api/notebooks`,
        data: { notebook }
    }));
}

export const updateNotebook = (notebook) => {
    // debugger
    return ($.ajax({
        method: "PATCH",
        url: `api/notebooks/${notebook.id}`,
        data: { notebook }
    }));
}

export const deleteNotebook = (notebookId) => {
    return ($.ajax({
        method: "DELETE",
        url: `api/notebooks/${notebookId}`,
    }));
}