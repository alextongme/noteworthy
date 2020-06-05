import { connect } from 'react-redux';
import NotebookItem from './NotebookItem';

const mapStateToProps = (state, ownProps) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        // notes: Object.values(state.entities.notes),
        users: state.entities.users
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }

export default connect(mapStateToProps, null)(NotebookItem)