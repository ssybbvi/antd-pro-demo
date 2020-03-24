import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component, useState } from 'react';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export interface PicturesWallProps {
  images: string[];
  onChange?: (iamges: string[]) => void;
}

export interface PicturesWallState {
  previewVisible: boolean;
  previewImage: string;
  fileList: Partial<UploadFile>[];
}

export class PicturesWall extends Component<PicturesWallProps, PicturesWallState> {
  constructor(props: PicturesWallProps) {
    super(props);

    const _fileList = props.images.map((item, index) => {
      return {
        uid: `${index * -1}`,
        name: item,
        status: 'done',
        url: item,
      };
    }) as any;

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: _fileList,
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    const _fileList = fileList as [];

    if (_fileList.every(item => item['status'] === 'done')) {
      const { onChange } = this.props;
      console.log(JSON.parse(JSON.stringify(_fileList)));
      const imges = _fileList.map((item: any) => item.url || item.response.url);
      onChange(imges);
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
