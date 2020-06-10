import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { closeModal } from '../../../../state/actions/modal'
// import { closeModal } from '../../../../state/actions/modal';
// import { createNotebook } from '../../../../../state/actions/notebook';

const Tags = (props) => {
    const tagsObj = useSelector(state => state.entities.tags);
    const dispatch = useDispatch();

    return (
        <div className="tags">

            <section className="tags__exit">
                <i className="fas fa-times-circle" onClick={() => dispatch(closeModal())}/>
            </section>

            <section className="tags__header">
                <h2 className="universal__h2">Tags</h2>
                <i className="fas fa-tag"></i>
            </section>

            <section className="tags__search">
                <input className="universal__input"></input>
            </section>

            <section className="tags__index">
                <ul>
                    <li className="universal__h2">
                        Hello
                    </li>
                </ul>
            </section>

        </div>
    );

};

export default Tags;