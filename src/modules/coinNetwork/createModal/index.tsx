import { useState } from "react";
import { Modal, type FormInstance } from "antd";
import CollectionCreateForm from "./form";

export interface Values {
  key?: React.Key;
  coinNetworkName?: string;
  linkScanner?: string;
}

interface Props {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CreateFormModal: React.FC<Props> = ({ open, onCreate, onCancel }) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  return (
    <Modal
      open={open}
      title="Создать сеть"
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
      <CollectionCreateForm
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default CreateFormModal;
