interface Props {
  billValue: number;
  numberOfPeopleValue: number;
  totalAmountElement: HTMLElement;
}

export function calculateTotal({ billValue, numberOfPeopleValue, totalAmountElement }: Props) {
  const totalAmount = billValue / numberOfPeopleValue;

  totalAmountElement.textContent =
    billValue === 0 || numberOfPeopleValue === 0 ? "0.00" : totalAmount.toFixed(2);
}
