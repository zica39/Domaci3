import * as yup from "yup";

export const movie_model = [
    {
        name: 'directorName',
        type: 'text',
        default: '',
    },
    {
        name: 'duration',
        type: 'number',
        default: '',
    },
    {
        name: 'name',
        type: 'text',
        default: '',
    },
    {
        name: 'rating',
        type: 'number',
        default: '',
    },
    {
        name: 'writerName',
        type: 'text',
        default: '',
    }
]

export const movie_schema = yup.object().shape({
    directorName: yup.string().required(),
    duration: yup.number().required(),
    name: yup.string().required(),
    rating: yup.number().required(),
    writerName:yup.string().required()
});
