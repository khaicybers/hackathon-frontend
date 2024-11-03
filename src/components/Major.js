import { Form, message, Button, Space } from "antd";
import React, { useState, useEffect, useRef } from "react";
import ListMajor from "./ListMajor";
import SearchMajor from "./SearchMajor";
import FormAddMajor from "./FormAddMajor";
import majorApi from "../api/majorApi";
import { useDebounce } from "use-debounce";
import styled from "styled-components";

const StyledSpace = styled(Space)`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

function Major() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);

  let count = 0;
  const myRef = useRef(count);
  const onLoadMore = async () => {
    myRef.current += 10;
    try {
      setLoading(true);
      const res = await majorApi.getLoad(myRef.current);
      setData((prevData) => prevData.concat(res));
      setList((prevData) => prevData.concat(res));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  const loadDataMajor = async () => {
    try {
      const res = await majorApi.getLoad(myRef.current);
      setInitLoading(false);
      setData(res);
      setList(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadDataMajor();
  }, []);

  const onFinish = async (values) => {
    try {
      await majorApi.create(values);
      message.success("Thêm ngành thành công");
      form.resetFields();
      loadDataMajor();
    } catch (error) {
      message.error(error.response.data);
    }
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 70,
          lineHeight: "32px",
          padding: "20px 0",
        }}
      >
        <Button onClick={onLoadMore}>xem thêm</Button>
      </div>
    ) : null;

  const handleSearch = async () => {
    try {
      const response = await majorApi.search(debouncedSearchTerm);
      setSearch(response);
      if (!value || value === "0") {
        loadDataMajor();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSearch = async (value) => {
    try {
      const response = await majorApi.search(value.search);
      setList(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <StyledSpace align="center" layout="inline">
        <FormAddMajor onFinish={onFinish} isLoading={loading} />
        <SearchMajor
          search={search}
          handleSearch={handleSearch}
          onSearch={onSearch}
          setSearchTerm={setSearchTerm}
        />
      </StyledSpace>
      <ListMajor
        majors={majors}
        loadMore={loadMore}
        initLoading={initLoading}
        list={list}
        handleUpdateMajor={loadDataMajor}
      />
    </div>
  );
}

export default Major;
