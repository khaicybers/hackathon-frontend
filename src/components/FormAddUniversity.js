import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
import UploadImage from "./UploadImage";
import universityApi from "../api/universityApi";
function FormAddUniversity({
  isModalVisibleAdd,
  handleOkAdd,
  handleCancelAdd,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLogoUrl, setImageLogoUrl] = useState(null);

  async function handleAddUniversity(data) {
    return await universityApi.create(data);
  }
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await handleAddUniversity({
        ...values,
        image: imageUrl,
        logo: imageLogoUrl,
      });
      form.resetFields();
      message.success("Thêm trường thành công");
    } catch (error) {
      message.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isModalVisibleAdd}
      onOk={handleOkAdd}
      onCancel={handleCancelAdd}
      footer={false}
      bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Mã trường"
          name="universityCode"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter university code" />
        </Form.Item>
        <Form.Item label="Logo" name="logo">
          <UploadImage setImage={setImageLogoUrl} />
        </Form.Item>
        <Form.Item
          label="Tên trường"
          name="universityName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter university name" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input placeholder="Enter address" />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input placeholder="Enter website" />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <UploadImage setImage={setImageUrl} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Thêm Trường
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormAddUniversity;
