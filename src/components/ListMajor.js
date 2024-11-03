import { List, Skeleton } from "antd";
import React from "react";
import DeleteMajor from "./DeleteMajor";
import EditMajor from "./EditMajor";

function ListMajor({ loadMore, initLoading, list, handleUpdateMajor }) {
  return (
    <div>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        size="small"
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteMajor
                major={list}
                item={item}
                handleUpdateMajor={handleUpdateMajor}
              />,
              <EditMajor
                major={list}
                item={item}
                handleUpdateMajor={handleUpdateMajor}
              />,
            ]}
          >
            <List.Item.Meta
              style={{ display: "flex" }}
              title={item.majorName}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default ListMajor;
