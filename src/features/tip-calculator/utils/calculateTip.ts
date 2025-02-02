interface Props {
  billValue: number;
  tipValue: number;
  numberOfPeopleValue: number;
  tipAmountElement: HTMLElement;
}

export function calculateTip({
  billValue,
  tipValue,
  numberOfPeopleValue,
  tipAmountElement,
}: Props) {
  const tipAmount = (billValue * tipValue) / 100 / numberOfPeopleValue;

  tipAmountElement.textContent =
    billValue === 0 || numberOfPeopleValue === 0 ? "0.00" : tipAmount.toFixed(2);
}
