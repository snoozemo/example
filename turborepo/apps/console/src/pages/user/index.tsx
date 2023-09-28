import { GLOBAL_ENUM } from "@/common/enum";
import services from "@/services";

import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProForm,
  ProTable,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import { Popconfirm, Space, Typography, message } from "antd";
import { useRef } from "react";

export default function User() {
  const form = ProForm.useForm()[0];
  const actionRef = useRef<ActionType>();

  const onHandleDelete = useMemoizedFn((params) => async () => {
    const data = await services.user.deleteUser(params);
    if (data) {
      message.success("删除成功~", 1.5);
      actionRef.current?.reload();
    }
  });
  const columns: ProColumns<Api.UsersItemVo>[] = [
    {
      dataIndex: "id",
      title: "ID",
      valueType: "digit",
      align: "center",
    },
    {
      dataIndex: "username",
      title: "名称",
      align: "center",
    },
    {
      dataIndex: "nickname",
      title: "昵称",
      align: "center",
    },
    {
      dataIndex: "level",
      title: "等级",
      align: "center",
      valueType: "select",
      request: () =>
        services.dict.getDictEnums(GLOBAL_ENUM.GET_ENUM_USER_ROLE_KEY),
      hideInSearch: true,
    },
    {
      dataIndex: "status",
      title: "状态",
      align: "center",
      valueType: "select",
      request: () =>
        services.dict.getDictEnums(GLOBAL_ENUM.GET_ENUM_USER_STATUS_KEY),
      hideInSearch: true,
    },
    {
      dataIndex: "createAt",
      title: "创建时间",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "options",
      align: "center",
      title: "操作",
      hideInSearch: true,
      render: (_text, entity) => {
        return (
          <Space>
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
        request={services.user.getUsers}
      />
    </PageContainer>
  );
}
