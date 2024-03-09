import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex } from 'antd';
import { useNotification  } from "@refinedev/core";

import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../constants";

const items = [
  {
    key: 'production',
    label: 'Production Mode',
  },
  {
    key: 'development',
    label: 'Development Mode',
  },

];

export const ControlButton = ({ recordItemId }) => {
  const { open, close } = useNotification();
  const axiosInstance = axios.create();

  const onMenuClick: MenuProps['onClick'] = async (e) => {
    let mode = e.key;

    if (mode) {
      const apiUrl = API_URL + '/api/instances/' + recordItemId + '/restart/' + mode;
      const token = localStorage.getItem(TOKEN_KEY);

      try {
        const { data, status } = await axios.post(apiUrl, {}, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        open?.({
          type: "success",
          message: "Please allow about 10 seconds for the operation to complete",
          description: "Restarting your instance"
        });
      } catch (error: any) {
        let errorMessage = error.message

        console.log(error)

        open?.({
          type: "error",
          message: errorMessage,
          description: "Sorry, something went wrong 😭"
        });
      }
    }
  };

  return (
    <Flex align="flex-start" gap="small" vertical>
      <Dropdown.Button size="small" menu={{ items, onClick: onMenuClick }}>Restart</Dropdown.Button>
    </Flex>
  )
};
