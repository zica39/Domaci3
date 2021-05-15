import { Search } from 'react-bootstrap-icons';
import React from "react";

const SearchComponent = ({filter,setFilter}) => {

    return <form className="form-inline my-1 float-right">
        <Search />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"
               value={filter} onChange={(e) => setFilter(e.target.value)}
        />
    </form>
}

export default SearchComponent;