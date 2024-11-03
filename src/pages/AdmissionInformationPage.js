import { List, Skeleton, Modal, Form, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ButtonComponents from "../components/ButtonComponents";
import HelmetComponents from "../components/HelmetComponents";
import universityApi from "../api/universityApi";
import { useDebounce } from "use-debounce";

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

  & .ant-select-selection-placeholder {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const StyledAdmissionInformation = styled.div`
  padding: 150px 0 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 576px) {
    padding-top: 100px;
  }
`;

const StyledList = styled(List)`
  padding: 20px 100px;
  border: 3px solid;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  max-width: 800px;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding: 20px 30px;
  }
  @media screen and (max-width: 576px) {
    padding: 10px 10px;
  }
  button {
    width: 200px;
  }
`;

const StyledListItem = styled(List.Item)`
  color: #4f4f4f;
  padding-left: 30px !important;
  margin-top: 24px;
  position: relative;
  font-size: 16px;
  line-height: 20px;
  list-style: decimal !important;
`;

const StyledH3 = styled.h3`
  font-weight: 700;
  font-size: 16px;
`;

const StyledLink = styled.a`
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
    transform: translate3d(0, 2px, 0);
  }

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 650px) {
    flex-direction: column;
    gap: 0;
    button {
      width: 400px;
    }
  }
  @media screen and (max-width: 440px) {
    .ant-form-item {
      width: 300px !important;
    }
    button {
      width: 300px;
    }
  }
`;

function AdmissionInformationPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [universityName, setUniversityName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);

  const handleGetNameUniversity = async () => {
    const res = await universityApi.getName();
    setUniversityName(res);
  };

  useEffect(() => {
    onUniversitySearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    handleGetNameUniversity();
  }, []);

  let count = 0;
  const myRef = useRef(count);

  const handleGetAdmissionInformation = async () => {
    const res = await universityApi.getAdmissionInformation(myRef.current);
    setInitLoading(false);
    setData(res);
    setList(res);
  };
  useEffect(() => {
    handleGetAdmissionInformation();
  }, []);

  const onLoadMore = async () => {
    myRef.current += 1;
    setLoading(true);
    const res = await universityApi.getAdmissionInformation(myRef.current);
    setData((prevData) => prevData.concat(res));
    setList((prevData) => prevData.concat(res));
    setLoading(false);
  };
  const onUniversitySearch = async () => {
    const res = await universityApi.search(debouncedSearchTerm);
    setUniversityName(res);
  };
  const onFinish = async (value) => {
    const { name } = value;
    const res = await universityApi.searchAdmissionInformation(name);
    setInitLoading(false);
    setData(res);
    setList(res);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonComponents onClick={onLoadMore} content={"Xem thêm"} />
      </div>
    ) : null;
  return (
    <StyledAdmissionInformation className="admission">
      <StyledForm onFinish={onFinish}>
        <Form.Item
          name="name"
          style={{ width: "400px" }}
          rules={[{ required: true, message: "Vui lòng chọn khu vực!" }]}
        >
          <StyledSelect
            showSearch
            onSearch={(value) => setSearchTerm(value)}
            onDropdownVisibleChange={onUniversitySearch}
            filterOption={false}
            placeholder="Chọn trường"
          >
            {universityName?.map((item) => (
              <Option key={item._id} value={item.universityName}>
                {item.universityName}
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
      <StyledList
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <StyledListItem
            actions={[
              item.admissionInformation ? (
                <StyledLink href={item.admissionInformation} target="_blank">
                  Xem
                </StyledLink>
              ) : (
                <StyledLink
                  onClick={() =>
                    Modal.error({
                      title: "Không có thông tin",
                      content: `${item.universityName} chưa có thông tin tuyển sinh năm 2023, bạn vui lòng quay lại sau nhé !`,
                    })
                  }
                >
                  Xem
                </StyledLink>
              ),
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<StyledH3>{item.universityName}</StyledH3>}
                description={item.address}
              />
            </Skeleton>
          </StyledListItem>
        )}
      />
    </StyledAdmissionInformation>
  );
}

export default AdmissionInformationPage;
