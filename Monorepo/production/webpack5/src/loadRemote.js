/**
 * @description: 异步加载文件
 * @author: M.yunlong
 * @date: 2023-04-28 19:56:30
*/
export async function loadRemoteComponent (config) {
    return loadScript(config).then(() => loadComponentByWebpack(config));
}

function loadScript (config) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = config.url;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
            console.log(`Dynamic Script Loaded: ${config.url}`);
            document.head.removeChild(script);
            resolve();
        }
        script.onerror = () => {
            console.error(`Dynamic Script Error: ${config.url}`);
            document.head.removeChild(script);
            reject();
        }
        document.head.appendChild(script);
    });
}

async function loadComponentByWebpack ({ scope, module }) {
    // 初始化共享作用域，这将使用此构建和所有远程提供的已知模块填充它
    await __webpack_init_sharing__('default');
    const container = window[scope]; // 获取容器
    // 初始化容器，它可以提供共享模块
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    return factory();
}
  