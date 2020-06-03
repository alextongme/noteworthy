import React from 'react';
import NotebookItem from './NotebookItem/NotebookItem';
import CreateFormContainer from './NotebookForm/CreateFormContainer';
import EditFormContainer from './NotebookForm/EditFormContainer';
import { PrivateRoute } from '../../../../state/util/route';
import {Switch} from 'react-router-dom';

class Notebooks extends React.Component {
    componentDidMount() {
        this.props.fetchNotes();
        this.props.fetchNotebooks();
    }
    
    render() {
        const notebookItems = this.props.notebooks.map((notebook, idx) => {
            return (
                <NotebookItem key={idx} notebook={notebook} idx={idx + 1} />
            );
        });
        
        return (
            <div className="notebooks">
                <header className="notebooks__header">
                    <h1 className="notebooks__h1--title">notebooks</h1>
                    <input className="notebooks__search" placeholder="search for notebooks" />
                </header>
                <section className="notebooks__section--bottom">
                    <nav className="notebooks__nav">
                        <h2 className="notebooks__h2--title">my notebook list</h2>
                        <button>new notebook</button>
                    </nav>
                    <table className="notebooks__table">
                        <tbody className="notebooks__tableBody">
                            <tr className="notebooks__tableRow--header">
                                <th className="notebooks__tableCol--header">
                                    NUMBER
                                </th>
                                <th className="notebooks__tableCol--header">
                                    NAME
                                </th>
                                <th className="notebooks__tableCol--header">
                                    UPDATED AT
                                </th>
                            </tr>
                                {notebookItems}
                        </tbody>
                    </table>
                    {/* <CreateFormContainer /> */}


                    {/* conditional render of create form: */}
                    {/* <Route exact path="/main/notebooks/create" component={CreateFormContainer} /> */}
                    
                    <PrivateRoute 
                        exact path="/main/notebooks/:notebookId/edit" 
                        component={EditFormContainer} 
                    />
                </section>
            </div>
        );
    }
};

export default Notebooks;