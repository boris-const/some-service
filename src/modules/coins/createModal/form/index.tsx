import { FormInstance, Input, Form } from "antd";
import { useEffect } from "react";
import { Values } from "../../editModal";


interface Props {  
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

const CreateForm: React.FC<Props> = ({
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
        name="coinName"
        label="Название"
        rules={[{ required: true, message: "Введите название" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ticker"
        label="Тикер"
        rules={[{ required: true, message: "Введите тикер" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="linkWebCoin"
        label="Ссылка на сайт"
        rules={[{ required: true, message: "Укажите ссылку" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
