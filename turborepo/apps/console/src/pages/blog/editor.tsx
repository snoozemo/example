import { GLOBAL_ENUM } from "@/common/enum";
import { useSearchParams } from "react-router-dom";
import services from "@/services";
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { useMemoizedFn, useRequest } from "ahooks";
import { message } from "antd";
import axios from "axios";
import { marked } from "marked";
import { useEffect, useMemo, useRef } from "react";

export default function Editor() {
  const [form] = ProForm.useForm();
  const url = ProForm.useWatch("url", form);
  const ref = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const isEditMode = !!articleId;
  useRequest(() => services.article.getArticle({ id: +articleId! }), {
    refreshDeps: [articleId],
    ready: !!articleId,
    debounceWait: 300,
    onSuccess(res) {
      form.setFieldsValue(res);
    },
  });
  const { data } = useRequest(() => axios.get(url).then((res) => res.data), {
    refreshDeps: [url],
    ready: !!url,
    debounceWait: 300,
  });

  const __html = useMemo(() => marked(data || ""), [data]);
  const onHandleEdit = useMemoizedFn(async (params) => {
    const result = await services.article.putArticle(params);
    if (result) {
      message.success("编辑成功~", 1.5);
    }
    return result;
  });
  const onHandleCreate = useMemoizedFn(async (params) => {
    const result = await services.article.postArticle(params);
    if (result) {
      message.success("新增成功~", 1.5);
    }
    return result;
  });
  const onFinish = useMemoizedFn(async (params) => {
    return isEditMode
      ? await onHandleEdit(params)
      : await onHandleCreate(params);
  });

  useEffect(() => {
    if (isEditMode) return;
    return () => {
      form.setFieldValue(
        "prev",
        ref.current?.innerText
          .replaceAll("  ", " ")
          .replaceAll("\n", "")
          .slice(0, 500)
      );
    };
  }, [data]);

  useEffect(() => {
    if (__html || isEditMode) return;
    const pattern = /(?<=(img[^>]*src="))[^"]*/g;
    form.setFieldValue(
      "prevImgs",
      [...__html.matchAll(pattern)].map((item) => ({ url: item[0] }))
    );
  }, [__html]);

  return (
    <div className="flex h-full w-full space-x-4">
      <ProForm
        onFinish={onFinish}
        form={form}
        className="w-[540px] overflow-auto rounded bg-white p-8"
      >
        <ProForm.Item hidden name="id" />
        <ProFormText label="文档链接" rules={[{ required: true }]} name="url" />
        <ProFormSelect
          mode="tags"
          convertValue={(value: string) => {
            if (typeof value === "string") {
              value ? value.split(",") : value;
            }
            return value;
          }}
          transform={(value) => {
            const tags =
              typeof value === "string"
                ? value
                : value?.length
                ? value.join(",")
                : value;

            return { tags };
          }}
          label="文档标签"
          request={() =>
            services.dict.getDictEnums(GLOBAL_ENUM.GET_ENUM_ARTICLE_LABEL_KEY)
          }
          rules={[{ required: true }]}
          name="tags"
        />

        <ProFormTextArea
          label="预览内容"
          rules={[{ required: true }]}
          name="prev"
        />
        <ProForm.Item name="prevImgs" noStyle></ProForm.Item>

        <ProFormUploadButton
          convertValue={(value: string) => {
            if (typeof value === "string") {
              return value
                ? value.split(",").map((item: string) => ({ url: item }))
                : value;
            }
            return value;
          }}
          transform={(value) => {
            console.log(value);
            const prevImgs =
              typeof value === "string"
                ? value
                : value?.length
                ? value.map((item: { url: string }) => item?.url)?.join(",")
                : value;
            return {
              prevImgs,
            };
          }}
          label="预览图片"
          listType="picture-card"
          name="prevImgs"
        />
      </ProForm>
      {/* 数据展示 */}
      <div className="flex-1 overflow-auto rounded bg-white px-4 py-2">
        <div
          ref={ref}
          className="markdown-body "
          dangerouslySetInnerHTML={{
            __html,
          }}
        ></div>
      </div>
    </div>
  );
}
