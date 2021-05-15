import React, {useState, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import {useHistory} from 'react-router-dom';
import {getPeople,deletePerson,getPeopleCount} from "../../services/people";

const People = () => {

    const[filter,setFilter] = useState('');
    const[people,setPeople] = useState([]);
    const[page,setPage] = useState(0);
    const[peopleCount,setPeopleCount] = useState(0);

    const history = useHistory();

    const  label = 'person';


    const onEditRow = (row) => {
        history.push('/people/edit/'+row.id);
    }

    const onNewRow = ()=>{
        history.push('/people/create');
    }
    const onRowDelete = (row)=>{
        if(window.confirm('Are you sure?')){
            deletePerson(row.id).then(response => {
                console.log(response);
                history.push('/movies');
            }).catch(error => {
                alert(error?.message);
            })
        }
    }

    useEffect(()=>{
        getPeople(page,filter).then(function(response){
            setPeople(response.data);
            getPeopleCount(filter).then(res=>{
                setPeopleCount(res.data);
            }).catch(error=>{
                alert(error?.message)
            });


        }).catch(function (error) {
            alert(error?.message);
        });
    },[page,filter]);



    return<div className="container-fluid">
        <div>
            {
                <Grid onEditRow={onEditRow}
                      onNewRow={onNewRow}
                      onRowDelete={onRowDelete}
                      data={people}
                      label={label}

                      itemsCount={peopleCount}
                      setPage={setPage}
                      page={page}

                      filter={filter}
                      setFilter={setFilter}
                />
            }
        </div>
    </div>

}

export default People;

