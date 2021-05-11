import React, {useState, useReducer} from 'react';
import Grid from "../../components/grid/Grid";
import movies from "../../constants/movies";
import {useHistory} from 'react-router-dom';
import {loadFromStorage, saveToStorage} from "../../functions/tools";
import {changeData} from "../../functions/changeData";
import AppData from "../../contexts/AppData";


const Movies = () => {
    const items = loadFromStorage('movies');
    const [moviesList, dispatch] = useReducer(changeData,items?items: movies);
    const[filteredItems,setFilteredItems] = useState([]);

    const history = useHistory();
    const header = ['Id', 'Title', 'Year','...','...'];
    const key = 'movies', label = 'movie';


    const onRowClick = (e) => {
        saveToStorage('movies_data',e);
        history.push('/movies/form');
    }


    return <AppData.Provider value={{
        list: moviesList,
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

export default Movies;