import React from 'react';

import Modal from '../components/DeleteModal/DeleteModal';

export default {
  title: 'Example/Modal',
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const DeleteModal = Template.bind({});
DeleteModal.args = {
  id: 0,
  title: 'Something',
};
