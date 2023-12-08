// ==UserScript==
// @name         Focus always and replay if video is paused
// @name:zh-TW   始終保持焦點並在視頻暫停時自動播放
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  To learn more faster and efficiently
// @description:zh-tw   此腳本旨在提高在線學習效率，透過自動保持視頻播放視窗的焦點並在視頻暫停時自動重播。適用於 `https://iedu.foxconn.com/*` 網站，能夠確保學習過程中視頻連續播放，無需手動干預，特別適合忙碌且希望提高學習效率的用戶。
// @author       pjiaquan
// @match        https://iedu.foxconn.com/*
// @run-at       document-start
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT
// ==/UserScript==
(function() {
    'use strict';
 
    // script2 functionality
    window.onblur = null;
    window.blurred = false;
 
    document.hasFocus = () => true;
    window.onFocus = () => true;
 
    [
        "hidden",
        "mozHidden",
        "msHidden",
        "webkitHidden"
    ].forEach(prop_name => {
        Object.defineProperty(document, prop_name, {value: false});
    });
 
    Object.defineProperty(document, "visibilityState", {get: () => "visible"});
    Object.defineProperty(document, "webkitVisibilityState", {get: () => "visible"});
 
    document.onvisibilitychange = undefined;
 
    var event_handler = (event) => {
        if (["blur", "mouseleave", "mouseout"].includes(event.type) &&
            (event.target instanceof HTMLInputElement ||
             event.target instanceof HTMLAnchorElement ||
             event.target instanceof HTMLSpanElement)) {
            return; // exclude input, anchor, and span elements
        }
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    };
 
    [
        "visibilitychange",
        "webkitvisibilitychange",
        "blur",
        "hasFocus",
        "mouseleave",
        "mouseout",
        "mozvisibilitychange",
        "msvisibilitychange"
    ].forEach(event_name => {
        window.addEventListener(event_name, event_handler, true);
        document.addEventListener(event_name, event_handler, true);
    });
 
    // script1 functionality
    function updateVideoProgress() {
        console.log('Check is playing or not');
        if (window.wares && window.wares.length > 0) {
            console.log("wares array found and not empty:", window.wares);
            setTimeout(() => {
                if (!isVideoPlaying()) {
                    console.log('start!');
                    startPlayingVideo();
                }
            }, 5000);
        } else {
            console.log("wares array not found or is empty");
        }
    }
 
    function setupVideoCheck() {
        console.log('Page loaded, running script');
        setInterval(updateVideoProgress, 30000);
    }
 
    function isVideoPlaying() {
        var videoElement = document.getElementById('realvideo_html5_api');
        if (videoElement && videoElement.tagName === 'VIDEO') {
            return !videoElement.paused;
        } else {
            console.log('Video element not found or is not a video tag');
            return null;
        }
    }
 
    function startPlayingVideo() {
        var videoElement = document.getElementById('realvideo_html5_api');
        if (videoElement && videoElement.tagName === 'VIDEO') {
            videoElement.play()
                .then(() => console.log("Video playback started"))
                .catch((error) => console.error("Error attempting to play video:", error));
        } else {
            console.log('Video element not found or is not a video tag');
        }
    }
 
    window.addEventListener('load', setupVideoCheck);
 
})();
