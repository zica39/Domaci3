import React from 'react';
import TableComponent from "../table/Table";
import GridButton from "../gridButton/GridButton";
import PaginationComponent from "../paginationComponent/PaginationComponent";
import SearchComponent from "../SearchComponent/SearchComponent";


const Grid = ({onEditRow,onNewRow,onRowDelete,label,data,setPage,itemsCount,page,filter,setFilter,loading}) => {

    return <div className="bg-light shadow-sm">

        <GridButton label={label} onNewRow={onNewRow}/>
        <SearchComponent filter={filter} setFilter={setFilter}/>

        {loading?<div className="my-2 spinner-border text-primary"/>:''}

        <TableComponent  data={data} onEditRow={onEditRow} onRowDelete={onRowDelete} />
        {itemsCount?<PaginationComponent itemCount={itemsCount} setPage={setPage} page={page} />:''}

    </div>;
}

export default Grid;