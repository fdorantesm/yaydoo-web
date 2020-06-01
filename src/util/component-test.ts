import merge from 'lodash.merge';
import { SinonSpy } from 'sinon';
import Vue, { Component } from 'vue';
import { ILogger } from './log';

export interface IComponents {
  [key: string]: Component;
}

export class ComponentTest {

  public vm: Vue;

  constructor (private template: string, private components: IComponents) {
  }

  public createComponent (createOptions?: any): void {
    const options = {
      template: this.template,
      components: this.components
    };
    if (createOptions) merge(options, createOptions);
    this.vm = new Vue(options).$mount();
  }

  public async execute (callback: (vm: Vue) => Promise<void> | void): Promise<void> {
    await Vue.nextTick();
    await callback(this.vm);
  }

  public nextTick(callback) {
    this.vm.$nextTick(callback);
  }

  public findAll(selector) {
    return this.vm.$el.querySelectorAll(selector);
  }

  public find(selector) {
    const element = this.vm.$el.querySelector(selector);
    if (!element) {
      throw new Error(`Element [${selector}] was not found`);
    }
    return element;
  }

  public click(selector) {
    this.find(selector).trigger('click');
  }

  public fillField(selector, value) {
    const element = this.find(selector);

    if (!this.isInput(element) && !this.isTextarea(element)) {
      throw new Error(`Element [${selector}] must be an input or textarea`);
    }

    element.value = '';

    for (const character of value) {
      this.dispatchEvent(element, 'keydown');
      element.value += character;
      this.dispatchEvent(element, 'keypress');
      this.dispatchEvent(element, 'keyup');
    }

    this.dispatchEvent(element, 'change');
    this.dispatchEvent(element, 'input');

  }

  public checkOption(selector) {
    const element = this.find(selector);

    if (!this.isCheckbox(element)) {
      throw new Error(`Element [${selector}] must be a checkbox`);
    }

    element.checked = true;

    element.trigger('change');
  }

  public uncheckOption(selector) {
    const element = this.find(selector);

    if (!this.isCheckbox(element)) {
      throw new Error(`Element [${selector}] must be a checkbox`);
    }

    element.checked = false;

    element.trigger('change');
  }

  public selectOption(selector, value) {
    const element = this.find(selector);

    if (!this.isSelect(element) && !this.isRadio(element)) {
      throw new Error(`Element [${selector}] must be a selector or a radio button`);
    }

    const options = this.isSelect(element) ? element.querySelectorAll('option') : this.findAll(selector);

    const availableOptions = [];
    let selectedOption = null;

    for (let i = 0; i < options.length; i++) {

      if (this.isRadio(element) && !this.isRadio(options.wrappers[i].element)) {
        continue;
      }

      if (options.wrappers[i].element.value === value) {
        selectedOption = options.wrappers[i].element.value;

        if (this.isSelect(element)) {
          options.wrappers[i].element.selected = true;
        } else {
          options.wrappers[i].element.checked = true;
        }

        element.trigger('change');
      }

      availableOptions.push(`'${options.wrappers[i].element.value}'`);
    }

    if (selectedOption == null) {
      throw new Error(`Option '${value}' not found on [${selector}] element. Available options: ${availableOptions.join(', ')}`);
    }
  }

  public isText(element) {
    return this.isInput(element) && element.type.toLowerCase() === 'text';
  }

  public isRadio(element) {
    return this.isInput(element) && element.type.toLowerCase() === 'radio';
  }

  public isCheckbox(element) {
    return this.isInput(element) && element.type.toLowerCase() === 'checkbox';
  }

  public isInput(element) {
    return element && element.tagName === 'INPUT';
  }

  public isSelect(element) {
    return element && element.tagName === 'SELECT';
  }

  public isTextarea(element) {
    return element && element.tagName === 'TEXTAREA';
  }

  public dispatchEvent(element, name) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
    element.dispatchEvent(event);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class MockLogger implements ILogger {

  constructor (private loggerSpy: SinonSpy) {
  }

  info (msg: any) {
    this.loggerSpy(msg);
  }

  warn (msg: any) {
    this.loggerSpy(msg);
  }

  error (msg: any) {
    this.loggerSpy(msg);
  }
}
