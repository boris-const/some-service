import { FormInstance, Input, Form } from "antd";
import { useEffect } from "react";
import { Values } from "..";

interface Props {
  initialValues: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

const EditForm: React.FC<Props> = ({
  initialValues,
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
      initialValues={initialValues}
    >
      <Form.Item
        name="coinNetworkName"
        label="Название"
        rules={[{ required: true, message: "Введите название" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="linkScanner"
        label="Сканер"
        rules={[{ required: true, message: "Введите ссылку на сканер" }]}
      >
        <Input />
      </Form.Item>      
    </Form>
  );
};

export default EditForm;
