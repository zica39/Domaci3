import React, {useContext, useEffect, useState} from 'react';
import AppData from "../../contexts/AppData";
import TableComponent from "../table/Table";
import { PlusCircle,Search } from 'react-bootstrap-icons';
import{saveToStorage, destroyData,loadFromStorage} from "../../functions/tools";


const Grid = ({onRowClick,filteredItems,setFilteredItems,header,key_name,label}) => {

    const [searchValue, setSearchValue] = useState('');
    const {list, dispatch} = useContext(AppData);

    useEffect(() => {
        if(searchValue.length > 0){
            dispatch({type: 'filter', data: searchValue,setFilteredItems:setFilteredItems})
        }else{
            setFilteredItems([]);
        }
    }, [searchValue])

    const onDelete = (data) => {
        if(data?.id){
            dispatch({type: 'delete', data: {id: data?.id}});
        }
    }

    useEffect(()=>{
        saveToStorage(key_name,list);
    },[list])


    const edited_data = loadFromStorage(key_name+'_data');
    if(edited_data){
        dispatch(edited_data);
        destroyData(key_name+'_data');
    }

    return <div className="bg-light shadow-sm">

        <button className="btn btn-success btn-sm float-left my-1 mx-3"  onClick={() => onRowClick({})}><PlusCircle/> Add new {label}</button>

            <form className="form-inline my-1 float-right">
                <Search />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"
                       value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>


        <TableComponent header={header} rows={list} onRowClick={onRowClick} onRowDelete={onDelete} filteredItems={filteredItems}/>
            </div>;
}

export default Grid;