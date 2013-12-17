define('dom', ['underscore'], function(_) {

  /**
   * @module dom
   */

  /* Variables
   * #################################################### */

  var _undefined;
  var win = window;
  var doc = document;
  var getComputedStyleValue;
  var querySelectorAll;
  var vendorInnerText = 'innerText' in doc.createElement('div') ? 'innerText' : 'textContent';
  var cssDisplayKey = 'display';
  var cssDisplayBackup = '_' + cssDisplayKey;
  var cssDisplayTrue = 'block';
  var cssDisplayFalse = 'none';

  /* Dependencies
  * #################################################### */

  var compose = _.compose;
  var contains = _.contains;
  var each = _.each;
  var filter = _.filter;
  var arrayIndexOf = _.indexOf;
  var isBoolean = _.isBoolean;
  var isElement = _.isElement;
  var isNumber = _.isNumber;
  var isString = _.isString;
  var isUndefined = _.isUndefined;
  var map = _.map;
  var partial = _.partial;
  var reduce = _.reduce;
  var toArray = _.toArray;
  var uniq = _.uniq;

  /* Module
  * #################################################### */

  /**
   * @alias module:dom
   * @type {Function}
   * @param  {String|HTMLElement|HTMLElement[]|DomLibrary} nodes
   * @example
   *   var $x = dom('&lt;div&gt;');
   *   var $xs = dom('div,.query,#query');
   *   var $x = dom( Element);
   *   var $xs = dom([HTMLElement, HTMLElement]);
   * @return {DomLibrary}
   */
  var exports = function(nodes) {
    return new DomLibrary(toNodeArray(nodes));
  };

  /* Patches, workarounds etc
  * #################################################### */

  /**
   * Fall Back for https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect
   * @param  {HTMLElement} node
   * @return {Object}
   * @private
   */
  function getBoundingClientRectFallBack(node) {
    var top = node.offsetTop;
    var left = node.offsetLeft;
    var width = node.offsetWidth;
    var height = node.offsetHeight;

    while(node.offsetParent) {
      node = node.offsetParent;
      top += (node.offsetTop/* - node.scrollTop*/);
      left += (node.offsetLeft/* - node.scrollLeft*/);
    }

    return {
      top: top,
      left: left,
      width: width,
      height: height
    };
  }

  /* Composed or partially applied
  * #################################################### */

  /**
   * Used in composition, get node by index
   * @param  {Number} ix
   * @return {HTMLElement}
   * @private
   */
  function getNode(ix) {
    return this.nodes[ix];
  }

  /**
   * Used in composition, return this for chaining
   * @return {DomLibrary}
   * @private
   */
  function chain() {
    return this;
  }

  /**
   * Get member by name
   * @param {String|Number} name
   * @param {Object}        scope
   * @return {Mixed}
   * @private
   */
  function getMember(name, scope) {
    return scope[name];
  }

  /**
   * Return a new DomLibrary containing only elements where a match for selector equals filterOut
   * @param  {Boolean} filterOut
   * @param  {String} selector
   * @return {DomLibrary}
   * @private
   */
  function getNodeListFilter(filterOut, selector) {
    return exports(filter(this.nodes, function(node) {
      return is(node, selector) !== filterOut;
    }));
  }

  /**
   * If the collection is not empty, apply the first node and param to method - else return defaultValue if empty.
   * @param  {Function} method
   * @param  {Mixed} defaultValue
   * @param  {Mixed} param
   * @return {Mixed}
   * @private
   */
  function applyToFirstNode(method, defaultValue, param) {
    return this.nodes[0] ? method(this.nodes[0], param) : defaultValue;
  }

  /* Utils
  * #################################################### */

  /**
   * Convert dash seperated strings to camelCase
   * @param  {String} x  eg. hello-world
   * @return {String}    eg. helloWorld
   * @memberOf string
   * @private
   */
  function toCamelCase(x) {
    return x.replace(/-./g, function(sub) {
      return sub.slice(1).toUpperCase();
    });
  }

  /**
   * @param  {String} html
   * @return {NodeList}
   * @private
   */
  function htmlToNodeList(html) {
    var fragment = doc.createElement('div');
    fragment.innerHTML = html;
    return fragment.childNodes;
  }

  /**
   * @param  {String|HTMLElement|HTMLElement[]|DomLibrary} input
   * @return {HTMLElement[]}
   * @private
   */
  function toNodeArray(input) {
    return isString(input) ?
      (toArray(input.search(/</) !== -1 ? htmlToNodeList(input) : querySelectorAll(doc, input)))
      : isElement(input) ?
        [input]
        : input ?
          (input.nodes ? input.nodes : input.length ? input : [])
          : [];
  }

  /**
   * From each element in this collection, use method to retrieve other elements from within each of them
   * @param  {Function} method   (node:HTMLElement, ix:Number, list:Array):Array
   * @param  {String}   selector
   * @return {Array}
   * @private
   */
  function gatherRelations(method, selector) {
    var matches = [];
    each(this.nodes, function(relation) {
      each(method(relation, selector), function(matchingRelation) {
        matches.push(matchingRelation);
      });
    });
    return matches;
  }

  /**
   * Copy a collection of elements to a Document Fragment
   * @param  {HTMLElement[]} moving
   * @return  {DocumentFragment}
   * @private
   */
  function copyToFragment(moving) {
    var fragment = doc.createDocumentFragment();
    each(moving, function(movingNode) {
      append(fragment, movingNode.cloneNode(true));
    });
    return fragment;
  }

  /**
   *
   * @param  {Function} method  (a:HTMLElement, b:HTMLElement)
   * @param  {HTMLElement}   moving
   * @param  {HTMLElement[]} receiving
   * @private
   */
  function oneToMany (method, moving, receiving) {
    each(receiving, function(receivingNode) {
      method(moving.cloneNode(true), receivingNode);
    });
  }

  /**
   *
   * @param  {Function} method  (a:HTMLElement, b:HTMLElement)
   * @param  {HTMLElement[]} moving
   * @param  {HTMLElement}   receiving
   * @private
   */
  function manyToOne (method, moving, receiving) {
    method(copyToFragment(moving), receiving);
  }

  /**
   *
   * @param  {Function} method  (a:HTMLElement, b:HTMLElement)
   * @param  {HTMLElement[]} moving
   * @param  {HTMLElement[]} receiving
   * @private
   */
  function manyToMany (method, moving, receiving) {
    oneToMany(method, copyToFragment(moving), receiving);
  }

  /**
   * Abstraction behind Abstraction behind append{@link dom.prototype.append}, {@link dom.prototype.appendTo}, {@link dom.prototype.insertAfter}, {@link dom.prototype.insertBefore}, {@link dom.prototype.prepend}, {@link dom.prototype.prependTo}, {@link dom.prototype.wrap}.
   * @param  {Function}  method  (moving:HTMLElement, receiving:HTMLElement):Undefined
   * @param  {String|HTMLElement|HTMLElement[]|DomLibrary}  selector
   * @return {DomLibrary}
   * @private
   */
  function moveOrCopyCollection(method, selector) {
    var moving = this;
    var movingSize = moving.size();
    var receiving = exports(selector);
    var receivingSize = receiving.size();

    movingSize === 1 ?
      receivingSize === 1 ?
        method(moving.nodes[0], receiving.nodes[0])
        : receivingSize > 1 ?
          oneToMany(method, moving.nodes[0], receiving.nodes)
          : false
      : movingSize > 1 ?
        receivingSize === 1 ?
          manyToOne(method, moving.nodes, receiving.nodes[0])
          : receivingSize > 1 ?
            manyToMany(method, moving.nodes, receiving.nodes)
            : false
        : false;

    return this;
  }

  /**
   * @param  {HTMLElement} node
   * @return {Object}
   * @private
   */
  function getBoundingClientRect(node) {
    return node.getBoundingClientRect ? node.getBoundingClientRect() : getBoundingClientRectFallBack(node);
  }

  /* Conditionally or partially applied
  * #################################################### */

  getComputedStyleValue = 'getComputedStyle' in win ?
    function(node, property) {
      return win.getComputedStyle(node, null).getPropertyValue(property);
    }
    : function(node, property) {
      return node.currentStyle[toCamelCase(property)];
    };

  querySelectorAll = 'querySelectorAll' in doc ?
    function  (el, selector) {
      return el.querySelectorAll(selector);
    }
    : function () {
      return [];
    };

  /* Node Methods
  * #################################################### */

  /**
   * @TODO swap args to curry
   * @param  {[type]}  node
   * @param  {[type]}  selector
   * @return {Boolean}
   * @private
   */
  function is(node, selector) {
    var nodes = querySelectorAll(node.parentNode, selector);
    return nodes && contains(nodes, node);
  }

  /**
   * @param {HTMLElement} node
   * @param  {String} selector
   * @return {HTMLElement|Undefined}
   * @private
   */
  function closest(node, selector) {
    var nodeParent;
    return is(node, selector) ? node : (nodeParent = node.parentNode) && nodeParent !== doc ? closest(nodeParent, selector) : _undefined;
  }

  /**
   *
   * @param {HTMLElement} node
   * @returns {HTMLElement|Undefined}
   */
  function parent(node){
      return node.parentNode;
  }

  /**
   * @param  {HTMLElement} node
   * @param  {String} property
   * @return {String|Undefined}
   * @private
   */
  function getCss(node, property) {
    return node.style[toCamelCase(property)] || getComputedStyleValue(node, property) || _undefined;
  }

  /**
   * @param {HTMLElement} node
   * @param {String} property
   * @param {[type]} value
   * @private
   */
  function setCss(node, property, value) {
    node.style[toCamelCase(property)] = (!isNumber(value) ? value || '' : value + 'px');
  }

  /**
   * @param  {HTMLElement} node
   * @return {[type]}
   * @private
   */
  function offset(node) {
    var metrics = getBoundingClientRect(node);
    var top = metrics.top;
    var left = metrics.left;
    var width = metrics.width || node.clientWidth;
    var height = metrics.height || node.clientHeight;
    var scrollLeft = (win.pageXOffset !== _undefined) ? win.pageXOffset : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
    var scrollTop = (win.pageYOffset !== _undefined) ? win.pageYOffset : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;

    return {
      top: top/* + scrollTop*/,
      right: left + width,
      bottom: top + height,
      left: left/* + scrollLeft*/,
      width: width,
      height: height
    };
  }

  function getClassNameRegExp (cls) {
    return new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
  }

  /**
   * @param  {[type]}  node
   * @param  {[type]}  cls
   * @return {Boolean}
   * @private
   */
  function hasClass(node, cls) {
    return node.className.search(getClassNameRegExp(cls)) !== -1;
  }

  /**
   * @param  {[type]}  node
   * @param  {[type]}  cls
   * @private
   */
  function addClass(node, cls) {

    if (!hasClass(node, cls)) {
      var classList = node.className ? node.className.split(' ') : [];
      classList.push(cls);
      node.className = classList.join(' ');
    }
  }

  /**
   * @param  {[type]}  node
   * @param  {[type]}  cls
   * @private
   */
  function removeClass(node, cls) {
    if (hasClass(node, cls)) {
      var classList = _.without(node.className.split(' '), cls);
      node.className = classList.join(' ');
    }
  }

  /**
   * @param  {HTMLElement} node
   * @private
   */
  function remove(node) {
    if(node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  /**
   * @param  {HTMLElement} receiving
   * @param  {HTMLElement} moving
   * @private
   */
  function append(receiving, moving) {
    receiving.appendChild(moving);
  }

  /**
   * @param  {HTMLElement} receiving
   * @param  {HTMLElement} moving
   * @private
   */
  function prepend(receiving, moving) {
    receiving.insertBefore(moving, receiving.firstChild);
  }

  /**
   * @param  {HTMLElement} moving
   * @param  {HTMLElement} receiving
   * @private
   */
  function appendTo(moving, receiving) {
    append(receiving, moving);
  }

  /**
   * @param  {HTMLElement} moving
   * @param  {HTMLElement} receiving
   * @private
   */
  function prependTo(moving, receiving) {
    prepend(receiving, moving);
  }

  /**
   * @param  {HTMLElement} moving
   * @param  {HTMLElement} receiving
   * @private
   */
  function insertBefore(moving, receiving) {
    receiving.parentNode.insertBefore(moving, receiving);
  }

  /**
   * @param  {HTMLElement} moving
   * @param  {HTMLElement} receiving
   * @private
   */
  function insertAfter(moving, receiving) {
    receiving.parentNode.insertBefore(moving, receiving.nextSibling);
  }

  /**
   * @param  {HTMLElement} outgoing
   * @param  {HTMLElement} incoming
   * @private
   */
  function replace(outgoing, incoming) {
    outgoing.parentNode.replaceChild(incoming, outgoing);
  }

  /**
   * @param  {HTMLElement} moving
   * @param  {HTMLElement} receiving
   * @private
   */
  function wrap(moving, receiving) {
    replace(moving, receiving);
    append(innerMost(receiving), moving);
  }

  /**
   * @param  {HTMLElement} node
   * @return {[type]}
   * @private
   */
  function innerMost(node) {
    return node.firstChild ? innerMost(node.firstChild) : node;
  }

  /**
   * @param  {HTMLElement} node
   * @param  {String} selector
   * @return {NodeList}
   * @private
   */
  function find(node, selector) {
    return querySelectorAll(node, selector) || _undefined;
  }

  /**
   * @param  {HTMLElement} node
   * @param  {String} selector
   * @return {HTMLElement[]}
   * @private
   */
  function children(node, selector) {
    return !selector ? toArray(node.childNodes) : filter(node.childNodes, function(el) {
      return is(el, selector);
    });
  }

  /**
   * @param  {String} siblingProperty "previousSibling" or "nextSibling"
   * @param  {HTMLElement} node
   * @param  {String} selector
   * @return {HTMLElement[]}
   * @private
   */
  function getSiblings(siblingProperty, node, selector) {
    var sibling = node[siblingProperty];
    return !sibling ? [] : [].concat(!selector || is(sibling, selector) ? sibling : getSiblings(siblingProperty, sibling, selector));
  }

  /* NodeList wrapper
  * #################################################### */

  /**
   * @class DomLibrary
   * @param {HTMLElement[]} nodes
   * @private
   */
  function DomLibrary(nodes) {
    this.nodes = nodes;
  }

  DomLibrary.prototype = {

    /**
     * Adds the specified class(es) to each of the set of matched elements.
     * @param {String} cls
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    addClass: function (cls) {
      return this.each(function(node) {
        addClass(node, cls);
      });
    },

    /**
     * Removes the specified class(es) from each of the set of matched elements.
     * @param {String} cls
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    removeClass: function (cls) {
      return this.each(function(node) {
        removeClass(node, cls);
      });
    },

    /**
     * Removes the matching elements from the DOM. @TODO: also remove event listeners
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    remove: function () {
      return this.each(remove);
    },

    /**
     * Does the first element in the collection match the selector?
     * @param {String} selector
     * @type {Boolean}
     * @memberOf DomLibrary.prototype
     */
    is: partial(applyToFirstNode, is, false),

    /**
     * Begins with the current element, travels up the DOM tree until it finds a match for the supplied selector.
     * The returned object contains zero or one element.
     * @param  {String} selector
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    closest: compose(exports, partial(applyToFirstNode, closest, _undefined)),

    /**
     * Does the first element in this collection have this class?
     * @param  {String}  cls
     * @return {Boolean}
     * @memberOf DomLibrary.prototype
     */
    hasClass: partial(applyToFirstNode, hasClass, false),

    /**
     * Get the current coordinates of the first element in the set of matched elements, relative to the document
     * @return {Number} coords.left
     * @return {Number} coords.top
     * @return {Number} coords.width
     * @return {Number} coords.height
     * @memberOf DomLibrary.prototype
     */
    offset: partial(applyToFirstNode, offset, null),

    /**
     * Get the current computed height for the first element in the set of matched elements, or -1
     * @return {Number}
     * @memberOf DomLibrary.prototype
     */
    height: partial(applyToFirstNode, partial(getMember, 'offsetHeight'), 0),

    /**
     * Get the current computed width for the first element in the set of matched elements, or -1
     * @return {Number}
     * @memberOf DomLibrary.prototype
     */
    width: partial(applyToFirstNode, partial(getMember, 'offsetWidth'), 0),

    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * @param  {String|HTMLElement|DomLibrary} otherNode
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    append: partial(moveOrCopyCollection, append),

    /**
     * Insert every element in the set of matched elements to the end of the target.
     * @param  {String|HTMLElement|DomLibrary} otherNode
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    appendTo: partial(moveOrCopyCollection, appendTo),

    /**
     * Insert every element in the set of matched elements after the target.
     * @param  {HTMLElement} target
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    insertAfter: partial(moveOrCopyCollection, insertAfter),

    /**
     * Insert every element in the set of matched elements before the target.
     * @param  {HTMLElement} target
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    insertBefore: partial(moveOrCopyCollection, insertBefore),

    /**
     * Insert content, specified by the parameter, to the start of each element in the set of matched elements.
     * @param  {String|HTMLElement|DomLibrary} node
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    prepend: partial(moveOrCopyCollection, prepend),

    /**
     * Insert every element in the set of matched elements to the start of the target.
     * @param  {String|HTMLElement|DomLibrary} target
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    prependTo: partial(moveOrCopyCollection, prependTo),

    /**
     * Wrap an HTML structure around each element in the set of matched elements.
     * @param  {String|HTMLElement|DomLibrary} wrapper
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    wrap: partial(moveOrCopyCollection, wrap),

    /**
     * How many elements are in this collection?
     * @return {Number}
     * @memberOf DomLibrary.prototype
     */
    size: function() {
      return this.nodes.length;
    },

    /**
     * Return a new collection containing elements from this one that match the selector
     * @param  {String} selector
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    find: partial(compose(exports, uniq, gatherRelations), find),

    /**
     * Return a new collection containing only those elements which match selector
     * @param  {String}
     * @param  {Boolean} filterOut  exclude elements which match the selector instead
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    filter: partial(getNodeListFilter, false),

    /**
     * Get the children of each element in the set of matched elements, optionally filtered by a selector.
     * @param  {String} selector
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    children: partial(compose(exports, gatherRelations), children),

   /**
    * Get the parent of the element.
    * @return {DomLibrary}
    * @memberOf DomLibrary.prototype
    */
    parent: compose(exports, partial(applyToFirstNode, parent, _undefined)),

    /**
     * Get the following siblings of each element in the set of matched elements, optionally filtered by a selector.
     * @param  {String} selector
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    next: partial(compose(exports, gatherRelations), partial(getSiblings, 'nextSibling')),

    /**
     * Get the preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
     * @param  {String} selector
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    prev: partial(compose(exports, gatherRelations), partial(getSiblings, 'previousSibling')),

    /**
     * Returns a new DomLibrary with elements that do not match the given selector removed
     * @param  {String} selector
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    not: partial(getNodeListFilter, true),

    /**
     * Calls iterator(el:HTMLElement, ix:Number, list:Array) for every member of this Array
     * @param  {Function} iterator
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    each: compose(chain, function(iterator) {
      each(this.nodes, iterator);
    }),

    /**
     * Returns a new DomLibrary with only the element at zero-based index
     * @param  {Number} index
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    eq: compose(exports, getNode),

    /**
     * Reduce the set of matched elements to the last in the set.
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    last: function() {
      return this.eq(this.size() - 1);
    },

    /**
     * Reduce the set of matched elements to the first in the set.
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    first: compose(exports, partial(getNode, 0)),

    /**
     * Returns zero-based index of first element relative to it's DOM siblings if no argument is passed.
     * Returns zero-based index of the passed element relative to the original collection if a DomLibrary or HTMLElement is passed.
     * @param  {HTMLElement} [element]
     * @return {Number}
     * @memberOf DomLibrary.prototype
     */
    index: function(element) {
      var nodes = this.nodes;
      var first = nodes[0];
      return !first ? -1 : element ? arrayIndexOf(nodes, element) : arrayIndexOf(first.parentNode.childNodes, first);
    },

    /**
     * Returns the collection as a plain Array or the member at index if passed
     * @param  {Number} [index]
     * @return {Array|HTMLElement}
     * @memberOf DomLibrary.prototype
     */
    get: function(index) {
      return !isUndefined(index) ? this.nodes[index] : this.nodes;
    },

    /**
     * Returns the CSS property value of key from the first element
     * @param  {String} key
     * @return {String|Undefined}
     * @memberOf DomLibrary.prototype
     */
    getCss: partial(applyToFirstNode, getCss, _undefined),

    /**
     * Sets the CSS value to every element in the collection
     * @param  {String} key
     * @param  {String|Number} value
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    setCss: function(key, value) {
      return this.each(function(node) {
        setCss(node, key, value);
      });
    },

    /**
     * Set csstext directly with a css string
     * @param {String|Number} value
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
     setCssString: function(value) {
      return this.each(function(node) {
        node.style.cssText += value;
      });
    },

    /**
     * Sets the HTML contents of each element in the set of matched elements if "html" is present
     * Gets the HTML contents of the first element in the set of matched elements if "html" is not present
     * @param  {String} [html]
     * @return {String|DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    html: function(html) {
      return isString(html) || isNumber(html) ? this.each(function(node) {
        node.innerHTML = html;
      }) : (this.nodes[0] || {}).innerHTML || '';
    },

    /**
     * Gets the combined text contents of each element in the set of matched elements, including their descendants
     * @return {String}
     * @memberOf DomLibrary.prototype
     */
    getText: function() {
      return !this.size() ? '' : reduce(this.nodes, function(memo, node) {
        return memo + node[vendorInnerText];
      }, '');
    },

    /**
     * Sets the content of each element in the set of matched elements to the specified "text".
     * @param  {String} [text]
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    setText: function(text) {
      return this.each(function(node) {
        node[vendorInnerText] = text;
      });
    },

    /**
     * Toggle presence of "cls" if add is not set, otherwise add if "add" is true or remove if is false.
     * Returns whether the class is present after having been processed.
     * @param  {String} cls
     * @param  {Boolean} [add]
     * @return {Boolean}
     * @memberOf DomLibrary.prototype
     */
    toggleClass: function(cls, add) {
      add = isBoolean(add) ? add : !this.hasClass(cls);
      this[add ? 'addClass' : 'removeClass'](cls);
      return !add;
    },

    /**
     * Prevents an element from being visible or occupying space
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    hide: function() {
      this.setAttr(cssDisplayBackup, this.getCss(cssDisplayKey));
      return this.setCss(cssDisplayKey, cssDisplayFalse);
    },

    /**
     * Restores a hidden element to be visible and occupying space
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    show: function() {
      var displayValue = this.getAttr(cssDisplayBackup);
      this.setCss(cssDisplayKey, displayValue !== cssDisplayFalse ? displayValue : cssDisplayTrue);
      return this.setAttr(cssDisplayBackup, '');
    },

    /**
     * Get the value of an attribute for the first element in the collection.
     * @param  {String} attr
     * @return {String}
     * @memberOf DomLibrary.prototype
     */
    getAttr: function(attr) {
      return this.nodes[0] ? this.nodes[0].getAttribute(attr) : _undefined;
    },

    /**
     * Set attribute on each element in the collection.
     * @param  {String} attr
     * @param  {String} value
     * @return {DomLibrary}
     * @memberOf DomLibrary.prototype
     */
    setAttr: function(attr, value) {
      return this.each(function(node) {
        node.setAttribute(attr, value);
      });
    }

  };

  return exports;

});
