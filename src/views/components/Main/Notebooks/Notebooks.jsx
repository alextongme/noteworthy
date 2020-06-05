import React from 'react';
import NotebookItemContainer from './NotebookItem/NotebookItemContainer';
// import CreateFormContainer from './NotebookForm/CreateFormContainer';
// import EditFormContainer from './NotebookForm/EditFormContainer';
// import { PrivateRoute } from '../../../../state/util/route';

const Notebooks = ({ openModal, notebooks }) => {

    const createNotebookButton = () => {
        return (
            <div 
                className="notebooks__addContainer">
                <img 
                    src={window.addButton} className="notebooks__button--addImage"
                    onClick={() => openModal("create notebook")} />
                <button 
                    className="notebooks__button--add"
                    onClick={() => openModal("create notebook")}
                    >
                    New notebook
                </button>
            </div>
        );
    }

    const notebookItems = notebooks.map((notebook, idx) => {
        let className;
        if(idx % 2 == 0) {
            className = "notebooks__tableRow notebooks__tableRow--even";
        } else {
            className = "notebooks__tableRow notebooks__tableRow--odd";
        }

        return (
            <NotebookItemContainer key={idx} notebook={notebook} cssName={className} />
        );
    });
        
        return (
            <div className="notebooks">
                <header className="notebooks__header">
                    <h1 className="notebooks__h1--title">Notebooks</h1>
                    {/* <div className="notebooks__header--right"> */}
                        {/* <img 
                                src={window.lionStationary}
                                onMouseEnter={(e) => (e.currentTarget.src = window.lionWalking)}
                                onMouseLeave={(e) => (e.currentTarget.src = window.lionStationary)}
                                className="notebooks__headerLion"
                                /> */}
                        <input className="notebooks__search" placeholder="search for notebooks" />
                    {/* </div> */}
                </header>
                <section className="notebooks__section--bottom">
                    <nav className="notebooks__nav">
                        <h2 className="notebooks__h2--title">My notebook list</h2>

                        {createNotebookButton()}

                    </nav>
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
                    {/* <CreateFormContainer /> */}


                    {/* conditional render of create form: */}
                    {/* <Route exact path="/main/notebooks/create" component={CreateFormContainer} /> */}
                    
                    {/* <PrivateRoute 
                        exact path="/main/notebooks/:notebookId/edit" 
                        component={EditFormContainer} 
                    /> */}
                </section>
            </div>
        );
    
};

export default Notebooks;