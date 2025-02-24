import BaseValidationError from './base';

export default class AdditionalPropValidationError extends BaseValidationError {
  constructor(...args) {
    super(...args);
    this.name = 'AdditionalPropValidationError';
    this.options.isIdentifierLocation = true;
  }

  print() {
    const { message, params } = this.options;
    const colorizer = this.getColorizer();
    const output = [`${colorizer.red(`${colorizer.bold('ADDITIONAL PROPERTY')} ${message}`)}\n`];

    return output.concat(
      this.getCodeFrame(
        `${colorizer.magentaBright(params.additionalProperty)} is not expected to be here!`,
        `${this.instancePath}/${params.additionalProperty}`,
      ),
    );
  }

  getError() {
    const { params } = this.options;

    return {
      ...this.getLocation(`${this.instancePath}/${params.additionalProperty}`),
      error: `${this.getDecoratedPath()} Property ${params.additionalProperty} is not expected to be here`,
      path: this.instancePath,
    };
  }
}
