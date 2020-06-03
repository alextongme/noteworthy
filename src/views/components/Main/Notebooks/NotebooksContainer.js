import { connect } from 'react-redux';
import { fetchNotebooks } from '../../../../state/actions/notebook';
import { fetchNotes } from '../../../../state/actions/note';
import Notebook from './Notebooks';

const mapStateToProps = (state) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        // notes: Object.values(state.entities.notebooks)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotebooks: () => dispatch(fetchNotebooks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notebook)