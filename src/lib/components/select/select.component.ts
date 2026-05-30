import { CommonModule } from '@angular/common';
import { Component, ElementRef, computed, forwardRef, inject, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption, SelectionChangeEvent } from '@web-adventure-reborn';
import { IconComponent } from '@shyland-dev/ui'

@Component({
  selector: 'war-select',
  imports: [CommonModule, IconComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  host: {
    '[class.disabled]': 'isDisabled()',
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
  readonly selectedValue = signal<string | null>(null);
  private readonly internalDisabled = signal(false);

  readonly isDisabled = computed(() => this.disabledInput() || this.internalDisabled());
  readonly selectedOption = computed(() => {
    const currentValue = this.selectedValue();

    if (currentValue === null) {
      return null;
    }

    return this.selectOptions().find((option) => option.value === currentValue) ?? null;
  });
  readonly triggerLabel = computed(() => this.selectedOption()?.label ?? this.placeholder());

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private onTouched: () => void = () => {
    return;
  };
  private onChange: (value: string | null) => void = () => {
    return;
  };

  toggleDropdown(): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.isOpen()) {
      this.closeDropdown();
      return;
    }

    this.openDropdown();
  }

  openDropdown(): void {
    if (this.isDisabled()) {
      return;
    }

    this.isOpen.set(true);

    const options = this.selectOptions();
    if (!options.length) {
      this.focusedOptionIndex.set(-1);
      return;
    }

    const selectedIndex = options.findIndex((option) => option.value === this.selectedValue());
    this.focusedOptionIndex.set(selectedIndex >= 0 ? selectedIndex : 0);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.focusedOptionIndex.set(-1);
  }

  selectOption(option: SelectOption): void {
    if (this.isDisabled()) {
      return;
    }

    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.selectionChange.emit({ selectedOption: option });
    this.closeDropdown();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
        } else {
          this.focusNextOption();
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
        } else {
          this.focusPreviousOption();
        }
        break;
      }

      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
          break;
        }

        const focusedOption = this.selectOptions()[this.focusedOptionIndex()];
        if (focusedOption) {
          this.selectOption(focusedOption);
        }
        break;
      }

      case 'Escape': {
        if (this.isOpen()) {
          event.preventDefault();
          this.closeDropdown();
        }
        break;
      }

      default:
        break;
    }
  }

  onOptionMouseEnter(index: number): void {
    this.focusedOptionIndex.set(index);
  }

  onTriggerBlur(): void {
    this.onTouched();
  }

  onContainerFocusOut(event: FocusEvent): void {
    const nextTarget = event.relatedTarget;
    if (!nextTarget || !this.elementRef.nativeElement.contains(nextTarget as Node)) {
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
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
    if (isDisabled) {
      this.closeDropdown();
    }
  }

  private focusNextOption(): void {
    const options = this.selectOptions();
    if (!options.length) {
      return;
    }

    const nextIndex = this.focusedOptionIndex() + 1;
    this.focusedOptionIndex.set(nextIndex >= options.length ? 0 : nextIndex);
  }

  private focusPreviousOption(): void {
    const options = this.selectOptions();
    if (!options.length) {
      return;
    }

    const previousIndex = this.focusedOptionIndex() - 1;
    this.focusedOptionIndex.set(previousIndex < 0 ? options.length - 1 : previousIndex);
  }
}
