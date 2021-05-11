import React, {useState, useReducer} from 'react';
import Grid from "../../components/grid/Grid";
import books from "../../constants/books";
import AppData from "../../contexts/AppData";
import {useHistory} from 'react-router-dom';
import {loadFromStorage, saveToStorage} from "../../functions/tools";
import {changeData} from "../../functions/changeData";

const Books = () => {
    const items = loadFromStorage('books');
    const [booksList, dispatch] = useReducer(changeData,items?items: books);
    const[filteredItems,setFilteredItems] = useState([]);

    const history = useHistory();
    const header = ['Id', 'Title', 'Year','Author','...','...'];
    const key = 'books', label = 'book';


    const onRowClick = (e) => {
        saveToStorage('books_data',e);
        history.push('/books/form');
    }


    return <AppData.Provider value={{
        list: booksList,
        dispatch: (e) => dispatch(e)}}>
        <div className="container-fluid">
            <div>
                {
                    <Grid onRowClick={onRowClick}
                          filteredItems={filteredItems} setFilteredItems={setFilteredItems}
                          header={header}
                          key_name={key}
                          label={label}
                    />
                }
            </div>
        </div>
    </AppData.Provider>
}

export default Books;

