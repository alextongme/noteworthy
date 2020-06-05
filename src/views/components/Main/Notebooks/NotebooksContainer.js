import { connect } from 'react-redux';
import Notebooks from './Notebooks';
import { openModal } from '../../../../state/actions/modal'

const mapStateToProps = (state) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        notes: Object.values(state.entities.notes)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notebooks)