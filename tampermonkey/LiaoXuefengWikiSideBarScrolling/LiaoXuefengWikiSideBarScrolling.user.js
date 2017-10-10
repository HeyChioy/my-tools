// ==UserScript==
// @name         LiaoXuefeng Wiki SideBar Scrolling
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  廖雪峰博客菜单栏和内容栏滚动
// @author       You
// @match        https://www.liaoxuefeng.com/wiki/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const sidebar = document.querySelector('.x-sidebar-left');
    const ss = '\
      .x-sidebar-left {\
        overflow-y: scroll !important;\
        position: fixed !important;\
        top: 10% !important;\
        background-color: #FFFFFF !important;\
        max-height: 80% !important;\
        paddingTop: 1em !important;\
        borderLeft: 5px solid rgb(0, 170, 226) !important;\
      }\
      .x-content {\
        border-right: 5px solid rgb(0, 170, 226) !important;\
        padding-right: 1em !important;\
      }';
    const elmt = document.createElement('style');
    elmt.innerText = ss;
    document.body.appendChild(elmt);
    const activeHeight = document.querySelector(".uk-nav-side .uk-active").offsetTop - 100;
    sidebar.scrollTop = activeHeight;
})();