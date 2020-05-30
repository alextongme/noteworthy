export const fetchNotebooks = () => {
    return ($.ajax({
        method: "GET",
        url: "api/notebooks"
    })
    );
}

export const fetchNotebook = (id) => {
    return ($.ajax({
        method: "GET",
        url: `api/notebooks/${id}`,
    })
    );
}

export const createNotebook = (notebookForm) => {
    return ($.ajax({
        method: "POST",
        url: `api/notebooks`,
        data: notebookForm,
    })
    );
}