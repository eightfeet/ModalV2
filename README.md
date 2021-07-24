# modal

弹窗模块，需要promise polyfill
<a href="http://www.eightfeet.cn/ModalV2/lib/index.html" traget="_blank" >demo</a>

```sh
npm i @eightfeet/modal -S
```

```javascript
import Modal from '@eightfeet/modal';

const myModal = new Modal({
    style: {
        article: {
            borderRadius: '0.5em',
            backgroundColor: '#fff',
        }
	}
});

myModal.create({
    article: '这是一个弹窗'
}).then(() => console.log('弹窗已打开'));
```


#### parame

| 参数                      | 说明                         | 是否必填 | 备注                                                         | 类型     |
| ------------------------- | ---------------------------- | -------- | ------------------------------------------------------------ | -------- |
| id                        | 所创建弹窗的id               | 否       | 不传可自动生成id（modal + 时间戳 + 100以内的随机数）         | String   |
| zIndex                    | modal的样式层级关系          | 否       | 默认100                                                      | Number   |
| emBase                    | em单位的基准像素             | 否       | 默认自动计算（emBase = document.clientWidth/24）             | Number   |
| parentId                  | 所挂载的父级ID用于做局部弹窗 | 否       | 默认挂在body下面，指定父级dom时将挂载在父级dom下，配合css实现局部弹窗 | String   |
| closable                  | 是否可关闭                   | 否       | 默认true                                                     | Boolean  |
| shouldCloseOnOverlayClick | 是否点击蒙层关闭弹窗         | 否       | 默认false                                                    | Boolean  |
| style                     | 弹窗样式                     | 是       | 定义modal样式<br /> {<br />    overlay: 覆盖层, <br />    wrap: 模块包裹层, <br />    content: 内容区, <br />    header: 头部, <br />    article: 内容区, <br />    close: 关闭按钮, <br />    modify: 修饰器<br />}, <br />modify修饰器 是一个数组，每个数组元素对应会创建一个 基于弹窗的绝对定位div层，用于修饰弹窗（参考case） | Object   |
| animation                 | 弹窗动画                     | 否       | {<br />    form: 弹窗动画形式，参考animation附表,<br />    duration：持续时长<br />} | Object   |
| onCancel                  | 关闭弹窗                     |          | 关闭弹窗时的回调                                             | Function |

###### animation附表

| 参数        | 说明               | 备注 |
| ----------- | ------------------ | ---- |
| fadeInUp    | 从底部向上淡入     |      |
| fadeInDown  | 从顶部向下淡入     |      |
| fadeInLeft  | 从左向右淡入       |      |
| fadeInRight | 从右向左淡入       |      |
| zoomIn      | 从中心放大淡入     | 默认 |
| zoomInUp    | 从底部向上放大淡入 |      |
| zoomInDown  | 从顶部向下放大淡入 |      |
| zoomInLeft  | 从左向右放大淡入   |      |
| zoomInRight | 从右向左放大淡入   |      |



#### options

1. ##### create: ƒ (elements, doNotRemove) 创建弹窗
   ```typescript
   /**
     * @description 创建弹窗
     * @param {{
     *         header: InnerHTML;
     *         article: InnerHTML;
     *         footer: InnerHTML;
     *     }} elements 弹窗元素
     * @param {boolean} doNotRemove 是否移除弹窗
     * @memberof Modal
     */
   ```

2. ##### hide: ƒ (doNotRemove) 隐藏弹窗

   ```typescript
   /**
     * @description 移除弹窗
     * @memberof Modal
     */
   ```

3. ##### remove: ƒ () 移除弹窗

   移除，将弹窗从body中移除。

4. ##### show: ƒ () 显示弹窗

   显示页面弹窗，如果创建的弹窗隐藏时，调用此方法显示弹窗。

### createInlineStyles

    createInlineStyles: 创建行内样式、 

```javascript
    import {createInlineStyles} from '@eightfeet/modal';
``` 
    
### saferInnerHtml  
    InnerHtml 具有一定安全隐患，saferInnerHtml用于过滤模版中的危险脚本，让你安全使用InnerHtml
    避免XSS 攻击，默认InnerHtml都有通过saferInnerHtml转译为安全html

```javascript
    import {saferInnerHtml} from '@eightfeet/modal';
    const htmlStr = saferInnerHtml('<img src="x" onerror="alert(1)" />')
    console.log(htmlStr); // <img src="x" />
```

#### case

```javascript
import Modal from '@eightfeet/modal';

const newModal = new Modal({
        id: 'modalId', // 所创建弹窗的id 不传可自动生成id（modal + 时间戳 + 100以内的随机数）
        zIndex: 100, // modal的层级关系，默认100
        emBase: 12, // 基准像素 parent Dom’s fontsize
        animation: {
           from: 'bottom',
           duration: '2s'
        }, // 启用动画 默认true
        parentId: 'indom', // modal的创建位置，默认创建在body下
        closable: false, // modal是否可关闭 默认true
        shouldCloseOnOverlayClick: true, // 点击背景层关闭弹窗 默认false
        style: { // 定义modal样式 {overlay: 覆盖层, content: 内容区, close: 关闭按钮} 
            overlay: {
                backgroundColor: 'rgba(0,0,0,0.5)'
            },
            content: {
                backgroundColor: 'rgba(100, 100, 100, 0.2)',
                width: '19em',
                // padding: '120px',
                // 设置内容的层级关系
                zIndex: 107
            },
            close: {
                backgroundColor: 'rgba(0, 0, 0, 1)',
                width: '1em',
                height: '1em',
                top: '-3em',
                left: '50%'
            },
            // modify(修饰层)层级按照zIndex（modal的层级）以2为步值递增
            modify: [
                {
                    backgroundColor: 'rgba(0, 0, 255, 0.4)',
                    width: '120%',
                    left: '-10%',
                    height: '200px',
                    border: '1px solid rgba(0, 0, 255, 0.6)',
                    top: '-5em'
                },
                {
                    backgroundColor: 'rgba(0, 0, 255, 0.4)',
                    width: '130%',
                    left: '-15%',
                    height: '200px',
                    border: '1px solid rgba(0, 0, 255, 0.6)',
                    top: '-4em'
                }
            ]
        }
    });

    const btn = document.getElementById('exampleBtn');

    btn.onclick = function(){ 
        return newModal.create({
            header:'<div style="position:relative; z-index: 90;background-color: yellow;">头部</div>',
            article: `<div style="background-color: #fff;">
                        这是一段内容
                        <input id="inp" type="text" />
                    </div>`,
            footer: `<div style="background-color: white">
                        <button id="close" style="border:1px solid #aaa; padding: 1em">确定</button>
                        <br>
                        脚部
                    </div>`
        }, true).then(function(){
            document.getElementById('close').onclick = function(){
                console.log(document.getElementById('inp').value);
                return newModal.hide(true);
            };
        });
    }
    
```

## react 
### Modal组件最佳实践 
[demo](./src/ReactModal.tsx)

### react hook
- ### case react useModal hook

```typescript
    import { useEffect, useRef, useCallback } from 'react';
    import Modal, { ModalParameters } from '@eightfeet/modal';

    const useModal = (parameters: ModalParameters) => {
        const ref = useRef<Modal | null>(null);
        useEffect(() => {
            ref.current = new Modal(parameters);
            return () => {
                if (ref.current) {
                    const previousModal = ref.current;
                    if (document.getElementById(previousModal.state.id || '')) {
                        previousModal.remove();
                    }
                }
            };
        }, [parameters]);

        const createModal = useCallback<Modal['create']>(async (data) => ref.current?.create(data), []);

        const hideModal = useCallback<Modal['hide']>(async (data) => ref.current?.hide(data), []);

        return { createModal, hideModal };
    };

    export default useModal;


```

- ### useModal 

```typescript

    import React from "react";
    import useModal from "./hooks/useModal";

    function App() {
        const { createModal, hideModal } = useModal({
            style: {
                content: {
                    width: '301px'
                }
            }
        });

        return (
            <div className="App">
            <button
                onClick={() =>
                createModal({ article: "<div>messages!</div>" }).then(() =>
                    setTimeout(hideModal, 1000)
                )
                }
            >
                弹窗
            </button>
            </div>
        );
    }

    export default App;
```

