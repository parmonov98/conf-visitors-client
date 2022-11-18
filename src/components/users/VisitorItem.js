import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Check, X } from "react-feather";

const VisitorItem = ({
    updateVisitorDeleteList,
    visitor,
}) => {

    const [status, setStatus] = useState(false);

    const handleCheckboxClick = (e) => {
        setStatus(!status);
        updateVisitorDeleteList(visitor.id, !status);
    }

    return (
        <Fragment>
            <tr>
                <td>
                    <div className="actions">
                        <input className='form-check-input' type={"checkbox"} checked={status ? 'checked' : ''} onClick={handleCheckboxClick} />
                    </div>
                </td>
                <th scope="row">{visitor.id}</th>
                <td>{visitor.first_name}</td>
                <td>{visitor.last_name}</td>
                <td>{visitor.phone}</td>
                <td>{visitor?.email}</td>
                <td>{visitor?.has_paid ? <Check /> : <X />}</td>
                <td>{visitor?.comment}</td>

            </tr>
        </Fragment>
    );
};


VisitorItem.propTypes = {
    visitor: PropTypes.object.isRequired,
};

export default VisitorItem;