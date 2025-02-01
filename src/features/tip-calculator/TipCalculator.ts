import { clearTipsButtonsClass } from "./utils/clearTipsButtonsClass";
import { calculateTip } from "./utils/calculateTip";
import { calculateTotal } from "./utils/calculateTotal";
import { checkReset } from "./utils/checkReset";

export class TipCalculator {
  readonly #billInput: HTMLInputElement;
  readonly #tipButtons: NodeListOf<HTMLButtonElement>;
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
    this.#addInteractivityForNumberOfPeopleInput();
    this.#addInteractivityForResetButton();
  };

  #addInteractivityForBillInput = () => {
    const that = this;

    this.#billInput.addEventListener("input", function () {
      that.#billValue = parseFloat(this.value);
      that.#calculateThings();
    });
  };

  #addInteractivityForTipButtons = () => {
    const that = this;

    this.#tipButtons.forEach((button) => {
      button.addEventListener("click", function () {
        that.#tipValue = parseFloat(this.value);
        that.#calculateThings();
        that.#handleTipButtonClick(this);
      });
    });
  };

  #addInteractivityForNumberOfPeopleInput = () => {
    const that = this;

    this.#numberOfPeopleInput.addEventListener("input", function () {
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
    clearTipsButtonsClass(this.#tipButtons);

    this.#resetButton.classList.add("disabled");
  };

  #handleTipButtonClick = (element: HTMLElement) => {
    if (element.classList.contains("active")) return;

    clearTipsButtonsClass(this.#tipButtons);
    element.classList.add("active");
  };
}
