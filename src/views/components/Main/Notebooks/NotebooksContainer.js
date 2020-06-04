import { connect } from 'react-redux';
import Notebook from './Notebooks';

const mapStateToProps = (state) => {
    return {
        notebooks: Object.values(state.entities.notebooks),
        notes: Object.values(state.entities.notes)
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
        // fetchNotebooks: () => dispatch(fetchNotebooks()),
//     }
// }

export default connect(mapStateToProps, null)(Notebook)