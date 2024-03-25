(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    global.tooool = factory();
  }
})(this, (function() {
  'use strict';
  
  const version = '1.0.3';

  function tooool() {
    
  }

  tooool.prototype = {
    version
  };

  // 数组乱序
  function shuffle(arr) {
    if (Array.isArray(arr)) {
      const length = arr.length;
      for (let i = 0; i < length; i++) {
        const random = Math.round(Math.random() * (length - 1 - i)) + i;
        [arr[i], arr[random]] = [arr[random], arr[i]];
      }
    }
    return arr;
  }

  // 随机字符串
  function randomstr(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890') {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  }

  // 格式化时间
  function formatTime(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (typeof time !== 'number') {
      return '';
    }
    const date = new Date(time);
    const o = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    Object.keys(o).forEach(key => {
      const reg = new RegExp(`(${key})`);
      if (reg.test(fmt)) {
        const value = o[key];
        fmt = fmt.replace(reg.exec(fmt)[1], value < 10 ? `0${value}` : value);
      }
    });
    return fmt;
  }

  function postTime(time, fmt = 'yyyy-MM-dd hh:mm') {
    if (typeof time !== 'number') {
      return '';
    }
    const now = Date.now();
    const seconds = Math.ceil((now - time) / 1000);
    if (seconds < 60) {
      return `${seconds}秒前`;
    }
    const minutes = Math.ceil(seconds / 60);
    if (minutes < 60) {
      return `${minutes}分钟前`;
    }
    const hours = Math.ceil(seconds / 60 / 60);
    if (hours < 24) {
      return `${hours}小时前`;
    }
    const day = Math.ceil(seconds / 60 / 60 / 24);
    if (day < 7) {
      return `${day}天前`;
    }
    return formatTime(time, fmt);
  }

  // 截取后缀
  function subsuffix(val) {
    if (typeof val !== 'string') {
      return '';
    }
    const lastIndex = val.lastIndexOf('.');
    return lastIndex > -1 ? val.substring(lastIndex + 1) : '';
  }

  tooool.shuffle = shuffle;
  tooool.randomstr = randomstr;
  tooool.formatTime = formatTime;
  tooool.postTime = postTime;
  tooool.subsuffix = subsuffix;

  return tooool;
}));