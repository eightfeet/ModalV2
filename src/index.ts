require('./common.scss');
if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Modal from './Modal';
import { createInlineStyles } from './inlineStyle';
export default Modal;
export {createInlineStyles}

