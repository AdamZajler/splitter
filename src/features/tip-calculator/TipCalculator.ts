import { clearTipsButtonsClass } from "./utils/clearTipsButtonsClass";
import { calculateTip } from "./utils/calculateTip";
import { calculateTotal } from "./utils/calculateTotal";
import { checkReset } from "./utils/checkReset";
import { parseValue } from "./utils/parseValue";
import { clearTipInputClass } from "./utils/clearTipInputClass";

export class TipCalculator {
  readonly #billInput: HTMLInputElement;
  readonly #tipButtons: NodeListOf<HTMLButtonElement>;
  readonly #tipInput: HTMLInputElement;
  readonly #numberOfPeopleInput: HTMLInputElement;

  readonly #tipAmountElement: HTMLElement;
  readonly #totalAmountElement: HTMLElement;
  readonly #resetButton: HTMLButtonElement;

  #billValue: number = 0;
  #tipValue: number = 0;
  #numberOfPeopleValue: number = 0;

  constructor() {
    this.#billInput = document.querySelector("#bill") as HTMLInputElement;
    if (!this.#billInput) throw new Error("Bill input not found");

    this.#tipButtons = document.querySelectorAll("#tipValuesContainer .values button");
    if (!this.#tipButtons) throw new Error("Tip buttons not found");

    this.#tipInput = document.querySelector("#tip") as HTMLInputElement;
    if (!this.#tipInput) throw new Error("Tip input not found");

    this.#numberOfPeopleInput = document.querySelector("#number-of-people") as HTMLInputElement;
    if (!this.#numberOfPeopleInput) throw new Error("Number of people input not found");

    this.#tipAmountElement = document.querySelector("#tip-amount") as HTMLElement;
    if (!this.#tipAmountElement) throw new Error("Tip amount element not found");

    this.#totalAmountElement = document.querySelector("#total-amount") as HTMLElement;
    if (!this.#totalAmountElement) throw new Error("Total amount element not found");

    this.#resetButton = document.querySelector("#resetBtn") as HTMLButtonElement;
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

    this.#billInput.addEventListener("input", function () {
      that.#obtainBillValue();
    });
  };

  #addInteractivityForTipInput = () => {
    const that = this;

    this.#tipInput.addEventListener("click", function () {
      // Clear all active classes from tip buttons
      that.#handleClearTipsButtonsClass();

      that.#tipInput.classList.add("active");
      that.#obtainTipValueFromInput();
    });

    this.#tipInput.addEventListener("input", function () {
      // Clear all active classes from tip buttons
      that.#handleClearTipsButtonsClass();

      that.#obtainTipValueFromInput();
    });
  };

  #addInteractivityForTipButtons = () => {
    const that = this;

    this.#tipButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // If the button is already active, clear the tip value and recalculate
        if (button.classList.contains("active")) {
          that.#handleClearTipsButtonsClass();
          that.#obtainTipValueFromButton();
          return;
        }

        // Clear active class from tip input & buttons
        that.#handleClearTipInputClass();
        that.#handleClearTipsButtonsClass();

        that.#obtainTipValueFromButton(this);

        button.classList.add("active");
      });
    });
  };

  #addInteractivityForNumberOfPeopleInput = () => {
    const that = this;

    this.#numberOfPeopleInput.addEventListener("input", function () {
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
      tipAmountElement: this.#tipAmountElement,
    });

    calculateTotal({
      billValue: this.#billValue,
      numberOfPeopleValue: this.#numberOfPeopleValue,
      totalAmountElement: this.#totalAmountElement,
    });

    checkReset({
      billValue: this.#billValue,
      numberOfPeopleValue: this.#numberOfPeopleValue,
      resetButton: this.#resetButton,
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

  #obtainTipValueFromButton(button?: HTMLButtonElement) {
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
}
