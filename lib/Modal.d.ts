import * as CSS from 'csstype';
interface Parameters {
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
        form?: 'fadeInLeft' | 'fadeInRight' | 'fadeInDown' | 'fadeInUp' | 'zoomInLeft' | 'zoomInRight' | 'zoomInDown' | 'zoomInUp' | 'zoomIn';
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
     */
    style?: CSS.Properties;
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
     *         header: InnerHTML;
     *         article: InnerHTML;
     *         footer: InnerHTML;
     *     }} elements 弹窗元素
     * @param {boolean} doNotRemove 是否移除弹窗 默认移除，=true时，不移除Model仅隐藏
     * @memberof Modal
     */
    create: (elements: {
        header: InnerHTML;
        article: InnerHTML;
        footer: InnerHTML;
    }, doNotRemove: boolean) => Promise<any>;
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
    hide: (doNotRemove: boolean) => Promise<unknown>;
}
export default Modal;
