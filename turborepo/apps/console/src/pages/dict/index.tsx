import { GLOBAL_ENUM } from "@/common/enum";
import services from "@/services";

import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  ActionType,
  ModalForm,
  ModalFormProps,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
  ProTable,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import { Button, Popconfirm, Space, Typography, message } from "antd";
import { useRef, useState } from "react";

export default function Dict() {
  const form = ProForm.useForm()[0];
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const modeContent = {
    edit: {
      title: "编辑字典",
      request: services.dict.putDict,
      successText: "编辑成功~",
    },
    create: {
      title: "新增字典",
      request: services.dict.postDict,
      successText: "新增成功~",
    },
  };
  const onFinish = useMemoizedFn(async (params) => {
    params.pid = params.pid ? params.pid : +params.pid;
    const data = await modeContent?.[mode].request?.(params);
    if (data) {
      message.success(modeContent?.[mode]?.successText, 1.5);
      actionRef.current?.reload();
    }
    return data;
  });
  const onHandleCreate = useMemoizedFn(() => {
    form.resetFields();
    setOpen(true);
    setMode("create");
  });
  const onHandlePut = useMemoizedFn((params) => () => {
    form.resetFields();
    form.setFieldsValue(params);
    setOpen(true);
    setMode("edit");
  });

  const onHandleDelete = useMemoizedFn((params) => async () => {
    const data = await services.dict.deleteDict(params);
    if (data) {
      message.success("删除成功~", 1.5);
      actionRef.current?.reload();
    }
  });
  const columns: ProColumns<Api.DictsItemsVo>[] = [
    {
      dataIndex: "id",
      title: "ID",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "name",
      title: "名称",
      valueType: "select",
      request: async () => {
        const data = await services.dict.getDictEnums(
          GLOBAL_ENUM.GET_ENUM_ROOT_KEY
        );
        return data.map((item) => ({ ...item, value: item.label }));
      },
    },
    {
      dataIndex: "key",
      title: "键",
      align: "center",
    },
    {
      dataIndex: "value",
      title: "值",
      align: "center",
    },
    {
      dataIndex: "creator",
      title: "创建人",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "desc",
      title: "简介",
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
            <Typography.Link onClick={onHandlePut(entity)}>
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
        headerTitle="字典列表"
        columns={columns}
        toolBarRender={() => {
          return [
            <Button
              onClick={onHandleCreate}
              type="primary"
              icon={<PlusOutlined />}
            >
              新增
            </Button>,
          ];
        }}
        request={services.dict.getDicts}
      />
      <ModalFormDict
        title={modeContent[mode]?.title}
        mode={mode}
        form={form}
        open={open}
        onFinish={onFinish}
        onOpenChange={setOpen}
      />
    </PageContainer>
  );
}
export interface ModalFormDictProps extends ModalFormProps {
  mode?: "edit" | "create";
}

export function ModalFormDict({
  form = ProForm.useForm()[0],
  mode = "create",
  ...props
}: ModalFormDictProps) {
  const isEditMode = mode === "edit";

  return (
    <ModalForm autoFocusFirstInput form={form} {...props}>
      <ProForm.Item hidden name="id" />
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="name"
          label="名称"
          request={async () => {
            const data = await services.dict.getDictEnums(
              GLOBAL_ENUM.GET_ENUM_ROOT_KEY
            );
            return data.map((item) => ({ ...item, value: item.label }));
          }}
          rules={[{ required: true }]}
        />
        <ProFormText
          width="md"
          name="key"
          label="键"
          rules={[{ required: true }]}
        />
        <ProFormText
          width="md"
          name="value"
          label="值"
          rules={[{ required: true }]}
        />
        <ProFormTreeSelect
          width="md"
          name="pid"
          label="PID"
          dependencies={["name"]}
          request={async ({ name }) => {
            const data = await services.dict.getDictEnums(name);
            return data.map((item) => ({ ...item, value: +item.id }));
          }}
        />
        <ProFormText width="md" name="desc" label="描述" />
      </ProForm.Group>
    </ModalForm>
  );
}
