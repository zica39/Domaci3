import logo from './logo512.png'
import {loadFromStorage} from "../../functions/tools";

const Welcome = ()=>{
    const user = loadFromStorage('username');

    return <div className='container-fluid'>
        <h1 className='mt-3'>Welcome {user} to React App</h1>
        <h4 className="text-muted">Manage yours movies, books and people</h4>
        <img className='img-fluid' alt="React-app" width='256' src={logo}/>
    </div>
}

export default Welcome;