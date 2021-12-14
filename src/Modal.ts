import s from './template.scss';
import * as CSS from 'csstype';
import { createDom, removeDom } from './htmlFactory';
import template from './template';
import { onceTransitionEnd } from './webAnimationClub';
import { createInlineStyles } from './inlineStyle';
import saferInnerHtml from './saferInnerHtml';

const commonErr = 'Modal is not created or Modal is removed!';

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
        form?:
            | 'fadeInLeft'
            | 'fadeInRight'
            | 'fadeInDown'
            | 'fadeInUp'
            | 'zoomInLeft'
            | 'zoomInRight'
            | 'zoomInDown'
            | 'zoomInUp'
            | 'zoomIn'
            | 'flipInX'
            | 'flipInY';
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
     *         wrap?: CSS.Properties;
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
        wrap?: CSS.Properties;
        content?: CSS.Properties;
        modify?: CSS.Properties [];
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
    /**
     * 自定义修饰层层级 
     */
    customModifyZIndex?: boolean;
}

class Modal {
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

    static createInlineStyles = createInlineStyles;

    constructor(parameter: Parameters) {
        const stamp = new Date().getTime();
        const {
            id,
            animation,
            parentId,
            shouldCloseOnOverlayClick,
            zIndex,
            closable,
            style,
            emBase,
            onCancel,
            customModifyZIndex
        } = parameter || {};

        // 内部参数
        this.state = {
            id:
                id ||
                `modal${stamp}-${window.Math.floor(
                    window.Math.random() * 100
                )}`, // modalId 不传自动生成 modal + 时间戳 + 100以内的随机数
            animation: animation || {},
            shouldCloseOnOverlayClick: shouldCloseOnOverlayClick === true, // 点击背景层关闭弹窗
            parentId,
            zIndex: zIndex || 100, // 层级
            closable: closable === false ? false : true, // 是否自带关闭按钮
            style: style || null, // 基础样式
            contentDom: null,
            emBase,
            onCancel,
            customModifyZIndex,
            display: false,
        };
    }

    /**
     *
     * @description 关闭取消
     * @param {boolean} doNotRemove 是否移除弹窗 默认移除，=true时，不移除Model仅隐藏
     * @memberof Modal
     */
    handleClose = (doNotRemove: boolean) => {
        const { id, shouldCloseOnOverlayClick, onCancel } = this.state;
        const modalElement: HTMLElement = document.getElementById(id);
        const elementClose: HTMLElement = modalElement.querySelector(
            `.${s.close}`
        );
        const wrapElement: HTMLElement = modalElement.querySelector(
            `.${s.cove}`
        );
        
        if (shouldCloseOnOverlayClick === true && wrapElement) {
            // 阻止冒泡
            this.state.contentDom.onclick = e => e.stopPropagation();
            wrapElement.onclick = () =>
                this.hide(doNotRemove);
        }
        if (elementClose) {
            elementClose.onclick = (e) => {
                e.stopPropagation();
                this.hide(doNotRemove);
            };
        }
    };

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
    create = async (
        elements?: {
            header?: string;
            article?: string;
            footer?: string;
        },
        doNotRemove?: boolean
    ) => {
        const { id, parentId, emBase, ...other } = this.state;
        let modalElement: HTMLElement = document.getElementById(id);
        if (modalElement) {
            this.show();
            console.warn('已创建modal时 modal.create === modal.show');
            return Promise.resolve();
        }
        await createDom(saferInnerHtml(template(elements, other, id)), id, parentId, emBase);
        this.state.display = true;
        modalElement = document.getElementById(id);
        const wrapElement = modalElement.querySelector(`.${s.cove}`);
        this.state.contentDom = modalElement.querySelector(`.${s.content}`);
        this.handleClose(doNotRemove);
        const result: HTMLElement = await new Promise((resolve) => {
            window.setTimeout(() => {
                wrapElement.classList.add(s.coveshow);
                resolve(wrapElement as HTMLElement);
            }, 100);
        });
        return await onceTransitionEnd(result);
    };

    /**
     * @description 移除弹窗
     * @memberof Modal
     */
    remove = () =>
        new Promise((resolve) => {
            const modalElement = document.getElementById(this.state.id);
            const wrapElement = modalElement?.querySelector(`.${s.cove}`);
            wrapElement?.classList.remove(s.coveshow);
            resolve(wrapElement);
        })
            .then((wrapElement: HTMLElement) => onceTransitionEnd(wrapElement))
            .then(() => removeDom(this.state.id));

    /**
     *
     * @description 显示弹窗
     * @memberof Modal
     */
    show = async () => {
        const { id } = this.state;
        const modalElement = document.getElementById(id);
        await new Promise<void>((resolve, reject) => {
            if (!modalElement) {
                reject(commonErr);
                return;
            }
            const wrapElement = modalElement.querySelector(`.${s.cove}`);
            modalElement.style.display = 'block';
            window.setTimeout(() => {
                wrapElement.classList.add(s.coveshow);
                this.state.display = true;
                resolve();
            }, 100);
        });
        return this.handleClose(true);
    };

    /**
     *
     * @description 隐藏弹窗
     * @memberof Modal
     */
    unvisible = async () => {
        const { id } = this.state;
        const modalElement = document.getElementById(id);
        const resultElement: HTMLElement = await new Promise(
            (resolve, reject) => {
                const wrapElement: HTMLElement = modalElement.querySelector(
                    `.${s.cove}`
                );
                if (!modalElement) {
                    reject(commonErr);
                    return;
                }
                wrapElement.classList.remove(s.coveshow);
                resolve(wrapElement);
            }
        );
        await onceTransitionEnd(resultElement);
        return (modalElement.style.display = 'none');
    };

    /**
     * @description 隐藏或移除弹窗
     * @param {boolean} 是否移除弹窗 =true时，不移除Model仅隐藏
     * @memberof Modal
     */
    hide = (doNotRemove: boolean) => {
        if (this.state.display === false) {
            return Promise.reject('The Modal was not opened.');
        }
        this.state.display = false;
        if (doNotRemove === true) {
            return this.unvisible().then(() => {
                const { onCancel } = this.state;
                if (onCancel && typeof onCancel === 'function') {
                    onCancel();
                }
            });
        }
        return this.remove().then(() => {
            const { onCancel } = this.state;
            if (onCancel && typeof onCancel === 'function') {
                onCancel();
            }
        });
    };
}

export default Modal;
