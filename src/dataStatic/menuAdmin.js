import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  FieldBinaryOutlined,
  OrderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Trường Đại Học", "1", <PieChartOutlined />),
  getItem("Ngành đào tạo", "2", <OrderedListOutlined />),
  getItem("Điểm chuẩn", "3", <FieldBinaryOutlined />),
  getItem("Đăng xuất", "4", <LogoutOutlined />),
];

export default items;
