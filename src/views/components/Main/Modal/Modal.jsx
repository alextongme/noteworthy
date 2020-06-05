import React from 'react';
import { connect } from "react-redux";
import { closeModal } from '../../../../state/actions/modal';
import NotebookCreateContainer from '../Notebooks/NotebookForm/CreateFormContainer';
import NotebookEditContainer from '../Notebooks/NotebookForm/EditFormContainer';

const Modal = ({modal, closeModal}) => {
    
    if (!modal) {
      return null;
    }

    let component;

    switch (modal) {
      case 'create notebook':
        component = <NotebookCreateContainer />;
        break;
      case 'edit notebook':
        component = <NotebookEditContainer />;
        break;
      default:
        return null;
    }

    return (
      <div className="modal__background" onClick={closeModal}>
        <section className="modal__child" onClick={(e) => {
            return (e.stopPropagation());
            } }>
          { component }
        </section>
      </div>
    );
  }

const mapStateToProps = (state) => {
    return {
        modal: state.ui.modal
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
