import { connect } from 'react-redux';
import { fetchNotesByNotebookId } from '../../../../state/actions/note';
import NotebookItem from './NotebookItem';

const mapStateToProps = (state) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        notes: Object.values(state.entities.notes)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotesByNotebookId: () => dispatch(fetchNotesByNotebookId()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookItem)