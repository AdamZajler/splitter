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
    if (billValue === 0 || tipValue === 0 || numberOfPeopleValue === 0) {
      return;
    }
    const tipAmount = billValue * tipValue / 100 / numberOfPeopleValue;
    tipAmountElement.textContent = `${tipAmount.toFixed(2)}`;
  }

  // src/features/tip-calculator/utils/calculateTotal.ts
  function calculateTotal({ billValue, numberOfPeopleValue, totalAmountElement }) {
    if (billValue === 0 || numberOfPeopleValue === 0) {
      return;
    }
    const totalAmount = billValue / numberOfPeopleValue;
    totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
  }

  // src/features/tip-calculator/utils/checkReset.ts
  function checkReset({ billValue, numberOfPeopleValue, resetButton }) {
    if (billValue !== 0 && numberOfPeopleValue !== 0) {
      resetButton.classList.remove("disabled");
    }
  }

  // src/features/tip-calculator/TipCalculator.ts
  var TipCalculator = class {
    #billInput;
    #tipButtons;
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
      this.#addInteractivityForNumberOfPeopleInput();
      this.#addInteractivityForResetButton();
    };
    #addInteractivityForBillInput = () => {
      const that = this;
      this.#billInput.addEventListener("input", function() {
        that.#billValue = parseFloat(this.value);
        that.#calculateThings();
      });
    };
    #addInteractivityForTipButtons = () => {
      const that = this;
      this.#tipButtons.forEach((button) => {
        button.addEventListener("click", function() {
          that.#tipValue = parseFloat(this.value);
          that.#calculateThings();
          that.#handleTipButtonClick(this);
        });
      });
    };
    #addInteractivityForNumberOfPeopleInput = () => {
      const that = this;
      this.#numberOfPeopleInput.addEventListener("input", function() {
        that.#numberOfPeopleValue = parseFloat(this.value);
        that.#calculateThings();
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
      clearTipsButtonsClass(this.#tipButtons);
      this.#resetButton.classList.add("disabled");
    };
    #handleTipButtonClick = (element) => {
      if (element.classList.contains("active")) return;
      clearTipsButtonsClass(this.#tipButtons);
      element.classList.add("active");
    };
  };

  // src/main.js
  new TipCalculator();
})();
//# sourceMappingURL=main.js.map
