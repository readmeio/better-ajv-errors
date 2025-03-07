import BaseValidationError from './base';

export default class RequiredValidationError extends BaseValidationError {
  constructor(...args) {
    super(...args);
    this.name = 'RequiredValidationError';
  }

  getLocation(dataPath = this.instancePath) {
    const { start } = super.getLocation(dataPath);
    return { start };
  }

  print() {
    const { message, params } = this.options;
    const colorizer = this.getColorizer();
    const output = [`${colorizer.red(`${colorizer.bold('REQUIRED')} ${message}`)}\n`];

    return output.concat(this.getCodeFrame(`${colorizer.magentaBright(params.missingProperty)} is missing here!`));
  }

  getError() {
    const { message } = this.options;

    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()} ${message}`,
      path: this.instancePath,
    };
  }
}
