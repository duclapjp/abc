import React, { useCallback, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Col, Upload, Button, Row, message, Typography } from "antd";
import { Formik } from "formik";
import { Form, SubmitButton } from "formik-antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import uploadActions from "@iso/redux/upload/actions";
import helpActions from "@iso/redux/help/actions";
import { MAX_MANUAL_FILE_SIZE } from "@iso/constants/common.constant";
import PageHeader from "@iso/components/utility/pageHeader";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import { LayoutManualUploadWrapper } from "@iso/containers/ManualUpload/ManualUpload.styles";
import { Helmet } from "react-helmet";

const { Item } = Form;
const { Text } = Typography;

const ManualUpload = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const {
    Upload: { loading },
    Help: { fileExist },
  } = useSelector((state) => state);
  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    dispatch(helpActions.getFileRequest());
  }, [dispatch]);

  const handleUpload = useCallback(
    (_, { setFieldValue }) => {
      new Promise((resolve, reject) => {
        return dispatch(uploadActions.fileUpload({ fileList, resolve, reject }));
      })
        .then(() => {
          setFieldValue("manualFile", null);
          setFileList(null);
          dispatch(helpActions.getFileRequest());
          message.success(messages["page.upload.manualFile.success"]);
        })
        .catch(() => {
          message.error(messages["page.upload.manualFile.failed"]);
        });
    },
    [dispatch, fileList, messages]
  );

  const beforeUpload = ({ file, fileList, setFieldValue }) => {
    const isLt100M = file.size < MAX_MANUAL_FILE_SIZE;
    if (file.type !== "application/pdf") {
      return message.error(messages["page.upload.manualFile.errorType"]);
    } else if (!isLt100M) {
      return message.error(messages["page.upload.manualFile.errorLimit"]);
    } else {
      setFileList(file);
      setFieldValue("manualFile", fileList);
      return false;
    }
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.manualUpload"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["page.upload.title"]}</PageHeader>
      <LayoutContent>
        <LayoutManualUploadWrapper>
          <Formik initialValues={initialValues} onSubmit={handleUpload}>
            {({ values, setFieldValue, dirty }) => (
              <Form>
                <h3 className="pdf-upload-title">
                  {messages["page.upload.pdfTitle"]}
                </h3>
                <Row gutter={[0, 32]}>
                  {!isEmpty(fileExist) && (
                    <div className="ml-20">
                      <Text code>{fileExist.manualName}</Text>
                    </div>
                  )}
                </Row>
                <Row>
                  <Col className="manual-file-col">
                    <Item name="manualFile">
                      <Upload
                        name="manualFile"
                        accept="application/pdf"
                        fileList={values.manualFile}
                        beforeUpload={(file, fileList) =>
                          beforeUpload({ file, fileList, setFieldValue })
                        }
                        onRemove={() => {
                          setFieldValue("manualFile", null);
                          setFileList(null);
                        }}
                      >
                        <Button className="w-100">
                          <UploadOutlined />
                          {messages["page.upload.manualFile.chooseFile"]}
                        </Button>
                      </Upload>
                    </Item>
                  </Col>
                  <Col>
                    <SubmitButton loading={loading} type="primary" disabled={!dirty}>
                      {messages["page.upload.upload"]}
                    </SubmitButton>
                  </Col>
                  <Col span={24}>{messages["page.upload.manualFile.maxSize"]}</Col>
                </Row>
              </Form>
            )}
          </Formik>
        </LayoutManualUploadWrapper>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValues = {
  manualFile: null,
};

export default ManualUpload;
