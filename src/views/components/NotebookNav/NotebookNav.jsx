import React from 'react';

class NotebookNav extends React.Component {
    componentDidMount() {
        this.props.fetchNotebooks();
    }
    
    render() {
        const nbs = this.props.notebooks.map((obj, idx) => {
            return (
                <li key={idx}>{obj.name}</li>
            );
        });
        
        return (
            <div className="notebookNav">
            <h1>notebooks</h1>
            {nbs}
            </div>
        );
    }
};

export default NotebookNav;