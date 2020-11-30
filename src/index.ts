require('./common.scss');
if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Modal, {Parameters} from './Modal';
import { createInlineStyles } from './inlineStyle';
export default Modal;
export { createInlineStyles };

export type ModalParameters = Parameters;
export type ModalStyle = Parameters["style"];
export type ModalAnimation = Parameters["animation"];
