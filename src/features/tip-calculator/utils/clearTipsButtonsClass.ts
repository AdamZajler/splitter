export function clearTipsButtonsClass(tipButtons: NodeListOf<HTMLButtonElement>) {
  tipButtons.forEach((b) => b.classList.remove("active"));
}
