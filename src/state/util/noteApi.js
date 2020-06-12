export const fetchNotes = () => {
    // debugger
    return ($.ajax({
        method: "GET",
        url: "api/notes"
    }));
}

export const fetchNote = (noteId) => {
    return ($.ajax({
        method: "GET",
        url: `api/notes/${noteId}`,
    }));
}

export const createNote = (note) => {
    // debugger
    return ($.ajax({
        method: "POST",
        url: `api/notes`,
        data: { note }
    }));
}

export const updateNote = (note) => {
    // debugger
    return ($.ajax({
        method: "PATCH",
        url: `api/notes/${note.id}`,
        data: { note }
    }));
}

export const deleteNote = (noteId) => {
    return ($.ajax({
        method: "DELETE",
        url: `api/notes/${noteId}`,
    }));
}