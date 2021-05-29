import React from 'react';
import TableComponent from "../table/Table";
import GridButton from "../gridButton/GridButton";
import PaginationComponent from "../paginationComponent/PaginationComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import PageSizeSelect from "../pageSizeSelect/PageSizeSelect";
import PropTypes from 'prop-types';

const Grid = ({onEditRow,onNewRow,onRowDelete,label,
                  data,setPage,itemsCount,
                  page,pageSize,setPageSize,
                  filter,setFilter,loading}) => {

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

Grid.propTypes = {
    onEditRow: PropTypes.func,
    onNewRow: PropTypes.func,
    onRowDelete: PropTypes.func,

    label: PropTypes.string,
    data: PropTypes.array,
    itemsCount: PropTypes.number,

    page: PropTypes.number,
    setPage: PropTypes.func,
    pageSize: PropTypes.number,
    setPageSize: PropTypes.func,

    filter: PropTypes.string,
    setFilter: PropTypes.func,

    loading: PropTypes.bool
}