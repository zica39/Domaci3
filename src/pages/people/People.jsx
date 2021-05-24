import React, {useState} from 'react';
import Grid from "../../components/grid/Grid";
import {getPerson,updatePerson,createPerson,getPeople, deletePerson} from "../../services/people";
import {useMutation, useQuery, useQueryClient} from "react-query";
import useDebounce from '../../customHooks/useDebounce';
import {swalAlert} from "../../functions/tools";
import FormModal from "../../components/formModal/FormModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {person_model,person_schema} from "../../constants/person_model";

const People = () => {

    const[filter,setFilter] = useState('');
    const debouncedValue = useDebounce(filter, 200);

    const[page,setPage] = useState(0);
    const[deleteId,setDeleteId] = useState(0);
    const[openModal,setOpenModal] = useState({});

    const  label = 'person';

    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['people',{page:page,filter:debouncedValue}],  getPeople);


    const deleteMutation = useMutation(deletePerson, {
        onSuccess: () => {
            queryClient.invalidateQueries('people');

            swalAlert('success','Good job!','Person deleted successfully!');
            setDeleteId(0);
        }
    })

    const onEditRow = (row) => {
        setOpenModal({open:true,action: 'Edit',id: row.id,title: 'Person',key:'people'});
    }

    const onNewRow = ()=>{
        setOpenModal({open:true,action: 'Create', title:'Person', key:'people'});

    }

    const removeRow = (id) => {

        deleteMutation.mutate(id);

        if(deleteMutation.isError){
            swalAlert('error','Oops...',deleteMutation.error);
            setDeleteId(0);
        }


    }

    if(isError){
        swalAlert('error','Oops...',error);
    }

    return<div className="container-fluid">
        <div>
            {
                <Grid onEditRow={onEditRow}
                      onNewRow={onNewRow}
                      onRowDelete={setDeleteId}
                      data={data?data.data:[]}
                      label={label}

                      itemsCount={parseInt(data?.headers['x-total-count'])}
                      setPage={setPage}
                      page={page}

                      filter={filter}
                      setFilter={setFilter}
                      loading={isLoading}
                />
            }
        </div>
        {deleteId?<DeleteModal id={deleteId} setDeleteId={setDeleteId} removeRow={removeRow} title='person' />:''}
        {openModal.open?<FormModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            model={person_model}
            schema={person_schema}
            createItem={createPerson}
            updateItem={updatePerson}
            getItem={getPerson}
        />:''}

    </div>

}

export default People;

