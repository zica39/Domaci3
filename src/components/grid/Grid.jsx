import React, {useContext, useEffect, useState} from 'react';
import AppData from "../../contexts/AppData";
import TableComponent from "../table/Table";
import { PlusCircle } from 'react-bootstrap-icons';
import{saveToStorage, destroyData,loadFromStorage} from "../../functions/tools";
import PaginationComponent from "../paginationComponent/PaginationComponent";
import SearchComponent from "../SearchComponent/SearchComponent";


const Grid = ({onEditRow,onNewRow,onRowDelete,label,data,setPage,bookCount,page,filter,setFilter}) => {


    return <div className="bg-light shadow-sm">

        <button className="btn btn-success btn-sm float-left my-1 mx-3"  onClick={() => onNewRow()}><PlusCircle/> Add new {label}</button>

        <SearchComponent filter={filter} setFilter={setFilter}/>
        <TableComponent  data={data} onEditRow={onEditRow} onRowDelete={onRowDelete} />
        <PaginationComponent bookCount={bookCount} setPage={setPage} page={page} />

    </div>;
}

export default Grid;