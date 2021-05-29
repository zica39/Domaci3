import React from 'react';

import TableComponent from '../components/table/Table';

export default {
    title: 'Example/Table',
    component: TableComponent,
};

const Template = (args) => <TableComponent {...args} />;

export const Table = Template.bind({});
Table.args = {
    data: [{
        id: 1,
        isbn: "Matrix revolution",
        genre: "Science fiction",
        publishedDate: "2003-21-03",
        publisherName: "Warner Bros",
        writerName: "Lana Wachovski"
    }],
};

