import services from "@/services";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  ActionType,
  ModalForm,
  ModalFormProps,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormDigit,
  ProFormTextArea,
  ProTable,
} from "@ant-design/pro-components";
import { useMemoizedFn } from "ahooks";
import { Button, Popconfirm, Space, Typography, message } from "antd";
import marked from "@/utils/marked";
import { useCallback, useRef, useState } from "react";

export default function Message() {
  const form = ProForm.useForm()[0];
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const modeContent = {
    edit: {
      title: "编辑留言",
      request: services.message.putMessage,
      successText: "编辑成功~",
    },
    create: {
      title: "新增留言",
      request: services.message.postMessage,
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
    const data = await services.message.deleteMessage(params);
    if (data) {
      message.success("删除成功~", 1.5);
      actionRef.current?.reload();
    }
  });
  const columns: ProColumns<Api.MessagesItemVo>[] = [
    {
      dataIndex: "id",
      title: "ID",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "fromName",
      title: "评论人名称",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "toName",
      title: "被评论人名称",
      align: "center",
      hideInSearch: true,
    },
    {
      dataIndex: "beCommentedId",
      title: "被评论内容ID",
      align: "center",
    },
    {
      dataIndex: "content",
      title: "内容",
      align: "center",
      ellipsis: true,
      valueType: "textarea",
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
        headerTitle="留言列表"
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
        request={services.message.getMessages}
      />
      <ModalFormMessage
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
export interface ModalFormMessageProps extends ModalFormProps {
  mode?: "edit" | "create";
}

export function ModalFormMessage({
  form = ProForm.useForm()[0],
  mode = "create",
  ...props
}: ModalFormMessageProps) {
  const content = ProForm.useWatch("content", form);
  const Prev = useCallback(
    () => (
      <div
        className="markdown-body mt-[7px] box-border h-[384px] overflow-auto rounded border border-solid  border-gray-500  px-4 py-2 shadow-sm "
        dangerouslySetInnerHTML={{
          __html: marked(content || "这里是预览区域"),
        }}
      ></div>
    ),
    [content]
  );
  return (
    <ModalForm autoFocusFirstInput form={form} {...props}>
      <ProForm.Item hidden name="id" />
      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="beCommentedId"
          label="被留言内容ID"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          width="md"
          name="toId"
          label="被留言人ID"
          rules={[{ required: true }]}
        />
        <div className="flex space-x-8">
          <ProFormTextArea
            width="md"
            fieldProps={{
              style: {
                height: 384,
              },
            }}
            name="content"
            label="留言内容"
            rules={[{ required: true }]}
          />
          <div className="flex w-[326px] flex-1  flex-col space-y-2 ">
            <p>预览</p>
            <Prev />
          </div>
        </div>
      </ProForm.Group>
    </ModalForm>
  );
}
