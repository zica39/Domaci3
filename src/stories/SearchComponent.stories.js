import React from 'react';

import SearchComponent from '../components/SearchComponent/SearchComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    title: 'Example/Search',
    component: SearchComponent,
};

const Template = (args) => <SearchComponent {...args} />;

export const Search = Template.bind({});
Search.args = {
    filter: '',
    setFilter: ()=>{}
};
