import { connect } from 'react-redux';
import { fetchNotebooks } from '../../../state/actions/notebook';
import { fetchNotes } from '../../../state/actions/note';
import { fetchTags } from '../../../state/actions/tag';
import Main from './Main';

const mapStateToProps = (state) => {
    return {
        notes: state.entities.notes,
        // notebooks: Object.values(state.entities.notebooks),
        // users: Object.values(state.entities.users),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotebooks: () => dispatch(fetchNotebooks()),
        fetchNotes: () => dispatch(fetchNotes()),
        fetchTags: () => dispatch(fetchTags())
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    // null,
    // {pure: false}
    )(Main)

