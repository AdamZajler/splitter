interface Props {
  billValue: number;
  numberOfPeopleValue: number;
  totalAmountElement: HTMLElement;
}

export function calculateTotal({ billValue, numberOfPeopleValue, totalAmountElement }: Props) {
  if (billValue === 0 || numberOfPeopleValue === 0) {
    return;
  }

  const totalAmount = billValue / numberOfPeopleValue;

  totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
}
