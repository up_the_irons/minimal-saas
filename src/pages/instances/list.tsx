import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

import {
  ControlButton
} from "./control"

export const InstanceList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width="5%"/>
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="url" title={"URL"} render={(value: string) => <a href={value} target='_blank'>{value}</a>}/>
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          width="5%"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              {
              /*
              <ShowButton hideText size="small" recordItemId={record.id} />
              */
              }
              <ControlButton />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
