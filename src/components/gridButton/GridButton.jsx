import {PlusCircle} from "react-bootstrap-icons";
import React from "react";

const GridButton = ({label,onNewRow}) =>{

    return <button
        className="btn btn-success btn-sm float-left my-1 mx-3"
        onClick={() => onNewRow()}>
        <PlusCircle/>
        <> Add new {label}</>
    </button>
}

export default GridButton;