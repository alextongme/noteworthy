import React from 'react';
import NotebookItem from './components/NotebookItem/NotebookItem';

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
                <table className="notebooks__table">
                    <tbody>
                        <tr>
                            <th>
                                name
                            </th>
                            <th>
                                created at
                            </th>
                        </tr>
                        {notebookItems}
                    </tbody>
                </table>
                
            </div>
        );
    }
};

export default Notebooks;