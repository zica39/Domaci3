import React from 'react';

import DropdownElement from '../components/DropdownElement/DropdownElement';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    title: 'Example/Dropdown',
    component: DropdownElement,
};

const Template = (args) => <DropdownElement {...args} />;

export const Dropdown = Template.bind({});
Dropdown.args = {

};

