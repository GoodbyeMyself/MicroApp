import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import singleSpaReact from 'single-spa-react';

// 子应用独立运行
if (!window.singleSpaNavigate) {
    ReactDOM.render(rootComponent(), document.getElementById('root'))
}

// 生命周期a
const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent,
    errorBoundary(err, info, props) {
        return <div>
            This renders when a catastrophic error occurs
        </div>
    }
})

// 这里和vue不一样，props必须向下传递
export const bootstrap = async props => {
    console.log('react bootstrap');
    return reactLifecycles.bootstrap(props);
}
export const mount = async props => {
    console.log('react mount');
    return reactLifecycles.mount(props);
}
export const unmount = async props => {
    console.log('react unmount');
    return reactLifecycles.unmount(props);
}

// 根组件
function rootComponent() {
    return <React.StrictMode>
        <BrowserRouter>
            <div>
                <Link to="/react">Home</Link> |
                <Link to="/react/about"> About</Link>
                <Route exact path="/react" component={Home} />
                <Route exact path="/react/about" component={About} />
            </div>
        </BrowserRouter>
    </React.StrictMode>
}

// home 组件
function Home() {
    return <div>
        <h1>react home page</h1>
    </div>
}

// about 组件
function About() {
    return <div>
        <h1>react about page</h1>
    </div>
}