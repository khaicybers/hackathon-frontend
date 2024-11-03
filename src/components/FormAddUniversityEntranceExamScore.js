import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message, Modal } from "antd";
const { Option } = Select;
import options from "../dataStatic/dataOptions";
import yearList from "../dataStatic/dataYear";
import majorApi from "../api/majorApi";
import universityApi from "../api/universityApi";
import universityEntranceExamScoreApi from "../api/universityEntranceExamScoreApi";
import { useDebounce } from "use-debounce";

function FormAddUniversityEntranceExamScore({
  isModalVisibleAdd,
  handleCloseAdd,
}) {
  const [universityName, setUniversityList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [form] = Form.useForm();
  const [selectedValues, setSelectedValues] = useState([]);

  const [searchMajorTerm, setSearchMajorTerm] = useState("");
  const [debouncedSearchMajorTerm] = useDebounce(searchMajorTerm, 200);
  const [searchUniversityTerm, setUniversityTerm] = useState("");
  const [debouncedUniversityTerm] = useDebounce(searchUniversityTerm, 200);

  useEffect(() => {
    onUniversitySearch();
  }, [debouncedUniversityTerm]);

  useEffect(() => {
    onMajorSearch();
  }, [debouncedSearchMajorTerm]);

  useEffect(() => {
    const fetchUniversityList = async () => {
      const response = await universityApi.getName();
      setUniversityList(response);
    };

    const fetchMajorList = async () => {
      const res = await majorApi.getAll();
      setMajorList(res);
    };

    fetchUniversityList();
    fetchMajorList();
  }, []);

  const onFinish = async (values) => {
    try {
      const {
        universityCode,
        majorName,
        majorYear,
        universityEntranceExamScore,
      } = values;

      const score = universityEntranceExamScore[0];
      const subjectGroup = selectedValues;
      const data = {
        universityCode,
        majorName,
        majorYear,
        score,
        subjectGroup,
      };

      const res = await universityEntranceExamScoreApi.create(data);
      if (res) {
        message.success("Thêm điểm thành công");
      } else {
        throw new Error("Lỗi không xác định khi thêm điểm");
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const onUniversitySearch = async () => {
    const res = await universityApi.search(debouncedUniversityTerm);
    setUniversityList(res);
  };
  const onMajorSearch = async () => {
    const res = await majorApi.search(debouncedSearchMajorTerm);
    setMajorList(res);
  };

  const handleSelectChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <Modal
      title="Thêm điểm thi"
      footer={false}
      open={isModalVisibleAdd}
      onCancel={handleCloseAdd}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="universityCode"
          label="Tên trường"
          rules={[{ required: true, message: "Vui lòng chọn trường" }]}
        >
          <Select
            showSearch
            onSearch={(value) => setUniversityTerm(value)}
            onDropdownVisibleChange={onUniversitySearch}
            filterOption={false}
            placeholder="Chọn khu vực"
          >
            {universityName?.map((item) => (
              <Option key={item._id} value={item.universityCode}>
                {item.universityName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="majorName"
          label="Tên ngành"
          rules={[{ required: true, message: "Vui lòng chọn tên ngành" }]}
        >
          <Select
            placeholder="Chọn tên ngành"
            showSearch
            onSearch={(value) => setSearchMajorTerm(value)}
            onDropdownVisibleChange={onMajorSearch}
            filterOption={false}
          >
            {majorList.map((major) => (
              <Option key={major.majorName} value={major.majorName}>
                {major.majorName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="subjectGroup"
          label="Khối xét tuyển"
          rules={[{ required: true, message: "Vui lòng chọn khối xét tuyển" }]}
        >
          <Select
            mode="tags"
            value={selectedValues}
            onChange={handleSelectChange}
            placeholder="Chọn giá trị"
            style={{ width: "100%" }}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="majorYear"
          label="Năm"
          rules={[{ required: true, message: "Vui lòng chọn năm" }]}
        >
          <Select placeholder="Chọn năm" showSearch filterOption={false}>
            {yearList.map((year, index) => (
              <Option key={index} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["universityEntranceExamScore", "0", "scores"]}
          label="Điểm thi"
          rules={[{ required: true, message: "Vui lòng nhập điểm thi" }]}
        >
          <Input placeholder="Nhập điểm thi" />
        </Form.Item>
        <Form.Item
          name={["universityEntranceExamScore", "0", "majorCode"]}
          label="Mã ngành"
          rules={[{ required: true, message: "Vui lòng nhập mã ngành" }]}
        >
          <Input placeholder="Nhập mã ngành" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormAddUniversityEntranceExamScore;
