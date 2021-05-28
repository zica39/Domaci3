import React from 'react';
import TableComponent from "../table/Table";
import GridButton from "../gridButton/GridButton";
import PaginationComponent from "../paginationComponent/PaginationComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import PageSizeSelect from "../pageSizeSelect/PageSizeSelect";


const Grid = ({onEditRow,onNewRow,onRowDelete,label,data,setPage,itemsCount,page,pageSize,setPageSize,filter,setFilter,loading}) => {

    return <div className="bg-light shadow-sm">

        <GridButton label={label} onNewRow={onNewRow}/>
        <PageSizeSelect size={pageSize} setSize={setPageSize} setPage={setPage}/>
        <SearchComponent filter={filter} setFilter={setFilter}/>

        {loading?<div className="my-2 spinner-border text-primary"/>:''}

        <TableComponent  data={data} onEditRow={onEditRow} onRowDelete={onRowDelete} />
        {itemsCount?<PaginationComponent itemCount={itemsCount} setPage={setPage} page={page} size={pageSize} />:''}

    </div>;
}

export default Grid;