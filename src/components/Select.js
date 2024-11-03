import React, { useState, useEffect, useCallback } from "react";
import { Select, Form, message } from "antd";
const { Option } = Select;
import city from "../dataStatic/dataCity";
import styled from "styled-components";
import ButtonComponents from "./ButtonComponents";
import majorApi from "../api/majorApi";
import universityApi from "../api/universityApi";
import { useDebounce } from "use-debounce";

const StyledSelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 992px) {
    flex-direction: column;
    gap: 0;
    .ant-form-item {
      width: 500px !important;
    }
  }
  @media screen and (max-width: 576px) {
    .ant-form-item {
      width: 300px !important;
    }
  }
`;

const StyledSelect = styled(Select)`
  &.ant-select {
    width: 100%;
    height: 40px;
    transition: 0.2s linear;
    border: 2.5px solid black;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    overflow: hidden;
    &.ant-select-selector {
      border: none !important;
    }
    &:focus {
      outline: none;
      border: 0.5px solid black;
      box-shadow: -5px -5px 0px black;
    }
  }
  &::placeholder {
    color: #999;
    font-weight: bold;
  }
  & .ant-select-selection-placeholder {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

function SelectOption({ university, setUniversity }) {
  const [loading, setLoading] = useState(true);
  const [selectedMajors, setSelectedMajors] = useState(null);
  const [universityCode, setUniversityCode] = useState([]);
  const [form] = Form.useForm();
  const [citys, setCitys] = useState(city);
  const [majorList, setMajorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);

  useEffect(() => {
    handleGetAllMajor();
  }, []);
  useEffect(() => {
    onMajorSearch();
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if (university.length > 0) {
      const universityCodes = university.map((item) => item.universityCode);
      setUniversityCode(universityCodes);
    }
  }, [university]);

  const handleGetAllMajor = async () => {
    const res = await majorApi.getAll();
    setMajorList(res);
  };

  const handleSelectMajorChange = (values) => {
    setSelectedMajors(values);
  };
  const onFinish = async (values) => {
    setLoading(true);
    const res = await universityApi.suggest({
      subjectGroup: [values.subjectGroup],
      majorName: values.majorName,
      city: values.city,
    });
    setUniversity(res);
    if (res.length < 1) {
      message.error(
        "Không tìm thấy thông tin bạn tìm. Vui lòng thử lại hoặc tìm kiếm với ngành, khu vực khác"
      );
    }
    setLoading(false);
    setLoading(false);
  };

  const handleSearchCity = useCallback(
    (value) => {
      const filteredOptions = city.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitys(filteredOptions);
    },
    [city]
  );
  const onMajorSearch = async () => {
    const res = await majorApi.search(debouncedSearchTerm);
    setMajorList(res);
  };
  return (
    <StyledSelectWrap className="select">
      <StyledForm onFinish={onFinish} form={form}>
        <Form.Item
          name="majorName"
          style={{ width: "300px" }}
          rules={[{ required: true, message: "Vui lòng chọn ngành!" }]}
        >
          <StyledSelect
            showSearch
            onSearch={(value) => setSearchTerm(value)}
            filterOption={false}
            placeholder="Chọn ngành"
            onChange={handleSelectMajorChange}
            onDropdownVisibleChange={onMajorSearch}
          >
            {majorList.map((major) => (
              <Option key={major.majorName} value={major.majorName}>
                {major.majorName}
              </Option>
            ))}
          </StyledSelect>
        </Form.Item>
        <Form.Item
          name="city"
          style={{ width: "200px" }}
          rules={[{ required: true, message: "Vui lòng chọn khu vực!" }]}
        >
          <StyledSelect
            showSearch
            onSearch={handleSearchCity}
            filterOption={false}
            placeholder="Chọn khu vực"
          >
            {citys.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </StyledSelect>
        </Form.Item>
        <Form.Item>
          <ButtonComponents
            type="primary"
            htmlType="submit"
            content={"Tìm kiếm"}
          />
        </Form.Item>
      </StyledForm>
    </StyledSelectWrap>
  );
}

export default SelectOption;
