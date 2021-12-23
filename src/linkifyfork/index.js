/*global define*/
import * as linkify from 'linkifyjs'
import linkifyHtml from 'linkifyjs/html'
import hashtag from 'linkifyjs/plugins/hashtag'
import mention from 'linkifyjs/plugins/mention'

hashtag(linkify); mention(linkify);

(function () {
  function install (el, binding) {
    el.html = linkifyHtml(el.html);
  }

  if (typeof exports === 'object') {
    module.exports = install
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return install
    })
  } else if (window.Vue) {
    window.Vue.directive('linkified', install)
  }
})()