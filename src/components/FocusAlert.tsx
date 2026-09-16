interface FocusAlertProps {
  isOpen: boolean;
}

export function FocusAlert({ isOpen }: FocusAlertProps) {
  return <div>{isOpen && <div>Ты в фокусе</div>}</div>;
}
