import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input } from "antd";
import React from "react";

export const InstanceEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
