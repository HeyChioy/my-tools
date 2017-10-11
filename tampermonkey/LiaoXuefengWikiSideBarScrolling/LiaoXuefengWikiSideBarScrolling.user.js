// ==UserScript==
// @name         LiaoXuefeng Wiki SideBar Scrolling
// @namespace    LiaoXuefengWikiSideBarScrolling.KyuuSeiryuu
// @version      0.2
// @description  廖雪峰博客菜单栏和内容栏滚动
// @author       KyuuSeiryuu
// @match        https://www.liaoxuefeng.com/wiki/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const sidebar = document.querySelector('.x-sidebar-left');
    GM_addStyle(`\
      .x-sidebar-left {
        overflow-y: scroll !important;
        position: fixed !important;
        top: 10% !important;
        background-color: #FFFFFF !important;
        max-height: 80% !important;
        paddingTop: 1em !important;
        border-left: 5px solid rgb(0, 170, 226) !important;
        border-right: 0;
      }
      .x-content {
        border-right: 5px solid rgb(0, 170, 226) !important;
        padding-right: 1em !important;
      }`);
    const activeHeight = document.querySelector(".uk-nav-side .uk-active").offsetTop - 100;
    sidebar.scrollTop = activeHeight;
})();
