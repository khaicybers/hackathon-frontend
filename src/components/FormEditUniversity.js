import { Modal, Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import ChangeImage from "./ChangeImage";
import universityApi from "../api/universityApi";
function FormEditUniversity({
  university,
  isModalVisibleFormEdit,
  setIsModalVisibleFormEdit,
  fetchUniversities,
  pageSize,
  currentPage,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [universityData, setUniversityData] = useState(null);
  const [imageUrl, setImageUrl] = useState(university?.image);
  const [imageLogoUrl, setImageLogoUrl] = useState(university?.universityLogo);
  useEffect(() => {
    if (university) {
      setUniversityData(university);
    }
  }, [university]);

  useEffect(() => {
    if (universityData) {
      form.setFieldsValue(universityData);
    }
  }, [universityData, form]);

  async function handleEditUniversity(data) {
    let id = university._id;
    await universityApi.edit(id, data);
  }

  const onFinishEdit = () => {
    setLoading(true);
    form.submit();
  };
  const onFinishEditForm = async (values) => {
    setLoading(true);
    try {
      handleEditUniversity({
        ...values,
        image: imageUrl,
        logo: imageLogoUrl,
      });
      setIsModalVisibleFormEdit(false);
      await fetchUniversities(pageSize, currentPage);
      message.success("Cập nhật thành công");
    } catch (error) {
      console.error(error);
      message.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisibleFormEdit(false);
  };
  return (
    <Modal
      open={isModalVisibleFormEdit}
      onCancel={handleCancel}
      title="Edit University"
      okText="Update"
      cancelText="Cancel"
      onOk={onFinishEdit}
      bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}
    >
      {universityData && (
        <Form
          layout="vertical"
          form={form}
          initialValues={universityData}
          onFinish={onFinishEditForm}
        >
          <Form.Item
            label="Mã trường"
            name="universityCode"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter university code" />
          </Form.Item>

          <Form.Item
            label="Tên trường"
            name="universityName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter university name" />
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <ChangeImage
              imageSrc={universityData.universityLogo}
              setImage={setImageLogoUrl}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input placeholder="Enter website" />
          </Form.Item>
          <Form.Item label="Ảnh" name="image">
            <ChangeImage
              imageSrc={universityData.image}
              setImage={setImageUrl}
            />
          </Form.Item>
          <Form.Item label="Tuyển sinh" name="admissionInformation">
            <Input placeholder="Link tuyển sinh" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default FormEditUniversity;
