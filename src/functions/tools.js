import Form from "react-bootstrap/Form";
import React from "react";

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

export const generateFormFields = (model,formData,setFormData) => {


    return model.map((field,index) =>{
        return <div className="form-group" key={index}>
            <label htmlFor="exampleInputEmail1">{field.name}</label>
            <input type={field.type} className="form-control shadow-sm" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder={'Enter '+ field.name}
                   value={formData[field.name]}
                   onChange={(e) => setFormData(prevState => {
                       return swap(prevState,field.name,e.target.value);
                   })}
            />

        </div>
    })
}

function swap(obj, name,value) {
    obj[name] = value;
    return obj;
}