interface Props {
  billValue: number;
  numberOfPeopleValue: number;
  resetButton: HTMLElement;
}

export function checkReset({ billValue, numberOfPeopleValue, resetButton }: Props) {
  if (billValue !== 0 && numberOfPeopleValue !== 0) {
    resetButton.classList.remove("disabled");
  }
}
