import { connect } from 'react-redux';
import NotesNav from './NotesNav';

const mapStateToProps = (state) => {
    return {
        notes: Object.values(state.entities.notes),
        notebooks: Object.values(state.entities.notebooks),
    }
}

export default connect(
    mapStateToProps, 
    null,
    // null,
    // {pure: false}
    )(NotesNav)
