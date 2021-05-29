import {PlusCircle} from "react-bootstrap-icons";
import React from "react";
import PropTypes from 'prop-types';
import {Button} from "../../stories/Button";

const GridButton = ({label,onNewRow}) =>{

    return <button
        className="btn btn-success btn-sm float-left my-1 mx-3"
        onClick={() => onNewRow()}>
        <PlusCircle/>
        <> Add new {label}</>
    </button>
}

export default GridButton;

GridButton.propTypes = {
    label: PropTypes.string,
    onNewRow: PropTypes.func
}

GridButton.defaultProps = {
    label: 'button',
    onNewRow: undefined,
};