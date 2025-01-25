import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Home from "./pages/home";
import List from "./pages/list";

const items = [{
    label: '主页',
    key: '/home',
}, {
    label: '列表页',
    key: '/list',
}];

const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "";

const App = () => {

    const [refresh] = useState(0);

    const [current, setCurrent] = useState('mail');

    let { pathname } = useLocation();

    const onClick = (MenuItem) => {
        // 设置 选中
        setCurrent(MenuItem.key);
        // 处理点击菜单项切换路由的逻辑
        navigate(MenuItem.key);
    };

    useEffect(() => {
        // xx
        const menu = items.find((item) => `${BASE_NAME}${item.key}` === pathname);
        // 设置 选中
        setCurrent(menu ? menu.key : pathname);
    }, [refresh, pathname]);
    
    // xxx
    const navigate = useNavigate();

    // 设置路由命名空间
    return (
        <section>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
            <Routes>
                {/* 重定向 */}
                <Route path="/" element={<Navigate to="/home" />} />
                {/* 设置路由 */}
                <Route path="/home" exact={false} element={<Home />} />
                <Route path="/list" exact={false} element={<List />} />
            </Routes>
        </section>
    );
};

export default App;
