import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption, SelectionChangeEvent } from '../../../../../lib/components/select/select.component';

@Component({
  selector: 'app-adventure-components-select',
  imports: [TranslateModule, FormsModule, SelectComponent],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select implements OnInit, OnDestroy {
  optionArray: SelectOption[] = [
    { id: 1, label: 'Cachoeira da Lua', value: 'cachoeira-da-lua', icon: 'moon' },
    { id: 2, label: 'Bosque de Jade', value: 'bosque-de-jade', icon: 'leaf' },
    { id: 3, label: 'Ruinas da Neblina', value: 'ruinas-da-neblina', icon: 'fog' },
    { id: 4, label: 'Fortaleza do Sol', value: 'fortaleza-do-sol', icon: 'sun' },
  ];
  selectedOption: string | null = this.optionArray[0]?.value ?? null;
  isDisabled = false;

  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  updateOption(event: SelectionChangeEvent): void {
    this.selectedOption = event.selectedOption.value;
    this.debugService.log(this, 'selected option', event.selectedOption);
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
