import React from 'react';

import PageSizeSelect from '../components/pageSizeSelect/PageSizeSelect';

export default {
    title: 'Example/Select',
    component: PageSizeSelect,
    argTypes: {
    size: {
      options: [5,10,15,20],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => <PageSizeSelect {...args} />;

export const Select = Template.bind({});
Select.args = {
    size:10,
    setSize: ()=>{},
    setPage: ()=>{}
};
