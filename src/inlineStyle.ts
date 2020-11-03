import { prefix } from 'inline-style-prefixer';
import { cssifyObject } from 'css-in-js-utils';
import * as CSS from 'csstype';

/**
 *
 * 创建行内样式
 * @param {CSS.Properties} style
 */
const createInlineStyles = (style: CSS.Properties) => {
    return cssifyObject(prefix(style));
};

export { createInlineStyles };
