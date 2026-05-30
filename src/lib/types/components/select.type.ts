export type SelectOption = {
  id?: number | string;
  label: string;
  value: string;
  icon?: string;
};

export type SelectionChangeEvent = {
  selectedOption: SelectOption;
};
