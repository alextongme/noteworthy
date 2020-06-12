import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.deleteNbAndResetDefault = this.deleteNbAndResetDefault.bind(this);
  }

  // handling closing the component whne clicking outside of it
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggleDropdown();
    }
  }

  newOpenModal(type) {
    this.props.openModal(type);
    this.props.toggleNextDropdown();
  }

  deleteNbAndResetDefault() {
    let nbDeletedId = this.props.currNotebookId;
    this.props.deleteNotebook(nbDeletedId);
    // debugger
    if(this.props.notebookIds.length === 1) {
      this.props.updateDefaultNotebook(undefined);
      // debugger
    } else if(nbDeletedId == this.props.user.default_notebook_id) {
      // debugger
      for(let i = 0; i < this.props.notebookIds.length; i++) {
        // debugger
        if(this.props.notebookIds[i] != nbDeletedId) {
          this.props.updateDefaultNotebook(this.props.notebookIds[i]);
          // debugger
          return;
        }
      }
    }
  }

  render() {
    return (
        <ul 
          className="dropdown"
          ref={this.setWrapperRef}>
            <li className="dropdown__rows">
              <button
                className="universal__h3 dropdown__button"
                onClick={() => this.newOpenModal("Edit notebook")}>
                Rename notebook</button>
            </li>
            <li className="dropdown__rows">
              <button 
                className="universal__h3 dropdown__button"
                onClick={() => {this.deleteNbAndResetDefault()}}>Delete notebook</button>
            </li>
        </ul>
    );
  }
}

export default Dropdown;