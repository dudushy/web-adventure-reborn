export interface SelectOption {
  id?: number | string;
  label: string;
  value: string;
  icon?: string;
}

export interface SelectionChangeEvent {
  selectedOption: SelectOption;
}
