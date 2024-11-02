import { observer } from 'mobx-react-lite';
import { Button, Typography, Form, FormProps } from 'antd';

import { GrayWrap } from '../../../../../../common/components/GrayWrap';
import TextArea from 'antd/es/input/TextArea';
import { useModulesContext } from '../../../../../../context/ModulesContextProvider';

type Props = {
  id: string;
};

type FieldType = {
  comment?: string;
};

const View = ({ id }: Props) => {
  const { ExchangesStore } = useModulesContext();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (typeof values.comment === 'string' && values.comment !== '') {
      ExchangesStore.addComment({ claimId: id, comment: values.comment });
      form.resetFields();
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <GrayWrap>
      <Typography>Комментарий</Typography>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          name="comment"
          rules={[{ required: true, message: 'Please input your comment!' }]}
          style={{ marginBottom: '10px' }}
        >
          <TextArea placeholder="Введите комментарий..." />
        </Form.Item>
        <Form.Item style={{ marginBottom: '0px' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </GrayWrap>
  );
};

export const ExDetailsCommentForm = observer(View);