"use strict";
(() => {
  // src/features/tip-calculator/utils/clearTipsButtonsClass.ts
  function clearTipsButtonsClass(tipButtons) {
    tipButtons.forEach((b) => b.classList.remove("active"));
  }

  // src/features/tip-calculator/utils/calculateTip.ts
  function calculateTip({
    billValue,
    tipValue,
    numberOfPeopleValue,
    tipAmountElement
  }) {
    const tipAmount = billValue * tipValue / 100 / numberOfPeopleValue;
    tipAmountElement.textContent = billValue === 0 || numberOfPeopleValue === 0 ? "0.00" : tipAmount.toFixed(2);
  }

  // src/features/tip-calculator/utils/calculateTotal.ts
  function calculateTotal({ billValue, numberOfPeopleValue, totalAmountElement }) {
    const totalAmount = billValue / numberOfPeopleValue;
    totalAmountElement.textContent = billValue === 0 || numberOfPeopleValue === 0 ? "0.00" : totalAmount.toFixed(2);
  }

  // src/features/tip-calculator/utils/checkReset.ts
  function checkReset({ billValue, numberOfPeopleValue, resetButton }) {
    if (billValue !== 0 && numberOfPeopleValue !== 0) {
      resetButton.classList.remove("disabled");
    }
  }

  // src/features/tip-calculator/utils/parseValue.ts
  function parseValue(value) {
    return parseFloat(value) || 0;
  }

  // src/features/tip-calculator/utils/clearTipInputClass.ts
  function clearTipInputClass(tipInput) {
    tipInput.classList.remove("active");
  }

  // src/features/tip-calculator/TipCalculator.ts
  var TipCalculator = class {
    #billInput;
    #tipButtons;
    #tipInput;
    #numberOfPeopleInput;
    #tipAmountElement;
    #totalAmountElement;
    #resetButton;
    #billValue = 0;
    #tipValue = 0;
    #numberOfPeopleValue = 0;
    constructor() {
      this.#billInput = document.querySelector("#bill");
      if (!this.#billInput) throw new Error("Bill input not found");
      this.#tipButtons = document.querySelectorAll("#tipValuesContainer .values button");
      if (!this.#tipButtons) throw new Error("Tip buttons not found");
      this.#tipInput = document.querySelector("#tip");
      if (!this.#tipInput) throw new Error("Tip input not found");
      this.#numberOfPeopleInput = document.querySelector("#number-of-people");
      if (!this.#numberOfPeopleInput) throw new Error("Number of people input not found");
      this.#tipAmountElement = document.querySelector("#tip-amount");
      if (!this.#tipAmountElement) throw new Error("Tip amount element not found");
      this.#totalAmountElement = document.querySelector("#total-amount");
      if (!this.#totalAmountElement) throw new Error("Total amount element not found");
      this.#resetButton = document.querySelector("#resetBtn");
      if (!this.#resetButton) throw new Error("Reset button not found");
      this.#initialize();
    }
    #initialize = () => {
      this.#addInteractivityForBillInput();
      this.#addInteractivityForTipButtons();
      this.#addInteractivityForTipInput();
      this.#addInteractivityForNumberOfPeopleInput();
      this.#addInteractivityForResetButton();
    };
    #addInteractivityForBillInput = () => {
      const that = this;
      this.#billInput.addEventListener("input", function() {
        that.#obtainBillValue();
      });
    };
    #addInteractivityForTipInput = () => {
      const that = this;
      this.#tipInput.addEventListener("click", function() {
        that.#handleClearTipsButtonsClass();
        that.#tipInput.classList.add("active");
        that.#obtainTipValueFromInput();
      });
      this.#tipInput.addEventListener("input", function() {
        that.#handleClearTipsButtonsClass();
        that.#obtainTipValueFromInput();
      });
    };
    #addInteractivityForTipButtons = () => {
      const that = this;
      this.#tipButtons.forEach((button) => {
        button.addEventListener("click", function() {
          if (button.classList.contains("active")) {
            that.#handleClearTipsButtonsClass();
            that.#obtainTipValueFromButton();
            return;
          }
          that.#handleClearTipInputClass();
          that.#handleClearTipsButtonsClass();
          that.#obtainTipValueFromButton(this);
          button.classList.add("active");
        });
      });
    };
    #addInteractivityForNumberOfPeopleInput = () => {
      const that = this;
      this.#numberOfPeopleInput.addEventListener("input", function() {
        that.#obtainNumberOfPeopleValue();
      });
    };
    #addInteractivityForResetButton = () => {
      this.#resetButton.addEventListener("click", this.#handleResetClick);
    };
    #calculateThings = () => {
      calculateTip({
        billValue: this.#billValue,
        tipValue: this.#tipValue,
        numberOfPeopleValue: this.#numberOfPeopleValue,
        tipAmountElement: this.#tipAmountElement
      });
      calculateTotal({
        billValue: this.#billValue,
        numberOfPeopleValue: this.#numberOfPeopleValue,
        totalAmountElement: this.#totalAmountElement
      });
      checkReset({
        billValue: this.#billValue,
        numberOfPeopleValue: this.#numberOfPeopleValue,
        resetButton: this.#resetButton
      });
    };
    #handleResetClick = () => {
      this.#billValue = 0;
      this.#tipValue = 0;
      this.#numberOfPeopleValue = 0;
      this.#tipAmountElement.textContent = "0.00";
      this.#billInput.value = "";
      this.#totalAmountElement.textContent = "0.00";
      this.#numberOfPeopleInput.value = "";
      this.#tipInput.value = "";
      this.#handleClearTipsButtonsClass();
      this.#handleClearTipInputClass();
      this.#resetButton.classList.add("disabled");
    };
    #handleClearTipsButtonsClass = () => {
      clearTipsButtonsClass(this.#tipButtons);
    };
    #handleClearTipInputClass = () => {
      clearTipInputClass(this.#tipInput);
    };
    #obtainTipValueFromInput() {
      this.#tipValue = parseValue(this.#tipInput.value);
      this.#calculateThings();
    }
    #obtainTipValueFromButton(button) {
      this.#tipValue = parseValue(button?.value || "0");
      this.#calculateThings();
    }
    #obtainBillValue() {
      this.#billValue = parseValue(this.#billInput.value);
      this.#calculateThings();
    }
    #obtainNumberOfPeopleValue() {
      this.#numberOfPeopleValue = parseValue(this.#numberOfPeopleInput.value);
      this.#calculateThings();
    }
  };

  // src/main.js
  new TipCalculator();
})();
//# sourceMappingURL=main.js.map
