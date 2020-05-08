/*!
  * Bootstrap v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'***REMOVED***, factory) :
  (global = global || self, factory(global.bootstrap = {***REMOVED***, global.jQuery, global.Popper));
***REMOVED***(this, (function (exports, $, Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'***REMOVED*** : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'***REMOVED*** : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i***REMOVED***;
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    ***REMOVED***
  ***REMOVED***

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  ***REMOVED***

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      ***REMOVED***);
    ***REMOVED*** else {
      obj[key***REMOVED*** = value;
    ***REMOVED***

    return obj;
  ***REMOVED***

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      ***REMOVED***);
      keys.push.apply(keys, symbols);
    ***REMOVED***

    return keys;
  ***REMOVED***

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i***REMOVED*** != null ? arguments[i***REMOVED*** : {***REMOVED***;

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key***REMOVED***);
        ***REMOVED***);
      ***REMOVED*** else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      ***REMOVED*** else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    return target;
  ***REMOVED***

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  ***REMOVED***

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {***REMOVED***.toString.call(obj).match(/\s([a-z***REMOVED***+)/i)[1***REMOVED***.toLowerCase();
  ***REMOVED***

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        ***REMOVED***

        return undefined; // eslint-disable-line no-undefined
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    ***REMOVED***);
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      ***REMOVED***
    ***REMOVED***, duration);
    return this;
  ***REMOVED***

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END***REMOVED*** = getSpecialTransitionEndEvent();
  ***REMOVED***
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      ***REMOVED*** while (document.getElementById(prefix));

      return prefix;
    ***REMOVED***,
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      ***REMOVED***

      try {
        return document.querySelector(selector) ? selector : null;
      ***REMOVED*** catch (err) {
        return null;
      ***REMOVED***
    ***REMOVED***,
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      ***REMOVED*** // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      ***REMOVED*** // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0***REMOVED***;
      transitionDelay = transitionDelay.split(',')[0***REMOVED***;
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    ***REMOVED***,
    reflow: function reflow(element) {
      return element.offsetHeight;
    ***REMOVED***,
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    ***REMOVED***,
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    ***REMOVED***,
    isElement: function isElement(obj) {
      return (obj[0***REMOVED*** || obj).nodeType;
    ***REMOVED***,
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property***REMOVED***;
          var value = config[property***REMOVED***;
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***,
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      ***REMOVED*** // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      ***REMOVED***

      if (element instanceof ShadowRoot) {
        return element;
      ***REMOVED*** // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      ***REMOVED***

      return Util.findShadowRoot(element.parentNode);
    ***REMOVED***,
    jQueryDetection: function jQueryDetection() {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      ***REMOVED***

      var version = $.fn.jquery.split(' ')[0***REMOVED***.split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0***REMOVED*** < ltMajor && version[1***REMOVED*** < minMinor || version[0***REMOVED*** === minMajor && version[1***REMOVED*** === minMinor && version[2***REMOVED*** < minPatch || version[0***REMOVED*** >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME***REMOVED***;
  var Selector = {
    DISMISS: '[data-dismiss="alert"***REMOVED***'
  ***REMOVED***;
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    ***REMOVED*** // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      ***REMOVED***

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      this._removeElement(rootElement);
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    ***REMOVED*** // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      ***REMOVED***

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0***REMOVED***;
      ***REMOVED***

      return parent;
    ***REMOVED***;

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    ***REMOVED***;

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      ***REMOVED***

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      ***REMOVED***).emulateTransitionEnd(transitionDuration);
    ***REMOVED***;

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    ***REMOVED*** // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        ***REMOVED***

        if (config === 'close') {
          data[config***REMOVED***(this);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        ***REMOVED***

        alertInstance.close(this);
      ***REMOVED***;
    ***REMOVED***;

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Alert;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME***REMOVED*** = Alert._jQueryInterface;
  $.fn[NAME***REMOVED***.Constructor = Alert;

  $.fn[NAME***REMOVED***.noConflict = function () {
    $.fn[NAME***REMOVED*** = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.4.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1***REMOVED***;
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  ***REMOVED***;
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"***REMOVED***',
    DATA_TOGGLES: '[data-toggle="buttons"***REMOVED***',
    DATA_TOGGLE: '[data-toggle="button"***REMOVED***',
    DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"***REMOVED*** .btn',
    INPUT: 'input:not([type="hidden"***REMOVED***)',
    ACTIVE: '.active',
    BUTTON: '.btn'
  ***REMOVED***;
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1),
    LOAD_DATA_API: "load" + EVENT_KEY$1 + DATA_API_KEY$1
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    ***REMOVED*** // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLES)[0***REMOVED***;

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            ***REMOVED*** else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED*** else if (input.type === 'checkbox') {
            if (this._element.tagName === 'LABEL' && input.checked === this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            ***REMOVED***
          ***REMOVED*** else {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            triggerChangeEvent = false;
          ***REMOVED***

          if (triggerChangeEvent) {
            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          ***REMOVED***

          input.focus();
          addAriaPressed = false;
        ***REMOVED***
      ***REMOVED***

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
        ***REMOVED***

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName$1.ACTIVE);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    ***REMOVED*** // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        ***REMOVED***

        if (config === 'toggle') {
          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Button;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON)[0***REMOVED***;
    ***REMOVED***

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    ***REMOVED*** else {
      var inputBtn = button.querySelector(Selector$1.INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      ***REMOVED***

      Button._jQueryInterface.call($(button), 'toggle');
    ***REMOVED***
  ***REMOVED***).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0***REMOVED***;
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  ***REMOVED***);
  $(window).on(Event$1.LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [***REMOVED***.slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i***REMOVED***;
      var input = button.querySelector(Selector$1.INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(ClassName$1.ACTIVE);
      ***REMOVED*** else {
        button.classList.remove(ClassName$1.ACTIVE);
      ***REMOVED***
    ***REMOVED*** // find all button toggles


    buttons = [***REMOVED***.slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i***REMOVED***;

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(ClassName$1.ACTIVE);
      ***REMOVED*** else {
        _button.classList.remove(ClassName$1.ACTIVE);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1***REMOVED*** = Button._jQueryInterface;
  $.fn[NAME$1***REMOVED***.Constructor = Button;

  $.fn[NAME$1***REMOVED***.noConflict = function () {
    $.fn[NAME$1***REMOVED*** = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.4.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2***REMOVED***;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  ***REMOVED***;
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  ***REMOVED***;
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  ***REMOVED***;
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  ***REMOVED***;
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  ***REMOVED***;
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide***REMOVED***, [data-slide-to***REMOVED***',
    DATA_RIDE: '[data-ride="carousel"***REMOVED***'
  ***REMOVED***;
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    ***REMOVED*** // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      ***REMOVED***
    ***REMOVED***;

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      ***REMOVED***
    ***REMOVED***;

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      ***REMOVED***
    ***REMOVED***;

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      ***REMOVED***

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      ***REMOVED***

      clearInterval(this._interval);
      this._interval = null;
    ***REMOVED***;

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      ***REMOVED***

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      ***REMOVED***

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      ***REMOVED***
    ***REMOVED***;

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      ***REMOVED***

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        ***REMOVED***);
        return;
      ***REMOVED***

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      ***REMOVED***

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index***REMOVED***);
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    ***REMOVED*** // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({***REMOVED***, Default, {***REMOVED***, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    ***REMOVED***;

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      ***REMOVED***

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      ***REMOVED*** // swipe right


      if (direction < 0) {
        this.next();
      ***REMOVED***
    ***REMOVED***;

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        ***REMOVED***);
      ***REMOVED***

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        ***REMOVED***).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        ***REMOVED***);
      ***REMOVED***

      if (this._config.touch) {
        this._addTouchEventListeners();
      ***REMOVED***
    ***REMOVED***;

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      ***REMOVED***

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()***REMOVED***) {
          _this3.touchStartX = event.originalEvent.clientX;
        ***REMOVED*** else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0***REMOVED***.clientX;
        ***REMOVED***
      ***REMOVED***;

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        ***REMOVED*** else {
          _this3.touchDeltaX = event.originalEvent.touches[0***REMOVED***.clientX - _this3.touchStartX;
        ***REMOVED***
      ***REMOVED***;

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()***REMOVED***) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        ***REMOVED***

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          ***REMOVED***

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          ***REMOVED***, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        ***REMOVED***
      ***REMOVED***;

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      ***REMOVED***);

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        ***REMOVED***);
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        ***REMOVED***);

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      ***REMOVED*** else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        ***REMOVED***);
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        ***REMOVED***);
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      ***REMOVED***

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      ***REMOVED***
    ***REMOVED***;

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [***REMOVED***.slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [***REMOVED***;
      return this._items.indexOf(element);
    ***REMOVED***;

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      ***REMOVED***

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1***REMOVED*** : this._items[itemIndex***REMOVED***;
    ***REMOVED***;

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      ***REMOVED***);
      $(this._element).trigger(slideEvent);
      return slideEvent;
    ***REMOVED***;

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [***REMOVED***.slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)***REMOVED***;

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      ***REMOVED*** else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      ***REMOVED***

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      ***REMOVED***

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      ***REMOVED***

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      ***REMOVED***

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      ***REMOVED***);

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        ***REMOVED*** else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        ***REMOVED***

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          ***REMOVED***, 0);
        ***REMOVED***).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      ***REMOVED***

      if (isCycling) {
        this.cycle();
      ***REMOVED***
    ***REMOVED*** // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread2({***REMOVED***, Default, {***REMOVED***, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread2({***REMOVED***, _config, {***REMOVED***, config);
        ***REMOVED***

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        ***REMOVED***

        if (typeof config === 'number') {
          data.to(config);
        ***REMOVED*** else if (typeof action === 'string') {
          if (typeof data[action***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          ***REMOVED***

          data[action***REMOVED***();
        ***REMOVED*** else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      ***REMOVED***

      var target = $(selector)[0***REMOVED***;

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      ***REMOVED***

      var config = _objectSpread2({***REMOVED***, $(target).data(), {***REMOVED***, $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      ***REMOVED***

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      ***REMOVED***

      event.preventDefault();
    ***REMOVED***;

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Carousel;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [***REMOVED***.slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i***REMOVED***);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    ***REMOVED***
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2***REMOVED*** = Carousel._jQueryInterface;
  $.fn[NAME$2***REMOVED***.Constructor = Carousel;

  $.fn[NAME$2***REMOVED***.noConflict = function () {
    $.fn[NAME$2***REMOVED*** = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.4.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3***REMOVED***;
  var Default$1 = {
    toggle: true,
    parent: ''
  ***REMOVED***;
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  ***REMOVED***;
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  ***REMOVED***;
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  ***REMOVED***;
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  ***REMOVED***;
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"***REMOVED***'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [***REMOVED***.slice.call(document.querySelectorAll("[data-toggle=\"collapse\"***REMOVED***[href=\"#" + element.id + "\"***REMOVED***," + ("[data-toggle=\"collapse\"***REMOVED***[data-target=\"#" + element.id + "\"***REMOVED***")));
      var toggleList = [***REMOVED***.slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i***REMOVED***;
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [***REMOVED***.slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        ***REMOVED***);

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        ***REMOVED***
      ***REMOVED***

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      ***REMOVED***

      if (this._config.toggle) {
        this.toggle();
      ***REMOVED***
    ***REMOVED*** // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      ***REMOVED*** else {
        this.show();
      ***REMOVED***
    ***REMOVED***;

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      ***REMOVED***

      var actives;
      var activesData;

      if (this._parent) {
        actives = [***REMOVED***.slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          ***REMOVED***

          return elem.classList.contains(ClassName$3.COLLAPSE);
        ***REMOVED***);

        if (actives.length === 0) {
          actives = null;
        ***REMOVED***
      ***REMOVED***

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        ***REMOVED***
      ***REMOVED***

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        ***REMOVED***
      ***REMOVED***

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension***REMOVED*** = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      ***REMOVED***

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension***REMOVED*** = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      ***REMOVED***;

      var capitalizedDimension = dimension[0***REMOVED***.toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension***REMOVED*** = this._element[scrollSize***REMOVED*** + "px";
    ***REMOVED***;

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      ***REMOVED***

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      var dimension = this._getDimension();

      this._element.style[dimension***REMOVED*** = this._element.getBoundingClientRect()[dimension***REMOVED*** + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i***REMOVED***;
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([***REMOVED***.slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      ***REMOVED***;

      this._element.style[dimension***REMOVED*** = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    ***REMOVED***;

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    ***REMOVED*** // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({***REMOVED***, Default$1, {***REMOVED***, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    ***REMOVED***;

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    ***REMOVED***;

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0***REMOVED***;
        ***REMOVED***
      ***REMOVED*** else {
        parent = document.querySelector(this._config.parent);
      ***REMOVED***

      var selector = "[data-toggle=\"collapse\"***REMOVED***[data-parent=\"" + this._config.parent + "\"***REMOVED***";
      var children = [***REMOVED***.slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element***REMOVED***);
      ***REMOVED***);
      return parent;
    ***REMOVED***;

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      ***REMOVED***
    ***REMOVED*** // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    ***REMOVED***;

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread2({***REMOVED***, Default$1, {***REMOVED***, $this.data(), {***REMOVED***, typeof config === 'object' && config ? config : {***REMOVED***);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        ***REMOVED***

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$1;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Collapse;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    ***REMOVED***

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [***REMOVED***.slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    ***REMOVED***);
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3***REMOVED*** = Collapse._jQueryInterface;
  $.fn[NAME$3***REMOVED***.Constructor = Collapse;

  $.fn[NAME$3***REMOVED***.noConflict = function () {
    $.fn[NAME$3***REMOVED*** = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.4.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4***REMOVED***;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  ***REMOVED***;
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  ***REMOVED***;
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"***REMOVED***',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  ***REMOVED***;
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  ***REMOVED***;
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  ***REMOVED***;
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    ***REMOVED*** // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      ***REMOVED***

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      ***REMOVED***

      this.show(true);
    ***REMOVED***;

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      ***REMOVED***

      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      ***REMOVED***

      var relatedTarget = {
        relatedTarget: this._element
      ***REMOVED***;
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      ***REMOVED*** // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        ***REMOVED***

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        ***REMOVED*** else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0***REMOVED***;
          ***REMOVED***
        ***REMOVED*** // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        ***REMOVED***

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      ***REMOVED*** // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      ***REMOVED***

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    ***REMOVED***;

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      ***REMOVED***

      var relatedTarget = {
        relatedTarget: this._element
      ***REMOVED***;
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      if (this._popper) {
        this._popper.destroy();
      ***REMOVED***

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      ***REMOVED***
    ***REMOVED***;

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      ***REMOVED***
    ***REMOVED*** // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      ***REMOVED***);
    ***REMOVED***;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({***REMOVED***, this.constructor.Default, {***REMOVED***, $(this._element).data(), {***REMOVED***, config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    ***REMOVED***;

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        ***REMOVED***
      ***REMOVED***

      return this._menu;
    ***REMOVED***;

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        ***REMOVED***
      ***REMOVED*** else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      ***REMOVED*** else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      ***REMOVED*** else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      ***REMOVED***

      return placement;
    ***REMOVED***;

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    ***REMOVED***;

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {***REMOVED***;

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({***REMOVED***, data.offsets, {***REMOVED***, _this2._config.offset(data.offsets, _this2._element) || {***REMOVED***);
          return data;
        ***REMOVED***;
      ***REMOVED*** else {
        offset.offset = this._config.offset;
      ***REMOVED***

      return offset;
    ***REMOVED***;

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          ***REMOVED***,
          preventOverflow: {
            boundariesElement: this._config.boundary
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        ***REMOVED***;
      ***REMOVED***

      return _objectSpread2({***REMOVED***, popperConfig, {***REMOVED***, this._config.popperConfig);
    ***REMOVED*** // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      ***REMOVED***

      var toggles = [***REMOVED***.slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i***REMOVED***);

        var context = $(toggles[i***REMOVED***).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i***REMOVED***
        ***REMOVED***;

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        ***REMOVED***

        if (!context) {
          continue;
        ***REMOVED***

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        ***REMOVED***

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        ***REMOVED***

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        ***REMOVED*** // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        ***REMOVED***

        toggles[i***REMOVED***.setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        ***REMOVED***

        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      ***REMOVED***
    ***REMOVED***;

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      ***REMOVED***

      return parent || element.parentNode;
    ***REMOVED*** // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      ***REMOVED***

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      ***REMOVED***

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      ***REMOVED***

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        ***REMOVED***

        $(this).trigger('click');
        return;
      ***REMOVED***

      var items = [***REMOVED***.slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS)).filter(function (item) {
        return $(item).is(':visible');
      ***REMOVED***);

      if (items.length === 0) {
        return;
      ***REMOVED***

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      ***REMOVED***

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      ***REMOVED***

      if (index < 0) {
        index = 0;
      ***REMOVED***

      items[index***REMOVED***.focus();
    ***REMOVED***;

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$2;
      ***REMOVED***
    ***REMOVED***, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Dropdown;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  ***REMOVED***).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4***REMOVED*** = Dropdown._jQueryInterface;
  $.fn[NAME$4***REMOVED***.Constructor = Dropdown;

  $.fn[NAME$4***REMOVED***.noConflict = function () {
    $.fn[NAME$4***REMOVED*** = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.4.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5***REMOVED***;
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  ***REMOVED***;
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  ***REMOVED***;
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDE_PREVENTED: "hidePrevented" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  ***REMOVED***;
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show',
    STATIC: 'modal-static'
  ***REMOVED***;
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"***REMOVED***',
    DATA_DISMISS: '[data-dismiss="modal"***REMOVED***',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    ***REMOVED*** // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    ***REMOVED***;

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      ***REMOVED***

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      ***REMOVED***

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      ***REMOVED***);
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      ***REMOVED***);
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***);

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      ***REMOVED***);
    ***REMOVED***;

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      ***REMOVED***

      if (!this._isShown || this._isTransitioning) {
        return;
      ***REMOVED***

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      ***REMOVED***

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        ***REMOVED***).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        this._hideModal();
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog***REMOVED***.forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      ***REMOVED***);
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    ***REMOVED***;

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    ***REMOVED*** // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({***REMOVED***, Default$3, {***REMOVED***, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    ***REMOVED***;

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $.Event(Event$5.HIDE_PREVENTED);
        $(this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.defaultPrevented) {
          return;
        ***REMOVED***

        this._element.classList.add(ClassName$5.STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(ClassName$5.STATIC);
        ***REMOVED***).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      ***REMOVED*** else {
        this.hide();
      ***REMOVED***
    ***REMOVED***;

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);
      var modalBody = this._dialog ? this._dialog.querySelector(Selector$5.MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      ***REMOVED***

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      ***REMOVED*** else {
        this._element.scrollTop = 0;
      ***REMOVED***

      if (transition) {
        Util.reflow(this._element);
      ***REMOVED***

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      ***REMOVED***

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      ***REMOVED***);

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        ***REMOVED***

        _this4._isTransitioning = false;
        $(_this4._element).trigger(shownEvent);
      ***REMOVED***;

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        transitionComplete();
      ***REMOVED***
    ***REMOVED***;

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED*** else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      ***REMOVED***
    ***REMOVED***;

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this7.handleUpdate(event);
        ***REMOVED***);
      ***REMOVED*** else {
        $(window).off(Event$5.RESIZE);
      ***REMOVED***
    ***REMOVED***;

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $(_this8._element).trigger(Event$5.HIDDEN);
      ***REMOVED***);
    ***REMOVED***;

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      ***REMOVED***
    ***REMOVED***;

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        ***REMOVED***

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          ***REMOVED***

          if (event.target !== event.currentTarget) {
            return;
          ***REMOVED***

          _this9._triggerBackdropTransition();
        ***REMOVED***);

        if (animate) {
          Util.reflow(this._backdrop);
        ***REMOVED***

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        ***REMOVED***

        if (!animate) {
          callback();
          return;
        ***REMOVED***

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      ***REMOVED*** else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          ***REMOVED***
        ***REMOVED***;

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        ***REMOVED*** else {
          callbackRemove();
        ***REMOVED***
      ***REMOVED*** else if (callback) {
        callback();
      ***REMOVED***
    ***REMOVED*** // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      ***REMOVED***

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      ***REMOVED***
    ***REMOVED***;

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    ***REMOVED***;

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    ***REMOVED***;

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [***REMOVED***.slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [***REMOVED***.slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        ***REMOVED***); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        ***REMOVED***); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      ***REMOVED***

      $(document.body).addClass(ClassName$5.OPEN);
    ***REMOVED***;

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [***REMOVED***.slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      ***REMOVED***); // Restore sticky content

      var elements = [***REMOVED***.slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        ***REMOVED***
      ***REMOVED***); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    ***REMOVED***;

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    ***REMOVED*** // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread2({***REMOVED***, Default$3, {***REMOVED***, $(this).data(), {***REMOVED***, typeof config === 'object' && config ? config : {***REMOVED***);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***(relatedTarget);
        ***REMOVED*** else if (_config.show) {
          data.show(relatedTarget);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$3;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Modal;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    ***REMOVED***

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread2({***REMOVED***, $(target).data(), {***REMOVED***, $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    ***REMOVED***

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      ***REMOVED***

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this11).is(':visible')) {
          _this11.focus();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***);

    Modal._jQueryInterface.call($(target), config, this);
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5***REMOVED*** = Modal._jQueryInterface;
  $.fn[NAME$5***REMOVED***.Constructor = Modal;

  $.fn[NAME$5***REMOVED***.noConflict = function () {
    $.fn[NAME$5***REMOVED*** = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  ***REMOVED***;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'***REMOVED***;
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-***REMOVED****$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN***REMOVED***,
    a: ['target', 'href', 'title', 'rel'***REMOVED***,
    area: [***REMOVED***,
    b: [***REMOVED***,
    br: [***REMOVED***,
    col: [***REMOVED***,
    code: [***REMOVED***,
    div: [***REMOVED***,
    em: [***REMOVED***,
    hr: [***REMOVED***,
    h1: [***REMOVED***,
    h2: [***REMOVED***,
    h3: [***REMOVED***,
    h4: [***REMOVED***,
    h5: [***REMOVED***,
    h6: [***REMOVED***,
    i: [***REMOVED***,
    img: ['src', 'alt', 'title', 'width', 'height'***REMOVED***,
    li: [***REMOVED***,
    ol: [***REMOVED***,
    p: [***REMOVED***,
    pre: [***REMOVED***,
    s: [***REMOVED***,
    small: [***REMOVED***,
    span: [***REMOVED***,
    sub: [***REMOVED***,
    sup: [***REMOVED***,
    strong: [***REMOVED***,
    u: [***REMOVED***,
    ul: [***REMOVED***
  ***REMOVED***;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#***REMOVED****(?:[/?#***REMOVED***|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/***REMOVED***+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      ***REMOVED***

      return true;
    ***REMOVED***

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    ***REMOVED***); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i***REMOVED***)) {
        return true;
      ***REMOVED***
    ***REMOVED***

    return false;
  ***REMOVED***

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    ***REMOVED***

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    ***REMOVED***

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [***REMOVED***.slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i***REMOVED***;
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      ***REMOVED***

      var attributeList = [***REMOVED***.slice.call(el.attributes);
      var whitelistedAttributes = [***REMOVED***.concat(whiteList['*'***REMOVED*** || [***REMOVED***, whiteList[elName***REMOVED*** || [***REMOVED***);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    ***REMOVED***

    return createdDocument.body.innerHTML;
  ***REMOVED***

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.4.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6***REMOVED***;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'***REMOVED***;
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  ***REMOVED***;
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  ***REMOVED***;
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  ***REMOVED***;
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  ***REMOVED***;
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  ***REMOVED***;
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  ***REMOVED***;
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      ***REMOVED*** // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {***REMOVED***;
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    ***REMOVED*** // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    ***REMOVED***;

    _proto.disable = function disable() {
      this._isEnabled = false;
    ***REMOVED***;

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    ***REMOVED***;

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      ***REMOVED***

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        ***REMOVED***

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        ***REMOVED*** else {
          context._leave(null, context);
        ***REMOVED***
      ***REMOVED*** else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        ***REMOVED***

        this._enter(null, this);
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $(this.tip).remove();
      ***REMOVED***

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      ***REMOVED***

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    ***REMOVED***;

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      ***REMOVED***

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        ***REMOVED***

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        ***REMOVED***

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        ***REMOVED***

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        ***REMOVED***

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          ***REMOVED***

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          ***REMOVED***
        ***REMOVED***;

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        ***REMOVED*** else {
          complete();
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        ***REMOVED***

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        ***REMOVED***

        if (callback) {
          callback();
        ***REMOVED***
      ***REMOVED***;

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      ***REMOVED***

      this._activeTrigger[Trigger.CLICK***REMOVED*** = false;
      this._activeTrigger[Trigger.FOCUS***REMOVED*** = false;
      this._activeTrigger[Trigger.HOVER***REMOVED*** = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        complete();
      ***REMOVED***

      this._hoverState = '';
    ***REMOVED***;

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      ***REMOVED***
    ***REMOVED*** // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    ***REMOVED***;

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    ***REMOVED***;

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0***REMOVED***;
      return this.tip;
    ***REMOVED***;

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    ***REMOVED***;

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          ***REMOVED***
        ***REMOVED*** else {
          $element.text($(content).text());
        ***REMOVED***

        return;
      ***REMOVED***

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        ***REMOVED***

        $element.html(content);
      ***REMOVED*** else {
        $element.text(content);
      ***REMOVED***
    ***REMOVED***;

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      ***REMOVED***

      return title;
    ***REMOVED*** // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          ***REMOVED***,
          arrow: {
            element: Selector$6.ARROW
          ***REMOVED***,
          preventOverflow: {
            boundariesElement: this.config.boundary
          ***REMOVED***
        ***REMOVED***,
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          ***REMOVED***
        ***REMOVED***,
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        ***REMOVED***
      ***REMOVED***;
      return _objectSpread2({***REMOVED***, defaultBsConfig, {***REMOVED***, this.config.popperConfig);
    ***REMOVED***;

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {***REMOVED***;

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({***REMOVED***, data.offsets, {***REMOVED***, _this4.config.offset(data.offsets, _this4.element) || {***REMOVED***);
          return data;
        ***REMOVED***;
      ***REMOVED*** else {
        offset.offset = this.config.offset;
      ***REMOVED***

      return offset;
    ***REMOVED***;

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      ***REMOVED***

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      ***REMOVED***

      return $(document).find(this.config.container);
    ***REMOVED***;

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()***REMOVED***;
    ***REMOVED***;

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          ***REMOVED***);
        ***REMOVED*** else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $(_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          ***REMOVED***).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***);

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        ***REMOVED***
      ***REMOVED***;

      $(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _objectSpread2({***REMOVED***, this.config, {
          trigger: 'manual',
          selector: ''
        ***REMOVED***);
      ***REMOVED*** else {
        this._fixTitle();
      ***REMOVED***
    ***REMOVED***;

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      ***REMOVED***
    ***REMOVED***;

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      ***REMOVED***

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER***REMOVED*** = true;
      ***REMOVED***

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      ***REMOVED***

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      ***REMOVED***

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        ***REMOVED***
      ***REMOVED***, context.config.delay.show);
    ***REMOVED***;

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      ***REMOVED***

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER***REMOVED*** = false;
      ***REMOVED***

      if (context._isWithActiveTrigger()) {
        return;
      ***REMOVED***

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      ***REMOVED***

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        ***REMOVED***
      ***REMOVED***, context.config.delay.hide);
    ***REMOVED***;

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger***REMOVED***) {
          return true;
        ***REMOVED***
      ***REMOVED***

      return false;
    ***REMOVED***;

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr***REMOVED***;
        ***REMOVED***
      ***REMOVED***);
      config = _objectSpread2({***REMOVED***, this.constructor.Default, {***REMOVED***, dataAttributes, {***REMOVED***, typeof config === 'object' && config ? config : {***REMOVED***);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        ***REMOVED***;
      ***REMOVED***

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      ***REMOVED***

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      ***REMOVED***

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      ***REMOVED***

      return config;
    ***REMOVED***;

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {***REMOVED***;

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key***REMOVED*** !== this.config[key***REMOVED***) {
            config[key***REMOVED*** = this.config[key***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      return config;
    ***REMOVED***;

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      ***REMOVED***
    ***REMOVED***;

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    ***REMOVED***;

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      ***REMOVED***

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    ***REMOVED*** // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        ***REMOVED***

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$4;
      ***REMOVED***
    ***REMOVED***, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      ***REMOVED***
    ***REMOVED***, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      ***REMOVED***
    ***REMOVED***, {
      key: "Event",
      get: function get() {
        return Event$6;
      ***REMOVED***
    ***REMOVED***, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      ***REMOVED***
    ***REMOVED***, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Tooltip;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6***REMOVED*** = Tooltip._jQueryInterface;
  $.fn[NAME$6***REMOVED***.Constructor = Tooltip;

  $.fn[NAME$6***REMOVED***.noConflict = function () {
    $.fn[NAME$6***REMOVED*** = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.4.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7***REMOVED***;
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread2({***REMOVED***, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  ***REMOVED***);

  var DefaultType$5 = _objectSpread2({***REMOVED***, Tooltip.DefaultType, {
    content: '(string|element|function)'
  ***REMOVED***);

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  ***REMOVED***;
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    ***REMOVED***

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    ***REMOVED***;

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    ***REMOVED***;

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0***REMOVED***;
      return this.tip;
    ***REMOVED***;

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      ***REMOVED***

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    ***REMOVED*** // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    ***REMOVED***;

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      ***REMOVED***
    ***REMOVED*** // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        ***REMOVED***

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$5;
      ***REMOVED***
    ***REMOVED***, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      ***REMOVED***
    ***REMOVED***, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      ***REMOVED***
    ***REMOVED***, {
      key: "Event",
      get: function get() {
        return Event$7;
      ***REMOVED***
    ***REMOVED***, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      ***REMOVED***
    ***REMOVED***, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Popover;
  ***REMOVED***(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7***REMOVED*** = Popover._jQueryInterface;
  $.fn[NAME$7***REMOVED***.Constructor = Popover;

  $.fn[NAME$7***REMOVED***.noConflict = function () {
    $.fn[NAME$7***REMOVED*** = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.4.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8***REMOVED***;
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  ***REMOVED***;
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  ***REMOVED***;
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  ***REMOVED***;
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  ***REMOVED***;
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"***REMOVED***',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  ***REMOVED***;
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [***REMOVED***;
      this._targets = [***REMOVED***;
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      ***REMOVED***);
      this.refresh();

      this._process();
    ***REMOVED*** // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [***REMOVED***;
      this._targets = [***REMOVED***;
      this._scrollHeight = this._getScrollHeight();
      var targets = [***REMOVED***.slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        ***REMOVED***

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod***REMOVED***().top + offsetBase, targetSelector***REMOVED***;
          ***REMOVED***
        ***REMOVED***

        return null;
      ***REMOVED***).filter(function (item) {
        return item;
      ***REMOVED***).sort(function (a, b) {
        return a[0***REMOVED*** - b[0***REMOVED***;
      ***REMOVED***).forEach(function (item) {
        _this2._offsets.push(item[0***REMOVED***);

        _this2._targets.push(item[1***REMOVED***);
      ***REMOVED***);
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    ***REMOVED*** // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({***REMOVED***, Default$6, {***REMOVED***, typeof config === 'object' && config ? config : {***REMOVED***);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        ***REMOVED***

        config.target = "#" + id;
      ***REMOVED***

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    ***REMOVED***;

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    ***REMOVED***;

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    ***REMOVED***;

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    ***REMOVED***;

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      ***REMOVED***

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1***REMOVED***;

        if (this._activeTarget !== target) {
          this._activate(target);
        ***REMOVED***

        return;
      ***REMOVED***

      if (this._activeTarget && scrollTop < this._offsets[0***REMOVED*** && this._offsets[0***REMOVED*** > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      ***REMOVED***

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i***REMOVED*** && scrollTop >= this._offsets[i***REMOVED*** && (typeof this._offsets[i + 1***REMOVED*** === 'undefined' || scrollTop < this._offsets[i + 1***REMOVED***);

        if (isActiveTarget) {
          this._activate(this._targets[i***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"***REMOVED***," + selector + "[href=\"" + target + "\"***REMOVED***";
      ***REMOVED***);

      var $link = $([***REMOVED***.slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      ***REMOVED*** else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      ***REMOVED***

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      ***REMOVED***);
    ***REMOVED***;

    _proto._clear = function _clear() {
      [***REMOVED***.slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      ***REMOVED***).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      ***REMOVED***);
    ***REMOVED*** // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$6;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return ScrollSpy;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [***REMOVED***.slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i***REMOVED***);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    ***REMOVED***
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8***REMOVED*** = ScrollSpy._jQueryInterface;
  $.fn[NAME$8***REMOVED***.Constructor = ScrollSpy;

  $.fn[NAME$8***REMOVED***.noConflict = function () {
    $.fn[NAME$8***REMOVED*** = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.4.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9***REMOVED***;
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  ***REMOVED***;
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"***REMOVED***, [data-toggle="pill"***REMOVED***, [data-toggle="list"***REMOVED***',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    ***REMOVED*** // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      ***REMOVED***

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0***REMOVED***;
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1***REMOVED***;
      ***REMOVED***

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      ***REMOVED***);
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      ***REMOVED***);

      if (previous) {
        $(previous).trigger(hideEvent);
      ***REMOVED***

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      if (selector) {
        target = document.querySelector(selector);
      ***REMOVED***

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        ***REMOVED***);
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        ***REMOVED***);
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      ***REMOVED***;

      if (target) {
        this._activate(target, target.parentNode, complete);
      ***REMOVED*** else {
        complete();
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    ***REMOVED*** // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0***REMOVED***;
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      ***REMOVED***;

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        complete();
      ***REMOVED***
    ***REMOVED***;

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0***REMOVED***;

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        ***REMOVED***

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        ***REMOVED***
      ***REMOVED***

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      ***REMOVED***

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      ***REMOVED***

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0***REMOVED***;

        if (dropdownElement) {
          var dropdownToggleList = [***REMOVED***.slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        ***REMOVED***

        element.setAttribute('aria-expanded', true);
      ***REMOVED***

      if (callback) {
        callback();
      ***REMOVED***
    ***REMOVED*** // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Tab;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9***REMOVED*** = Tab._jQueryInterface;
  $.fn[NAME$9***REMOVED***.Constructor = Tab;

  $.fn[NAME$9***REMOVED***.noConflict = function () {
    $.fn[NAME$9***REMOVED*** = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  ***REMOVED***;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.4.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a***REMOVED***;
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  ***REMOVED***;
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  ***REMOVED***;
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  ***REMOVED***;
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  ***REMOVED***;
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"***REMOVED***'
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    ***REMOVED*** // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $.Event(Event$a.SHOW);
      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      ***REMOVED***

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          ***REMOVED***, _this._config.delay);
        ***REMOVED***
      ***REMOVED***;

      this._element.classList.remove(ClassName$a.HIDE);

      Util.reflow(this._element);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        complete();
      ***REMOVED***
    ***REMOVED***;

    _proto.hide = function hide() {
      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      ***REMOVED***

      var hideEvent = $.Event(Event$a.HIDE);
      $(this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      ***REMOVED***

      this._close();
    ***REMOVED***;

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      ***REMOVED***

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    ***REMOVED*** // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({***REMOVED***, Default$7, {***REMOVED***, $(this._element).data(), {***REMOVED***, typeof config === 'object' && config ? config : {***REMOVED***);
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    ***REMOVED***;

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this2.hide();
      ***REMOVED***);
    ***REMOVED***;

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(ClassName$a.HIDE);

        $(_this3._element).trigger(Event$a.HIDDEN);
      ***REMOVED***;

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else {
        complete();
      ***REMOVED***
    ***REMOVED*** // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        ***REMOVED***

        if (typeof config === 'string') {
          if (typeof data[config***REMOVED*** === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config***REMOVED***(this);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      ***REMOVED***
    ***REMOVED***, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      ***REMOVED***
    ***REMOVED***, {
      key: "Default",
      get: function get() {
        return Default$7;
      ***REMOVED***
    ***REMOVED******REMOVED***);

    return Toast;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a***REMOVED*** = Toast._jQueryInterface;
  $.fn[NAME$a***REMOVED***.Constructor = Toast;

  $.fn[NAME$a***REMOVED***.noConflict = function () {
    $.fn[NAME$a***REMOVED*** = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  ***REMOVED***;

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true ***REMOVED***);

***REMOVED***)));
//# sourceMappingURL=bootstrap.js.map
