import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { GrayWrap } from '../GrayWrap';
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { error } from 'console';

type FormData = {
  password: string;
  remember: boolean;
};

export function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    AuthStore: { logIn },
  } = useAuthContext();

  const navigate = useNavigate();
  const [form] = useForm<FormData>();

  const onFinish = (values: FormData) => {
    logIn(values.password).then((res) => {
      if (res) {
        navigate('/');
        form.resetFields();
      } else {
        form.setFields([{ name: 'password', value: values.password, errors: ['Incorrect Password'] }]);
      }
    });
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 50,
          background: ' rgba(0, 0, 0, 0.3)',
        }}
      ></div>
      <div style={{ position: 'absolute', zIndex: 60, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <GrayWrap width="400px">
          <Form
            form={form}
            colon={true}
            name="login"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
              style={{ marginBottom: 0 }}
            >
              <Input.Password
                type="password"
                prefix={<LockOutlined />}
                placeholder="Password"
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </GrayWrap>
      </div>
    </>
  );
}
