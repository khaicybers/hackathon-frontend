import { Form, Input, Button } from "antd";

function FormAddMajor({ onFinish, isLoading }) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      style={{
        marginBottom: "20px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <Form.Item
        name="majorName"
        label="Tên chuyên ngành"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên chuyên ngành",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Thêm chuyên ngành
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormAddMajor;
