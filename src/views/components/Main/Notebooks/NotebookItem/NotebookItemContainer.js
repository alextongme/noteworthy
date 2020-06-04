import { connect } from 'react-redux';
import NotebookItem from './NotebookItem';

const mapStateToProps = (state) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        notes: Object.values(state.entities.notes)
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }

export default connect(mapStateToProps, null)(NotebookItem)