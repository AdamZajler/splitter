interface Props {
  element: Node;
  callback: () => void;
}

export function onClickOutsideOfElement({ element, callback }: Props) {
  document.addEventListener("click", (e) => {
    if (e.target instanceof Node && !element.contains(e.target)) {
      callback();
    }
  });
}
