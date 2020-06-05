import { connect } from 'react-redux';
import NotebookItem from './NotebookItem';
import { openDropdown } from '../../../../../state/actions/dropdown';

const mapStateToProps = (state, ownProps) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        // notes: Object.values(state.entities.notes),
        users: state.entities.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openDropdown: (dropdown) => dispatch(openDropdown(dropdown)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookItem)