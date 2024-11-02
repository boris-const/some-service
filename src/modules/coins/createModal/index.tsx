//@ts-nocheck
import React, { useState } from "react";
import { Modal, type FormInstance } from "antd";
import CreateForm from "./form"
import { Values } from "../editModal";

interface Props {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;  
}

const CreateFormModal: React.FC<Props> = ({
  open,
  onCreate,
  onCancel,  
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  return (
    <Modal
      open={open}
      title="Создать монету"
      okText="Create"
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
      <CreateForm        
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default CreateFormModal;
