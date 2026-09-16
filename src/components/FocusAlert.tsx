interface FocusAlertProps {
  isOpen: boolean;
  onConfirm: () => void; // Добавили описание функции!
}

export function FocusAlert({ isOpen }: FocusAlertProps) {
  return <div>{isOpen && <div>Ты в фокусе</div>}</div>;
}
