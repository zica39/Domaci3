
export const saveToStorage = (name,data) =>{
    localStorage.setItem(name,JSON.stringify(data));
}
export const loadFromStorage = (name) =>{
    return JSON.parse(localStorage.getItem(name));
}
export const destroyData = (name) => {
    localStorage.removeItem(name);
}
export const getHeaders = (collection) =>{
    if(collection.length){
        if(Array.isArray(collection[0]) === false)  {
            return [...Object.keys(collection[0]),'...','...'];
        }
    }
    return [];
}

export const generateFormData = (model) =>{
    let output = {};
    model.forEach(field=>{
        output[field.name] = field.default;
    })
    return output;
}

export const getToken = () =>{
    return 'Bearer '+loadFromStorage('id_token');
}
