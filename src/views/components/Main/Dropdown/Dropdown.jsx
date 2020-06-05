import React from 'react';
import { connect } from "react-redux";
// import { closeDropdown } from '../../../../state/actions/dropdown';
// import NotebookCreateContainer from '../Notebooks/NotebookForm/CreateFormContainer';
// import NotebookEditContainer from '../Notebooks/NotebookForm/EditFormContainer';

const Dropdown = ({dropdown, closeDropdown}) => {
    
    if (!dropdown) {
      return null;
    }

    switch (dropdown) {
        case 'notebook actions':
        
        break;
        case 'profile actions':
        
        break;
        case 'filter actions':
        
        break;
        case 'sort actions':
        
        break;
        case 'note actions':
      
        break;
        default:
        return null;
    }

    return (
      <ul className="dropdown__background" onClick={closeDropdown}>
        <section className="dropdown__child" onClick={(e) => {
            return (e.stopPropagation());
            } }>
          { component }
        </section>
      </ul>
    );
  }

const mapStateToProps = (state) => {
    return {
        dropdown: state.ui.dropdown
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        closeDropdown: () => dispatch(closeDropdown())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
