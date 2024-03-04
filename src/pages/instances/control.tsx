import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex } from 'antd';

const onMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const items = [
  {
    key: '1',
    label: 'Production Mode',
  },
  {
    key: '2',
    label: 'Development Mode',
  },

];

export const ControlButton = () => {
  return (
  <Flex align="flex-start" gap="small" vertical>
    <Dropdown.Button size="small" menu={{ items, onClick: onMenuClick }}>Restart</Dropdown.Button>
  </Flex>
  )
};
