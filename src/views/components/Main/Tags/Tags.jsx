import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { closeModal } from '../../../../state/actions/modal'

import {NavLink} from 'react-router-dom';

const Tags = (props) => {
    const tagsObj = useSelector(state => state.entities.tags);
    const dispatch = useDispatch();

    return (
        <div className="tags">
            <section className="tags__header">
                <i className="fas fa-tag"></i>
                <h2 className="universal__h2">Tags</h2>
            </section>

            <section className="tags__container">
                <NavLink to={`/main/notes`}
                className="tag__">
                    hello!
                    <div className="tag__link"></div>
                </NavLink>
            </section>
        </div>

    );

};

export default Tags;