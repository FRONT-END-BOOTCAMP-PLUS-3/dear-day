export type ModalContent =
  | TextOnlyModalContent
  | TextInputModalContent
  | CalendarModalContent;

type TextOnlyModalContent = {
  type: "textOnly";
  title: string;
};

type TextInputModalContent = {
  type: "text";
  title: string;
};

type CalendarModalContent = {
  type: "calendar";
  title: string;
  placeholder?: string;
};

export type ModalProps = {
  contents: ModalContent[];
  onConfirm: (inputFormData?: InputFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
  confirmText?: string;
  cancelText?: string;
};

export type InputFormData = Record<string, undefined | string>;
