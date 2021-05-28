import {Pagination} from "react-bootstrap";

const PaginationComponent = ({itemCount,setPage,page,size}) => {

    let active = page + 1;
    let items = [];
    let count = Math.ceil(itemCount/(size));

    for (let number = 1; number <= count; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={()=>setPage(number-1)}>
                {number}
            </Pagination.Item>,
        );
    }

    return <div className="d-flex justify-content-center">
        <Pagination >
            <Pagination.Prev disabled={active===1} onClick={()=>{setPage(pre=>pre-1)}}/>
            {items}
            <Pagination.Next disabled={active===count} onClick={()=>{setPage(pre=>pre+1)}} />
        </Pagination>
    </div>

}

export default PaginationComponent;