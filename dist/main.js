/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Splitter.js":
/*!****************************!*\
  !*** ./src/js/Splitter.js ***!
  \****************************/
/***/ (function() {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Splitter = /*#__PURE__*/function () {
  function Splitter() {
    _classCallCheck(this, Splitter);

    this.isInputEmpty();
    this.clickableTip();
  }

  _createClass(Splitter, [{
    key: "isInputEmpty",
    value: function isInputEmpty() {
      var self = this; // Get Bill & People input

      var inputs = document.querySelectorAll("input[name='bill'], input[name='people']");
      inputs.forEach(function (input) {
        // If user is typing nothing or 0 add class error, 
        // otherwise remove those classes
        input.addEventListener("input", function () {
          if (this.value === "" || this.value === "0") {
            this.closest("label").classList.add("error");
          } else {
            this.closest("label").classList.remove("error");
          }
        });
        input.addEventListener("blur", function () {
          // On leave calculate result
          self.caluclate(); // If user is leaving with nothing or 0 add class error, 
          // otherwise remove those classes

          if (this.value === "" || this.value === "0") {
            this.closest("label").classList.add("error");
          } else {
            this.closest("label").classList.remove("error");
          }
        }); // When user is typing calculate everything

        input.addEventListener("input", function () {
          // When user is typing calculate result
          self.caluclate();
        });
      });
    }
  }, {
    key: "clickableTip",
    value: function clickableTip() {
      var self = this; // Get all tip options

      var tips = document.querySelectorAll(".tips > .tip"); // Check if any tip has "active" class, if there is any, remove it's class

      function checkOthers(tip) {
        for (var i = 0; i < tips.length; i++) {
          if (tips[i].classList.contains("active") & tips[i] != tip) {
            tips[i].classList.remove("active");
          }
        }
      }

      tips.forEach(function (tip) {
        tip.addEventListener("click", function () {
          checkOthers(tip);
          this.classList.toggle("active"); // When user is clicking calculate result

          self.caluclate();
        });

        if (tip.classList.contains("tip-custom")) {
          tip.addEventListener("blur", function () {
            self.caluclate();
          });
        }
      });
    }
  }, {
    key: "checkAllFields",
    value: function checkAllFields() {
      var bill = document.querySelector("input[name='bill']");
      var tip = document.querySelector(".tips > .tip.active");
      var people = document.querySelector("input[name='people']");

      if (bill.value == 0 || people.value == 0 || tip == null) {
        document.querySelector(".summary-amount h2").textContent = "$0.00";
        document.querySelector(".summary-total h2").textContent = "$0.00";
        return false;
      }

      ; // If tip is selected but it's custom 

      if (tip != null && tip.classList.contains("tip-custom")) {
        if (tip.value == 0) {
          document.querySelector(".summary-amount h2").textContent = "$0.00";
          document.querySelector(".summary-total h2").textContent = "$0.00";
          return false;
        }

        ;
      }

      return true;
    }
  }, {
    key: "caluclate",
    value: function caluclate() {
      // If any field is filled wrong
      if (this.checkAllFields() == false) return; // Show RESET button

      document.querySelector(".reset > .btn").classList.add("active"); // Get all fields values

      var textBill = document.querySelector("input[name='bill']").value;
      var textTip = document.querySelector(".tips > .tip.active");
      var textPeople = document.querySelector("input[name='people']").value;
      var tipHolder; // If tip field is custom get it's value

      if (textTip.classList.contains("tip-custom")) {
        tipHolder = textTip.value / 100;
      } else {
        // If tip field is just div, then cut it's "%"
        textTip = textTip.textContent;
        tipHolder = textTip.replace("%", "");
        tipHolder = parseInt(tipHolder) / 100;
      } // Make every string a integer


      var bill = parseFloat(textBill);
      var tip = parseFloat(bill * tipHolder);
      var people = parseInt(textPeople);
      console.log("bill: ", bill, "tip: ", tip, " people: ", people);
      var costs = bill + tip;
      var personTip = tip / people;
      var personTotal = costs / people;
      console.log("costs: ", costs, "personTip: ", personTip, " personTotal: ", personTotal);
      document.querySelector(".summary-amount h2").textContent = "$".concat(personTip.toFixed(2));
      document.querySelector(".summary-total h2").textContent = "$".concat(personTotal.toFixed(2));
    }
  }], [{
    key: "reset",
    value: function reset() {
      if (!document.querySelector(".reset > .btn.active")) return;
      document.querySelector("input[name='bill']").value = null;
      document.querySelector(".tips > .tip.active").classList.remove("active");
      document.querySelector("input[name='people']").value = null;
      document.querySelector(".summary-amount h2").textContent = "$0.00";
      document.querySelector(".summary-total h2").textContent = "$0.00";
      document.querySelector(".reset > .btn").classList.remove("active");
    }
  }]);

  return Splitter;
}();

window.addEventListener('DOMContentLoaded', function () {
  new Splitter();
  document.querySelector(".btn").addEventListener("click", function () {
    Splitter.reset();
  });
});

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _js_Splitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Splitter */ "./src/js/Splitter.js");
/* harmony import */ var _js_Splitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_Splitter__WEBPACK_IMPORTED_MODULE_1__);


}();
/******/ })()
;
//# sourceMappingURL=main.js.map