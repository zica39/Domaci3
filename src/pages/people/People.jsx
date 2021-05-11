import React, {useState, useReducer} from 'react';
import Grid from "../../components/grid/Grid";
import people from "../../constants/people";
import AppData from "../../contexts/AppData";
import {useHistory} from 'react-router-dom';
import {loadFromStorage, saveToStorage} from "../../functions/tools";
import {changeData} from "../../functions/changeData";

const People = () => {
    const items = loadFromStorage('people');
    const [peopleList, dispatch] = useReducer(changeData,items?items: people);
    const[filteredItems,setFilteredItems] = useState([]);

    const history = useHistory();
    const header = ['Id', 'Name', 'Age','City','...','...'];
    const key = 'people', label = 'person';


    const onRowClick = (e) => {
        saveToStorage('people_data',e);
        history.push('/people/form');
    }


    return <AppData.Provider value={{
        list: peopleList,
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
export default People;