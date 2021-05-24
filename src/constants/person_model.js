import * as yup from "yup";

export const person_model = [
    {
        name: 'age',
        type: 'number',
        default: '',
    },
    {
        name: 'dateOfBirth',
        type: 'date',
        default: '',
    },
    {
        name: 'firstName',
        type: 'text',
        default: '',
    },
    {
        name: 'lastName',
        type: 'text',
        default: '',
    },
    {
        name: 'gender',
        type: 'select',
        default: '',
        options:['MALE','FEMALE','OTHER']
    },
    {
        name: 'occupation',
        type: 'text',
        default: '',
    }
];

export const person_schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().required(),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required(),
    occupation: yup.string().required()
});
