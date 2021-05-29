import React from 'react';

import Login from '../pages/login/Login';
import {BrowserRouter} from "react-router-dom";

export default {
  title: 'Example/Pages',
  component: Login,
};

const Template = (args) => <BrowserRouter><Login {...args} /></BrowserRouter>;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  storyBookMode: true
};



