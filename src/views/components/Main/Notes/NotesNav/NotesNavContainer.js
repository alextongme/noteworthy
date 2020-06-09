import { connect } from 'react-redux';
import NotesNav from './NotesNav';

const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.entities.notes,
        notebooks: state.entities.notebooks,
    }
}

export default connect(
    mapStateToProps, 
    null,
    // null,
    // {pure: false}
    )(NotesNav)
