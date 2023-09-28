declare namespace P5 {
  export interface P5CharBase
    extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    children: string;
  }
  /**
   * @description 文字组件的属性
   */
  export interface P5TextProps extends P5CharBase {
    /**@description 字体是否旋转 */
    rotate?: boolean;
    beforeColor?: string;
    afterColor?: string;
  }
  /**
   * @description 标题组件的属性
   */
  export interface P5TitleProps extends P5CharBase {}
  /**
   * @description 按钮组件的属性
   */
  export interface P5ButtonProps extends P5CharBase {
    type?: "normal" | "text";
  }
  /**@description hover组件的属性   */
  export interface P5ChangeProps extends P5CharBase {
    tigger?: "click" | "hover";
    change?: boolean;
    showReal: JSX.Element;
    children: JSX.Element;
  }
  export interface CreateOutlineProps {
    lineWidth?: string;
    lineColor?: string;
  }
}
