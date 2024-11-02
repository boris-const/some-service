//@ts-nocheck
import React, { useState } from "react";
import { Modal, type FormInstance } from "antd";
import EditForm from "./form"

export interface Values {
  key?: React.Key;
  coinName?: string;
  ticker?: string;
  linkWebCoin?: string;
}

interface Props {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  initialValues: Values;
}

const EditFormModal: React.FC<Props> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  return (
    <Modal
      open={open}
      title="Редактировать монету"
      okText="Confirm"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate(values);
        } catch (error) {
          console.log("Failed:", error);
        }
      }}
    >
      <EditForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default EditFormModal;
