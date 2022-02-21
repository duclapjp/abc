import styled from "styled-components";

const TaskDetailCommentsWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  margin-bottom: 24px;

  .comments-content-title {
    height: 32px;
  }

  .comments-content {
    border: 1px solid #e9e9e9;
    padding-bottom: 20px;
    padding-top: 15px;

    .hidden-number {
      color: #40a9ff;
      cursor: pointer;
    }

    .comments-content-list {
      max-height: 400px;
      overflow-y: scroll;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #e9e9e9;
      margin: 15px;

      .ant-comment {
        border: 1px dashed #e9e9e9;
        margin: 5px;

        .ant-comment-content-author-name {
          margin-right: 20px;
          padding-right: 0px;

          .comment-author {
            color: #000000;
            font-weight: bold;

            span {
              font-weight: normal;
              margin-right: 5px;
            }
          }
        }

        .comment-to {
          margin-left: 20px;
          color: #000000;
          font-weight: bold;
          cursor: pointer;

          span {
            font-weight: normal;
            margin-right: 5px;
          }
        }
      }
    }
    .comments-content-add {
      .admin-comment-field {
        padding-left: 15px;
        padding-right: 15px;

        .ant-form-item {
          margin-bottom: 0;
        }
      }

      .comments-content-textarea {
        padding-left: 15px;
        padding-right: 15px;

        span {
          height: 32px;
          display: flex;
          width: 100%;
          justify-items: center;
          justify-content: center;
          align-items: center;
        }
        textarea {
          height: 145px;
        }

        .ant-form-item {
          margin-bottom: 0;
        }

        .ant-form-item-label {
          padding-bottom: 0;
        }
      }
      .comments-content-input-notify {
        padding-left: 15px;
        padding-right: 15px;

        .ant-form-item {
          margin-bottom: 0;
        }

        .ant-form-item-label {
          padding-bottom: 0;
        }
      }
    }
    .comments-content-button {
      padding: 20px;

      .ant-col {
        text-align: center;

        .ant-btn {
          width: 120px;
        }
      }
    }

    .ant-form-item-required::after {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*" !important;
    }

    .ant-form-item-required::before {
      margin-right: 0 !important;
      content: "" !important;
    }
  }
`;

export { TaskDetailCommentsWrapper };
