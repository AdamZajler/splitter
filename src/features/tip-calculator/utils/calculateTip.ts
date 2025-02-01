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
  if (billValue === 0 || tipValue === 0 || numberOfPeopleValue === 0) {
    return;
  }

  const tipAmount = (billValue * tipValue) / 100 / numberOfPeopleValue;

  tipAmountElement.textContent = `${tipAmount.toFixed(2)}`;
}
