"use client";
import React from "react";
import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import styles from "./styles.module.css";
import useMyApisWrite from "./hook";
import { IMyApiAddProps } from "./types";

export default function MyApiAdd(props: IMyApiAddProps) {
  const { isEdit } = props;
  
  // Form.useForm() 훅으로 폼 인스턴스 생성
  const [form] = Form.useForm();
  
  // Supabase와 연동된 CRUD 기능들을 가져옴
  const {               
    onClickSubmit,      
    getPreviousData,    
    onClickUpdate,      
  } = useMyApisWrite(form, isEdit);

  // 페이지 로드 시 수정/작성 모드에 따른 초기화
  useEffect(() => {
    if (isEdit) {
      // 기존 데이터를 불러와서 폼에 채움
      getPreviousData();
    } else {
      // 폼을 깔끔하게 초기화
      form.resetFields();
    }
  }, [isEdit]);

  return (
    <div className={styles.writeBody}>
      {/* Ant Design Form 을 사용해봤어요. 반응형 레이아웃과 유효성 검사를 제공해요. */}
      <Form
        form={form}                    
        name="basic"                   
        labelCol={{ span: 8 }}         
        wrapperCol={{ span: 16 }}      
        style={{ maxWidth: 600 }}      
        autoComplete="off"            
        layout="horizontal"            
      >
        {/* 작성자 입력 필드 */}
        <Form.Item
          label="writer"
          name="writer"                                               // Form 데이터 키
          rules={[{ required: true, message: "작성자를 입력해 주세요." }]} // 유효성 검사 규칙
        >
          <Input 
            placeholder="작성자를 입력하세요"
          />
        </Form.Item>

        {/* 내용 입력 필드 (TextArea 사용으로 여러 줄 입력 가능) */}
        <Form.Item
          label="contents"
          name="contents"                                            
          rules={[{ required: true, message: "내용을 입력해 주세요." }]} 
        >
          <Input.TextArea 
            placeholder="내용을 입력하세요"
            rows={4}                                                  // 기본 4줄 높이
          />
        </Form.Item>

        {/* 제목 입력 필드 */}
        <Form.Item
          label="title"
          name="title"                                               
          rules={[{ required: true, message: "제목을 입력해 주세요." }]} 
        >
          <Input 
            placeholder="제목을 입력하세요"
          />
        </Form.Item>

        {/* 제출 버튼 - 수정/작성 모드에 따라 다른 함수 호출 */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={isEdit ? onClickUpdate : onClickSubmit}    // 조건부 함수 호출
          >
            작성하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
