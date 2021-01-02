import Modal, { Parameters } from './Modal';
import { createInlineStyles } from './inlineStyle';
import saferInnerHtml from './saferInnerHtml';
export default Modal;
export { createInlineStyles, saferInnerHtml };
export declare type ModalParameters = Parameters;
export declare type ModalStyle = Parameters["style"];
export declare type ModalAnimation = Parameters["animation"];
