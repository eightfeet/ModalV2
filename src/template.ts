import s from './template.scss';
import { createInlineStyles } from './inlineStyle';
/**
 *
 *
 * @export
 * @param {Object} elements {head: htmlDom, main: htmlDom, footer: htmlDom}
 * @param {*} config {zIndex, closable, style, animation}
 * @returns
 */
export default function (elements, config, id) {
	const { style, zIndex, closable, animation, customModifyZIndex } = config || {};
	const { overlay, wrap, content, modify, close, header, article, footer } =
		style || {};

	const modalId = id || 'modal';
	const layIndex = zIndex * 1 || 100;
	console.log('customModifyZIndex', customModifyZIndex);
	const operateElements = elements || {};
	const operateModify = modify || [];
	let doms = null;
	for (let index = 0; index < operateModify.length; index++) {
		const elementStyle = operateModify[index];
		const buildElementStyle = createInlineStyles(elementStyle);
		if (!buildElementStyle || buildElementStyle.length === 0) {
			continue;
		}
		doms =
			(doms || '') +
			`<div class="${modalId}_modify ${s.modify
			}" style="${createInlineStyles(elementStyle)} 
				${customModifyZIndex === true ? '' : `z-index: ${layIndex + index * 2};`} 
			pointer-events: none;">&nbsp;</div>`;
	}

	const { form, duration } = animation || {};

	const time = parseFloat(duration);
	let timeset = '0.3s';
	// 处理非数值
	if (!isNaN(time)) {
		timeset = `${time}s`;
		// 处理小于或等于0的数值
		if (time <= 0) {
			timeset = '0.01s';
		}
	}

	const transitionDuration = `transition-duration: ${timeset}; -webkit-transition-duration: ${timeset};`;

	const formStyle = s[form || 'zoomIn'];
	const overlayStyle = createInlineStyles(overlay);
	const wrapStyle = createInlineStyles(wrap);
	const contentStyle = createInlineStyles(content);
	const closeStyle = createInlineStyles(close);
	const headerStyle = createInlineStyles(header);
	const articleStyle = createInlineStyles(article);
	const footerStyle = createInlineStyles(footer);

	return `<div class="${modalId}_wrap ${s.modal}">
			<div class="${modalId}_overlay ${s.cove
} ${formStyle}" style="z-index:${layIndex}; ${transitionDuration} ${overlayStyle || ''
}">
				<div class="${modalId}_content_wrap ${s.wrap}" style="${wrapStyle || ''}">
					<div class="${modalId}_content ${s.content}" style="${transitionDuration}">
						${doms || ''}
						<div class="${modalId}_modules ${s.modules}" ${content
	? `style="z-index:${layIndex}; box-sizing: border-box; ${contentStyle || ''
	}"`
	: ''
}>
							${operateElements.header
		? `<div class="${modalId}_header ${s.center
		}" ${headerStyle
			? `style="${headerStyle}"`
			: ''
		}>${operateElements.header}</div>`
		: ''
}
							${operateElements.article
		? `<div class="${modalId}_article ${s.left
		}" ${articleStyle
			? `style="${articleStyle}"`
			: ''
		}>${operateElements.article}</div>`
		: ''
}
							${operateElements.footer
		? `<div class="${modalId}_footer ${s.center
		}" ${footerStyle
			? `style="${footerStyle}"`
			: ''
		}>${operateElements.footer}</div>`
		: ''
}
						</div>
						${closable
		? close
			? `<div class="${modalId}_close ${s.close
			}" style="${closeStyle || ''} z-index: ${layIndex + operateModify.length * 2
			}"></div>`
			: ''
		: ''
}
					</div>
				</div>
			</div>
		</div>`;
}
