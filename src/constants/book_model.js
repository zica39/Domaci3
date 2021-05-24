import * as yup from "yup";

export const book_model = [
    {
        name: 'isbn',
        type: 'text',
        default: '',
    },
    {
        name: 'writerName',
        type: 'text',
        default: '',
    },
    {
        name: 'publisherName',
        type: 'text',
        default: '',
    },
    {
        name: 'publishedDate',
        type: 'date',
        default: '',
    },
    {
        name: 'genre',
        type: 'text',
        default: '',
    }
    ];

export const book_schema = yup.object().shape({
    publisherName: yup.string().required(),
    isbn: yup.string().required(),
    writerName: yup.string().required(),
    publishedDate: yup.date().required(),
    genre:yup.string().required()
});

