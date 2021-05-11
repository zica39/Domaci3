export const changeData = (state, action) => {

    switch(action.type){
        case 'filter':
            action.setFilteredItems(state.filter(item => !item.title.includes(action.data)).map(item=>item.id));
            return state;
        case 'add':
            const newId = (state[state.length-1]?.id)?(state[state.length-1]?.id)+1:1;
            return [...state, {id: newId, ...action.data}]
        case 'edit':
            return state.map(item => {
                if(item.id === action.data.id){
                    return action.data
                }
                return item;
            });
        case 'delete':
            return state.filter(item =>(item.id !== action.data.id) );
        default:
            return state ;
    }
}