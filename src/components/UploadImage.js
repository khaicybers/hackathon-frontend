import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import ImageUploading from "react-images-uploading";
import React, { useState } from "react";

function UploadImage({ imageUrl, setImage }) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    if (imageList.length > 0) {
      setImage(imageList[0].data_url);
    } else {
      setImage("");
    }
  };
  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="upload__image-wrapper">
          <Space>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            <Button onClick={onImageRemoveAll}>Remove all images</Button>
          </Space>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image["data_url"]}
                alt=""
                width="100"
                style={{ margin: "5px 0" }}
              />
              <div className="image-item__btn-wrapper">
                <Space>
                  <Button onClick={() => onImageUpdate(index)}>
                    <EditOutlined /> Update
                  </Button>
                  <Button onClick={() => onImageRemove(index)}>
                    <DeleteOutlined /> Remove
                  </Button>
                </Space>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}

export default UploadImage;
