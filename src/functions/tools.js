export const saveToStorage = (name,data) =>{
    localStorage.setItem(name,JSON.stringify(data));
}
export const loadFromStorage = (name) =>{
    return JSON.parse(localStorage.getItem(name));
}
export const destroyData = (name) => {
    localStorage.removeItem(name);
}