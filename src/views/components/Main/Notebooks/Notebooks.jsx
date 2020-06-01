import React from 'react';
import NotebookItem from './NotebookItem/NotebookItem';
import NotebookFormContainer from './NotebookForm/NotebookFormContainer';

class Notebooks extends React.Component {
    componentDidMount() {
        this.props.fetchNotebooks();
    }
    
    render() {
        const notebookItems = this.props.notebooks.map((notebook, idx) => {
            return (
                <NotebookItem key={idx} notebook={notebook} />
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
                                <th className="notebooks__column--header">
                                    name
                                </th>
                                <th>
                                    created at
                                </th>
                            </tr>
                            {notebookItems}
                        </tbody>
                    </table>
                    <NotebookFormContainer />
                </section>
            </div>
        );
    }
};

export default Notebooks;