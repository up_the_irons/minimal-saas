import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex } from 'antd';

const onMenuClick: MenuProps['onClick'] = (e) => {
  const clickedItem = items.find(item => item.key === e.key);
  if (clickedItem) {
    console.log('Clicked item:', clickedItem);
    console.log('Clicked mode:', clickedItem.mode);
  }
};

const items = [
  {
    key: '1',
    label: 'Production Mode',
    mode: 'production',
  },
  {
    key: '2',
    label: 'Development Mode',
    mode: 'development'
  },

];

export const ControlButton = () => {
  return (
  <Flex align="flex-start" gap="small" vertical>
    <Dropdown.Button size="small" menu={{ items, onClick: onMenuClick }}>Restart</Dropdown.Button>
  </Flex>
  )
};
