import React from 'react';

import FormModal from '../components/formModal/FormModal';

import * as yup from "yup";
import {QueryClient, QueryClientProvider} from "react-query";

export default {
    title: 'Example/Modal',
    component: FormModal,
};
const queryClient = new QueryClient();

const Template = (args) => <QueryClientProvider client={queryClient}><FormModal {...args} /></QueryClientProvider>;

export const CreateEditModal = Template.bind({});
CreateEditModal.args = {
    openModal:{open:true,action: 'Create', title:'smth...',key:'key'},
    setOpenModal:()=>{},

    model: [
        {
            name: 'textField',
            type: 'text',
            default: 'example text field',
        },
        {
            name: 'numberField',
            type: 'number',
            default: '333',
        }],

    schema:yup.object().shape({
        textField: yup.string().required(),
        numberField:yup.number().required()
    }),

};

