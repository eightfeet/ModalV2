import * as CSS from 'csstype';
export interface Parameters {
    /**
     * modalId 不传自动生成 modal + 时间戳 + 100以内的随机数
     */
    id?: string | undefined;
    /**
     *  动画
     *  form形式
     *  duration 持续时间
     */
    animation?: {
        form?: 'fadeInLeft' | 'fadeInRight' | 'fadeInDown' | 'fadeInUp' | 'zoomInLeft' | 'zoomInRight' | 'zoomInDown' | 'zoomInUp' | 'zoomIn' | 'flipInX' | 'flipInY';
        duration?: string | number;
    };
    /**
     * 是否点击背景层关闭弹窗，默认false
     */
    shouldCloseOnOverlayClick?: boolean;
    /**
     * 父级Id
     */
    parentId?: string;
    /**
     * 弹窗层级
     */
    zIndex?: number;
    /**
     * 是否自带关闭按钮，默认自带
     */
    closable?: boolean;
    /**
     * 基础样式
     * overlay 遮罩层、content 内容、modify 修饰层、close 关闭按钮、header 页头、article 主题内容、footer 页脚
     * @type {{
     *         overlay?: CSS.Properties;
     *         content?: CSS.Properties;
     *         modify?: CSS.Properties;
     *         close?: CSS.Properties;
     *         header?: CSS.Properties;
     *         article?: CSS.Properties;
     *         footer?: CSS.Properties;
     *     }}
     * @memberof Parameters
     */
    style?: {
        overlay?: CSS.Properties;
        content?: CSS.Properties;
        modify?: CSS.Properties[];
        close?: CSS.Properties;
        header?: CSS.Properties;
        article?: CSS.Properties;
        footer?: CSS.Properties;
    };
    /**
     * em弹窗单位字体大小
     */
    emBase?: number;
    /**
     * 关闭
     */
    onCancel?: () => void;
}
declare class Modal {
    state: Parameters & {
        /**
         * 显示弹窗
         */
        display: boolean;
        /**
         * 内容dom
         */
        contentDom: HTMLElement | undefined;
    };
    static createInlineStyles: (style: CSS.Properties<0 | (string & {}), string & {}>) => string;
    constructor(parameter: Parameters);
    /**
     *
     * @description 关闭取消
     * @param {boolean} doNotRemove 是否移除弹窗 默认移除，=true时，不移除Model仅隐藏
     * @memberof Modal
     */
    handleClose: (doNotRemove: boolean) => void;
    /**
     * @description 创建弹窗
     * @param {{
     *         header: InnerHTMLString;
     *         article: InnerHTMLString;
     *         footer: InnerHTMLString;
     *     }} elements 弹窗元素
     * @param {boolean} doNotRemove 是否移除弹窗 默认移除，=true时，不移除Model仅隐藏
     * @memberof Modal
     */
    create: (elements?: {
        header?: string;
        article?: string;
        footer?: string;
    }, doNotRemove?: boolean) => Promise<any>;
    /**
     * @description 移除弹窗
     * @memberof Modal
     */
    remove: () => Promise<unknown>;
    /**
     *
     * @description 显示弹窗
     * @memberof Modal
     */
    show: () => Promise<void>;
    /**
     *
     * @description 隐藏弹窗
     * @memberof Modal
     */
    unvisible: () => Promise<string>;
    /**
     * @description 隐藏或移除弹窗
     * @param {boolean} 是否移除弹窗 =true时，不移除Model仅隐藏
     * @memberof Modal
     */
    hide: (doNotRemove: boolean) => Promise<void>;
}
export default Modal;
