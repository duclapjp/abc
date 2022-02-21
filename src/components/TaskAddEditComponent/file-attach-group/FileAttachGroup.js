import React, { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { FileAttachGroupWrapper } from "./FileAttachGroup.style";
import { Upload, message, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import {
  ACCESS_TOKEN_KEY,
  IMAGE_FILE_TYPE_PRE,
  MAX_TOTAL_FILE_SIZE,
} from "@iso/constants/common.constant";
import { downloadService } from "@iso/services";

const { Dragger } = Upload;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const FileAttachGroup = ({
  taskId,
  fileListInput,
  handleFieldChange,
  handleFileListChange,
  disabled,
}) => {
  const { messages } = useIntl();
  const [previewState, setPreviewState] = useState({
    previewImage: null,
    previewVisible: false,
    previewTitle: "",
  });
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const defaultFileList = fileListInput.map((item) => {
      return {
        ...item,
        uid: item.taskAttachId || item.uid,
        name: item.attachName || item.name,
        status: "done",
        url: item.taskId
          ? downloadService.buildUrlDownload({
              taskAttachId: item.taskAttachId,
              taskId: item.taskId,
            })
          : undefined,
      };
    });
    setFileList(defaultFileList);
  }, [fileListInput]);

  const handlePreview = async (file) => {
    if (
      !file ||
      !file.type ||
      !file.type.toLowerCase().includes(IMAGE_FILE_TYPE_PRE)
    ) {
      return;
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleCancel = () => {
    setPreviewState({
      previewImage: null,
      previewVisible: false,
      previewTitle: "",
    });
  };

  const handleRemove = (file) => {
    if (taskId) {
      downloadService.deleteAttach({
        taskId,
        taskAttachId: file.taskAttachId,
      });
    }
  };

  const handleDownload = (file) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", file.url);
    anchor.setAttribute("download", file.name);
    anchor.setAttribute("target", "_blank");
    anchor.click();
    window.URL.revokeObjectURL(file.url);
  };

  const enhanceFileList = (fileListInput) => {
    const fileListId = [];
    const fileListNew = [];
    fileListInput.map((fileItem) => {
      if (fileItem.response) {
        const { data } = fileItem.response;
        fileListId.push(fileItem.response.data.taskAttachId);
        fileListNew.push({
          ...fileItem,
          ...data,
          response: undefined,
        });
      } else {
        fileListId.push(fileItem.uid);
        fileListNew.push(fileItem);
      }
      return fileItem;
    });

    return { fileListId, fileListNew };
  };

  const handleChange = (info) => {
    const { status } = info.file;

    if (status === "done") {
      const { fileListId, fileListNew } = enhanceFileList(info.fileList);
      message.success(
        `${info.file.name} ${messages["page.taskAddEdit.attachFile.success"]}`
      );
      handleFieldChange(fileListId);
      handleFileListChange(fileListNew);
    } else if (status === "removed") {
      const fileListId = info.fileList.map((fileItem) =>
        fileItem.response ? fileItem.response.data.taskAttachId : null
      );
      handleFieldChange(fileListId);
      setFileList([...info.fileList]);
    } else if (status === "done") {
      const { fileListId, fileListNew } = enhanceFileList(info.fileList);
      message.success(
        `${info.file.name} ${messages["page.taskAddEdit.attachFile.success"]}`
      );
      handleFieldChange(fileListId);
      handleFileListChange(fileListNew);
    } else if (!status || status === "error") {
      const filterFileList = info.fileList.filter(
        (item) => item.uid !== info.file.uid
      );
      const { fileListId, fileListNew } = enhanceFileList(filterFileList);
      handleFieldChange(fileListId);
      handleFileListChange(fileListNew);
      const mesError = !status
        ? messages["page.taskAddEdit.attachFile.error.limited"]
        : `${info.file.name} ${messages["page.taskAddEdit.attachFile.failed"]}`;
      message.error(mesError);
    } else {
      setFileList([...info.fileList]);
    }
  };

  const draggerProps = {
    name: "attachFile",
    // listType: "picture-card",
    fileList: [...fileList],
    disabled,
    multiple: false,
    ...(taskId && {
      data: {
        taskId,
      },
    }),
    action: `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_API_PRE_ENDPOINT}${API_ENDPOINTS.TASK_ATTACH_UPLOAD}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY),
    },
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: true,
    },
    onDownload: handleDownload,
    onChange: handleChange,
    onPreview: taskId ? handleDownload : handlePreview,
    onRemove: handleRemove,
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    beforeUpload: (file) => {
      const currentSize = fileList.reduce((prev, current) => {
        return prev + current.size;
      }, 0);
      const totalSize = currentSize + file.size;
      return totalSize <= MAX_TOTAL_FILE_SIZE;
    },
  };

  return (
    <FileAttachGroupWrapper>
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {messages["page.taskAddEdit.attachFileTitle"]}
        </p>
        <p className="ant-upload-hint">
          {messages["page.taskAddEdit.attachFileContent"]}
        </p>
      </Dragger>
      <Modal
        visible={previewState.previewVisible}
        title={previewState.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={previewState.previewImage}
        />
      </Modal>
    </FileAttachGroupWrapper>
  );
};

FileAttachGroup.propTypes = {
  taskId: PropTypes.any,
  fileListInput: PropTypes.array,
  handleFieldChange: PropTypes.func,
  handleFileListChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default memo(FileAttachGroup);
