
                {/* <section className="noteEditor__tags">
                    
                    <form onSubmit={this.handleTagSubmit} className="noteEditor__form--tag">
                        <input
                            type="text" 
                            value={this.state.name}
                            onChange ={this.handleChange('name')} className="universal__input noteEditor__form--input" 
                            placeholder="Tag name" 
                            onBlur={() => this.hideToolbarAndSave() }
                            onFocus={() => this.showToolbar()}
                            maxLength="30"
                            />
                    </form>

                    <section className="noteEditor__tags--rightSection">
                        {this.props.note.tags.map((tag, key) => {
                            return (<div className="universal__h3 noteEditor__link--tags" key={key} >
                            {tag.name}
                            &nbsp;&nbsp;&nbsp;
                            <i 
                                className="fas fa-backspace noteEditor__tags--icon" 
                                onClick = {() => {this.props.deleteNoteTag({
                                    id: tag.id,
                                    note_id: this.props.note.id
                                })}}
                                // add on click here to remove tag from the note
                            />
                            </div>)
                        })}
                    </section>
                </section> */}