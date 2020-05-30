import React from 'react';
import NotebookNavItem from './NotebookNavItem';

class NotebookNav extends React.Component {
    componentDidMount() {
        this.props.fetchNotebooks();
    }
    
    render() {
        const nbs = this.props.notebooks.map((notebook, idx) => {
            return (
                <NotebookNavItem key={idx} notebook={notebook} />
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