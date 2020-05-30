import { connect } from 'react-redux';
import React from 'react';
import { fetchNotebooks } from '../../../state/actions/notebook';
import NotebookNav from './NotebookNav';

const mapStateToProps = (state) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotebooks: () => dispatch(fetchNotebooks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookNav)