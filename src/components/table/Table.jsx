import React from 'react';
import "./Table.css";
import Table from 'react-bootstrap/Table'
import {Trash,Pencil} from 'react-bootstrap-icons';

const TableComponent = ({header, rows, onRowClick,onRowDelete,filteredItems}) => {
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
                return <tr key={row?.id}  className={filteredItems.includes(row?.id)?'d-none':''}>
                    {Object.values(row).map((item, index) =>  <td key={index}>{item}</td>)}

                    <td><button className='btn btn-primary btn-sm' onClick={() => onRowClick(row)}><Pencil/></button></td>
                    <td><button className='btn btn-danger btn-sm' onClick={()=>onRowDelete(row)}><Trash/></button></td>
                            </tr>
            })
        }
        </tbody>
    </Table>
}

export default TableComponent;