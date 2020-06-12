import React, {useEffect} from 'react';
import NotebookItemContainer from './NotebookItem/NotebookItemContainer';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from '../../../../state/actions/modal';
import { fetchNotebooks } from '../../../../state/actions/notebook';
import { fetchNotes } from '../../../../state/actions/note';

const Notebooks = () => {
    // map state and dispatch
    const dispatch = useDispatch();
    useEffect(() => {
        // debugger
        dispatch(fetchNotebooks());
        // debugger
        dispatch(fetchNotes());
        // debugger
    }, []);

    const notebooksObj = useSelector(state => state.entities.notebooks);
    const notebooks = Object.values(notebooksObj);

    const notebookItems = notebooks.map((notebook, idx) => {
        let className;
        if(idx % 2 == 0) {
            className = "notebooks__tableRow notebooks__tableRow--even";
        } else {
            className = "notebooks__tableRow notebooks__tableRow--odd";
        }
        // debugger
        return (
            <NotebookItemContainer key={notebook.id} notebook={notebook} cssName={className} />
        );
    });

    return (
        <div className="notebooks">
            <header className="notebooks__header">
                <h1 className="notebooks__h1--title">Notebooks</h1>
                
                    {/* search functionality */}
                    {/* <input className="notebooks__search" placeholder="search for notebooks" /> */}

            </header>
            <section className="notebooks__section--bottom">
                <nav className="notebooks__nav">
                    <h2 className="notebooks__h2--title">My notebook list</h2>

                    <div 
                        className="notebooks__addContainer">
                        {/* <img 
                            src={window.addButton} className="notebooks__button--addImage"
                            onClick={() => dispatch(openModal("Create notebook"))} /> */}

                        <i 
                            className="fas fa-book sidebar__icons" 
                            onClick={() => dispatch(openModal("Create notebook"))}/>
                        <button 
                            className="notebooks__button--add"
                            onClick={() => dispatch(openModal("Create notebook"))}>
                            New notebook
                        </button>
                    </div>

                </nav>
                <div className="notebooks__tableContainer">
                    <table className="notebooks__table">
                        <tbody className="notebooks__tableBody">
                            <tr className="notebooks__tableRow--header">
                                <th className="notebooks__tableCol--header">
                                    NAME
                                </th>
                                <th className="notebooks__tableCol--header">
                                    CREATED BY
                                </th>
                                <th className="notebooks__tableCol--header">
                                    UPDATED AT
                                </th>
                                <th className="notebooks__tableCol--header">
                                    SHARED WITH
                                </th>
                                <th className="notebooks__tableCol--header">
                                    ACTIONS
                                </th>
                            </tr>
                                {notebookItems}
                                
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
            }
    
// };

export default Notebooks;