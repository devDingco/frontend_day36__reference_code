"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import styles from "./styles.module.css";
import useMyApisWrite from "./hook";
import { IMyApiAddProps } from "./types";
import { useEffect } from "react";

export default function MyApiAdd(props: IMyApiAddProps) {
  const { isEdit } = props;
  const [form] = Form.useForm();
  const {
    data,
    setData,
    onClickSubmit,
    updateWriter,
    updateTitle,
    updateContents,
    getPreviousData,
    onClickUpdate,
  } = useMyApisWrite(form, isEdit);

  useEffect(() => {
    getPreviousData();
  }, []);
  console.log("data:::", data);
  return (
    <div className={styles.writeBody}>
      <Form
        initialValues={data}
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.Item
          label="writer"
          name="writer"
          rules={[{ required: true, message: "Please input writer!" }]}
        >
          <Input
            readOnly={isEdit ? false : true}
            value={data.writer}
            onChange={(e) => updateWriter(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="contents"
          name="contents"
          rules={[{ required: true, message: "Please input contents!" }]}
        >
          <Input
            readOnly={isEdit ? false : true}
            value={data.contents}
            onChange={(e) => updateContents(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input
            readOnly={isEdit ? false : true}
            value={data.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={isEdit ? onClickUpdate : onClickSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
