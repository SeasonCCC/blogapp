import React, { useState } from 'react';
import { withRouter } from 'react-router';

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Upload,
  DatePicker,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
// import './details.scss';


const Details = () => (
  <div>
    <Row gutter={16}>
      <Col span={16}>
        <Card bordered={false}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="middle"
          >
            <Form.Item label="Title" labelCol={{ span: 2 }} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Abstract" labelCol={{ span: 2 }}>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Project Link" labelCol={{ span: 2 }}>
              <Input />
            </Form.Item>

            <Form.Item label="Date" labelCol={{ span: 2 }}>
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Screenshot"
              labelCol={{ span: 2 }}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </Form.Item>

            {/* <Form.Item label="Button" labelCol={{ span: 2 }}> */}
            <Button type="primary">Submit</Button>
            {/* </Form.Item> */}
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
);

export default withRouter(Details);
