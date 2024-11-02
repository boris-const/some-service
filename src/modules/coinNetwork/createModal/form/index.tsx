import { FormInstance, Input, Form } from "antd";
import { useEffect } from "react";
import { Values } from "..";

interface CollectionCreateFormProps {  
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({  
  onFormInstanceReady,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"      
    >
      <Form.Item
        name="coinNetworkName"
        label="Название"
        rules={[{ required: true, message: "Введите короткое название" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="shortName"
        label="Короткое название"
        rules={[{ required: true, message: "Введите короткое название" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="linkScanner"
        label="Ссылка на сканер"
        rules={[{ required: true, message: "Введите короткое название" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CollectionCreateForm;
