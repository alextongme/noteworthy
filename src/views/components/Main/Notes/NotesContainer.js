import { connect } from 'react-redux';
import { fetchNotebooks } from '../../../../state/actions/notebook';
import { fetchNotes } from '../../../../state/actions/note';
import Notes from './Notes';

const mapStateToProps = (state) => {
    return {
        notes: Object.values(state.entities.notes),
        notebooks: Object.values(state.entities.notebooks),
        // users: Object.values(state.entities.users),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchNotebooks: () => dispatch(fetchNotebooks()),
        // fetchNotes: () => dispatch(fetchNotes())
    }
}

export default connect(
    mapStateToProps, 
    null,
    null,
    {pure: false}
    )(Notes)

