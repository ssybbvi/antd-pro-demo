import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { UploadFile, UploadListType } from 'antd/lib/upload/interface';
import defaultSettings from '../../../../config/defaultSettings';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export interface PicturesWallProps {
  listType: UploadListType;
  images: string[];
  onChange?: (iamges: string[]) => void;
}

export interface PicturesWallState {
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile<any>[];
}

export class PicturesWall extends Component<PicturesWallProps, PicturesWallState> {
  constructor(props: PicturesWallProps) {
    super(props);

    // eslint-disable-next-line no-underscore-dangle
    const _fileList = props.images.map(
      (item, index) =>
        ({
          uid: `${index * -1}`,
          name: item,
          status: 'done',
          url: item,
        } as UploadFile<any>),
    );

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: _fileList,
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    // eslint-disable-next-line no-underscore-dangle
    const _fileList = fileList as [];

    if (_fileList.every(item => item.status === 'done')) {
      const { onChange } = this.props;
      const imges = _fileList.map((item: any) => item.url || item.response.url);
      if (onChange) {
        onChange(imges);
      }
    }
  };

  render() {
    const { listType } = this.props;
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
          multiple
          action={`${defaultSettings.apiUrl}upload`}
          listType={listType}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 30 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
