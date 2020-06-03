import React from "react";

const NotebookNoteItems = () => {
    return (
        <tr className="notebookNotes__tableRow" >
            {/* <td 
                className="notebooks__tableCol"
            >
                {idx}
            </td> */}

            {/* notebooks__tableRow notebooks__tableRow--even */}

                <td
                    className="notebookNotes__tableCol">
                    {/* <i className="fas fa-chevron-circle-right"></i> */}
                    
                    {/* <Link
                        // to={`/main/notebooks/${notebook.id}/edit`}
                        to={`/main/notes`}
                        className="notebooks__links">
                            A note
                    </Link> */}
                    A fake note link
                </td>

                <td
                    className="notebookNotes__tableCol">
                    Alex Tong
                </td>

                <td
                    className="notebookNotes__tableCol">
                    A new time
                </td>

                <td
                    className="notebookNotes__tableCol">
                    Only you
                </td>

                <td
                    className="notebookNotes__tableCol">
                    <i className="fas fa-running" />
                </td>
            </tr>
    );
}

export default NotebookNoteItems;