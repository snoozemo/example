import services from "@/services";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  type ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import { Popconfirm, Space, Typography, message } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Article() {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const onHandleEdit = useMemoizedFn((params) => () => {
    navigate(`/blog/editor?id=${params.id}`);
  });
  const onHandleDelete = useMemoizedFn((params) => async () => {
    const data = await services.article.deleteArticle(params);
    if (data) {
      message.success("删除成功~", 1.5);
      actionRef.current?.reload();
    }
  });
  const columns: ProColumns<Api.ArticlesItemVo>[] = [
    {
      dataIndex: "id",
      title: "ID",
      valueType: "digit",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "author",
      title: "作者",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "authorId",
      title: "作者ID",
      align: "center",
      copyable: true,
    },
    {
      dataIndex: "prev",
      title: "预览内容",
      align: "center",
      valueType: "textarea",
      ellipsis: true,
    },
    {
      dataIndex: "options",
      align: "center",
      title: "操作",
      hideInSearch: true,
      render: (_text, entity) => {
        return (
          <Space>
            <Typography.Link onClick={onHandleEdit({ id: entity.id })}>
              编辑
            </Typography.Link>
            <Popconfirm
              title="您是否确定删除？"
              icon={<ExclamationCircleFilled style={{ color: "red" }} />}
              onConfirm={onHandleDelete({ id: entity.id })}
            >
              <Typography.Link type="danger">删除</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer className="rounded bg-white">
      <ProTable
        defaultSize="small"
        bordered
        actionRef={actionRef}
        pagination={{
          defaultPageSize: 10,
          showQuickJumper: true,
        }}
        key="id"
        dateFormatter="string"
        search={{
          labelWidth: "auto",
        }}
        headerTitle="用户列表"
        columns={columns}
        toolBarRender={() => {
          return [];
        }}
        request={services.article.getArticles}
      />
    </PageContainer>
  );
}
