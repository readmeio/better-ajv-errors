import BaseValidationError from './base';

export default class UnevaluatedPropValidationError extends BaseValidationError {
  constructor(...args) {
    super(...args);
    this.name = 'UnevaluatedPropValidationError';
    this.options.isIdentifierLocation = true;
  }

  print() {
    const { message, params } = this.options;
    const colorizer = this.getColorizer();
    const output = [`${colorizer.red(`${colorizer.bold('UNEVALUATED PROPERTY')} ${message}`)}\n`];

    return output.concat(
      this.getCodeFrame(
        `${colorizer.magentaBright(params.unevaluatedProperty)} is not expected to be here!`,
        `${this.instancePath}/${params.unevaluatedProperty}`,
      ),
    );
  }

  getError() {
    const { params } = this.options;

    return {
      ...this.getLocation(`${this.instancePath}/${params.unevaluatedProperty}`),
      error: `${this.getDecoratedPath()} Property ${params.unevaluatedProperty} is not expected to be here`,
      path: this.instancePath,
    };
  }
}
