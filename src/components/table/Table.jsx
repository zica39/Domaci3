import React from 'react';
import "./Table.css";
import Table from 'react-bootstrap/Table'
import {Trash,Pencil} from 'react-bootstrap-icons';
import {getHeaders} from "../../functions/tools";

const TableComponent = ({ data, onEditRow,onRowDelete}) => {
    //console.log(data);
    const header = getHeaders(data);
    const rows = data;
    console.log(header);
    return <Table striped bordered hover variant="dark">
        <thead>
                <tr>
                    {
                        Array.isArray(header) &&
                            header.map((item, index) => {
                                return <th key={index}>{item}</th>
                            })
                    }
                </tr>
        </thead>
        <tbody>
        { Array.isArray(rows) &&
            rows.map(row => {
               // console.log((filteredItems));
                return <tr key={row?.id} >
                    {Object.values(row).map((item, index) =>  <td key={index}>{item}</td>)}

                    <td><button className='btn btn-primary btn-sm' onClick={() =>onEditRow(row)}><Pencil/></button></td>
                    <td><button className='btn btn-danger btn-sm' onClick={()=>onRowDelete(row)}><Trash/></button></td>
                            </tr>
            })
        }
        </tbody>
    </Table>
}

export default TableComponent;