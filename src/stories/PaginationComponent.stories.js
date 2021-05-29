import React from 'react';

import PaginationComponent from '../components/paginationComponent/PaginationComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    title: 'Example/Pagination',
    component: PaginationComponent,
};

const Template = (args) => <PaginationComponent {...args} />;

export const Pagination = Template.bind({});
Pagination.args = {
    itemCount: 30,
    page: 0,
    size: 5,
    setPage: ()=>{}
};

