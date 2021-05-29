import PropTypes from 'prop-types';

const PageSizeSelect = ({size,setSize,setPage}) => {
    return <label className="float-left my-1">Show items:
        <select className="form-select form-control-sm mx-2" aria-label="Default select example"
        onChange={(e)=>{setPage(0);setSize(parseInt(e.target.value))}}
                value={size}
        >
        <option value="5">5</option>
        <option value="10" >10</option>
        <option value="15">15</option>
        <option value="20">20</option>
    </select></label>
}

export default PageSizeSelect;

PageSizeSelect.prototype = {
    size:PropTypes.number,
    setSize: PropTypes.func,
    setPage: PropTypes.func
}