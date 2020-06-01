import React from 'react';
import NotebookItem from './NotebookItem/NotebookItem';
import CreateFormContainer from './NotebookForm/CreateFormContainer';
import EditFormContainer from './NotebookForm/EditFormContainer';
import { PrivateRoute } from '../../../util/route';
import {Switch} from 'react-router-dom';

class Notebooks extends React.Component {
    componentDidMount() {
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
                </header>
                <section className="notebooks__section--bottom">
                    <table className="notebooks__table">
                        <tbody>
                            <tr className="notebooks__row">
                                <th>
                                    number
                                </th>
                                <th className="notebooks__column--header">
                                    name
                                </th>
                                <th>
                                    updated at
                                </th>
                            </tr>
                                {notebookItems}
                        </tbody>
                    </table>
                    <CreateFormContainer />
                    {/* conditional render of create form: */}
                    {/* <Route exact path="/main/notebooks/create" component={CreateFormContainer} /> */}
                    
                    <PrivateRoute exact path="/main/notebooks/:notebookId/edit" component={EditFormContainer} />
                    
                </section>
            </div>
        );
    }
};

export default Notebooks;