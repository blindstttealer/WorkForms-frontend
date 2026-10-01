import { makeAutoObservable } from 'mobx';
import { formManager } from './multi-form-manager';
export class FormInstanceStore {
  id: string;
  data: Record<string, unknown>;
  step: number;
  name: string;
  templateId?: string;
  constructor(id: string, data = {}, step = 1, name = 'Untitled', templateId?: string) {
    this.id = id;
    this.data = data;
    this.step = step;
    this.name = name;
    this.templateId = templateId;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  private triggerSave() {
    formManager.saveForms();
  }
  setStep(step: number) {
    this.step = step;
    this.triggerSave();
  }
  updateData(part: Record<string, unknown>, step?: number) {
    this.data = { ...this.data, ...part };
    if (step) this.step = step;
    this.triggerSave();
  }
  setValue(section: string, obj: Record<string, unknown>) {
    const prev = this.data[section];
    const prevSection =
      typeof prev === 'object' && prev !== null ? (prev as Record<string, unknown>) : {};
    this.data = {
      ...this.data,
      [section]: {
        ...prevSection,
        ...obj,
      },
    };
    this.triggerSave();
  }
  setName(newName: string) {
    this.name = newName;
    this.triggerSave();
  }
  reset() {
    this.data = {};
    this.step = 1;
    this.triggerSave();
  }
  serialize() {
    return {
      data: this.data,
      step: this.step,
      name: this.name,
      templateId: this.templateId,
    };
  }
}
