import React from 'react';

import GridButton from '../components/gridButton/GridButton';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Example/Button',
  component: GridButton,
};

const Template = (args) => <GridButton {...args} />;

export const AddButton = Template.bind({});
AddButton.args = {
  label: 'something',
};
