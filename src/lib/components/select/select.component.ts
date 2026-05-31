import { Component, ElementRef, computed, forwardRef, inject, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '@shyland-dev/ui';
import { SelectOption, SelectionChangeEvent } from '@web-adventure-reborn';

@Component({
  selector: 'war-select',
  imports: [IconComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  host: {
    '[attr.data-open]': 'isOpen()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  readonly selectOptions = input<SelectOption[]>([]);
  readonly selectIcon = input('check');
  readonly dropdownIcon = input('chevron-down');
  readonly placeholder = input('Select an option');
  readonly disabledInput = input(false, { alias: 'disabled' });
  readonly selectionChange = output<SelectionChangeEvent>();

  readonly isOpen = signal(false);
  readonly focusedOptionIndex = signal(-1);

  private readonly selectedValue = signal<string | null>(null);
  private readonly internalDisabled = signal(false);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private onChangeFn: (value: string | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  readonly isDisabled = computed(() => this.disabledInput() || this.internalDisabled());

  readonly selectedOption = computed(() => {
    const value = this.selectedValue();
    if (value === null) return null;
    return this.selectOptions().find((o) => o.value === value) ?? null;
  });

  readonly triggerLabel = computed(() => this.selectedOption()?.label ?? this.placeholder());

  toggleDropdown(): void {
    if (this.isDisabled()) return;
    this.isOpen() ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown(): void {
    if (this.isDisabled()) return;
    this.isOpen.set(true);
    const options = this.selectOptions();
    if (!options.length) {
      this.focusedOptionIndex.set(-1);
      return;
    }
    const selectedIndex = options.findIndex((o) => o.value === this.selectedValue());
    this.focusedOptionIndex.set(selectedIndex >= 0 ? selectedIndex : 0);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.focusedOptionIndex.set(-1);
  }

  selectOption(option: SelectOption): void {
    if (this.isDisabled()) return;
    this.selectedValue.set(option.value);
    this.onChangeFn(option.value);
    this.onTouchedFn();
    this.selectionChange.emit({ selectedOption: option });
    this.closeDropdown();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.isOpen() ? this.moveFocus(1) : this.openDropdown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.isOpen() ? this.moveFocus(-1) : this.openDropdown();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
        } else {
          const option = this.selectOptions()[this.focusedOptionIndex()];
          if (option) this.selectOption(option);
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.closeDropdown();
        }
        break;
    }
  }

  onOptionMouseEnter(index: number): void {
    this.focusedOptionIndex.set(index);
  }

  onTriggerBlur(): void {
    this.onTouchedFn();
  }

  onContainerFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.elementRef.nativeElement.contains(next)) {
      this.closeDropdown();
    }
  }

  trackByOptionId(index: number, option: SelectOption): string | number {
    return option.id ?? `${option.value}-${index}`;
  }

  writeValue(value: string | null): void {
    this.selectedValue.set(value ?? null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
    if (isDisabled) this.closeDropdown();
  }

  private moveFocus(direction: 1 | -1): void {
    const options = this.selectOptions();
    if (!options.length) return;
    const next = this.focusedOptionIndex() + direction;
    if (next < 0) {
      this.focusedOptionIndex.set(options.length - 1);
    } else if (next >= options.length) {
      this.focusedOptionIndex.set(0);
    } else {
      this.focusedOptionIndex.set(next);
    }
  }
}
