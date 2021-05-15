import React, {useContext, useEffect, useState} from 'react';
import AppData from "../../contexts/AppData";
import TableComponent from "../table/Table";
import { PlusCircle,Search } from 'react-bootstrap-icons';
import{saveToStorage, destroyData,loadFromStorage} from "../../functions/tools";
import PagionationElement from "../pagination/PaginationElement";


const Grid = ({onEditRow,onNewRow,onRowDelete,label,data,setPage,bookCount,page,filter,setFilter}) => {


    return <div className="bg-light shadow-sm">

        <button className="btn btn-success btn-sm float-left my-1 mx-3"  onClick={() => onNewRow()}><PlusCircle/> Add new {label}</button>

            <form className="form-inline my-1 float-right">
                <Search />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"
                       value={filter} onChange={(e) => setFilter(e.target.value)}
                />
            </form>


        <TableComponent  data={data} onEditRow={onEditRow} onRowDelete={onRowDelete} />
        <PagionationElement bookCount={bookCount} setPage={setPage} page={page} />
            </div>;
}

export default Grid;