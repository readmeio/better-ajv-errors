import BaseValidationError from './base';

export default class DefaultValidationError extends BaseValidationError {
  constructor(...args) {
    super(...args);
    this.name = 'DefaultValidationError';
    this.options.isSkipEndLocation = true;
  }

  print() {
    const { keyword, message } = this.options;
    const colorizer = this.getColorizer();
    const output = [`${colorizer.red(`${colorizer.bold(keyword.toUpperCase())} ${message}`)}\n`];

    return output.concat(this.getCodeFrame(`👈🏽  ${colorizer.magentaBright(keyword)} ${message}`));
  }

  getError() {
    const { keyword, message } = this.options;

    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()}: ${keyword} ${message}`,
      path: this.instancePath,
    };
  }
}
