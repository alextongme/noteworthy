import { connect } from 'react-redux';
import NoteItems from './NoteItems';

const mapStateToProps = (state, ownProps) => {
    // debugger
    return {
        notes: state.entities.notes,
        users: state.entities.users
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }

export default connect(mapStateToProps, null)(NoteItems)