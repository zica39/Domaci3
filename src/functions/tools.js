import Swal from "sweetalert2";
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

export const generateForm = (model,register,errors) =>{
    let output = [];
    model.forEach((field,index)=>{
        output.push(
            <div key={index} className="form-group" >
                <label htmlFor={field.name} className='float-left font-weight-bolder'>{camelPad(field.name)}</label>
                <input type={field.type} className="form-control shadow-sm" id={field.name} aria-describedby={field.name}
                       {...register(field.name)}
                       placeholder={"Enter "+camelPad(field.name)}

                />
                <small className="text-danger text-left"> {errors[field.name]?.message}</small>

            </div>
        )
    })
    return output;
}

export const getToken = () =>{
    return 'Bearer '+loadFromStorage('id_token');
}

export const swalAlert = (icon,title,text) =>{
   return  Swal.fire({
        icon: icon,
        title: title,
        text: text
    })
}

export const formatDate = (date) => {
    date = new Date(date);

    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

export const camelPad = (str) => {
    return str
    // Look for long acronyms and filter out the last letter
    .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
    // Look for lower-case letters followed by upper-case letters
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    // Look for lower-case letters followed by numbers
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/^./, function(str){ return str.toUpperCase(); })
    // Remove any white space left around the word
    .trim();
}