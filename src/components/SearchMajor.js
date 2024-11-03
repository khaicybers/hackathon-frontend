import { Select, Form, Button } from "antd";
import { Option } from "antd/es/mentions";

function SearchMajor({ search, handleSearch, onSearch, setSearchTerm }) {
  return (
    <Form
      onFinish={onSearch}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "5px",
      }}
    >
      <Form.Item name="search">
        <Select
          showSearch
          onSearch={(value) => setSearchTerm(value)}
          onDropdownVisibleChange={handleSearch}
          filterOption={false}
          placeholder="Tìm ngành"
          style={{ width: "200px" }}
        >
          {search?.map((item) => (
            <Option key={item._id} value={item.majorName}>
              {item.majorName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SearchMajor;
