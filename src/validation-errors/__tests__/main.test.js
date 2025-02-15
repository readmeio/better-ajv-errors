import { openapi } from '@readme/openapi-schemas';
import Ajv from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';

import betterAjvErrors from '../..';
import { getSchemaAndData } from '../../test-helpers';

describe('Main', () => {
  it('should support js output format for default errors', async () => {
    const [schema, data] = await getSchemaAndData('default', __dirname);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for required errors', async () => {
    const [schema, data] = await getSchemaAndData('required', __dirname);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for additionalProperties errors', async () => {
    const [schema, data] = await getSchemaAndData('additionalProperties', __dirname);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  // Though this is testing `patternProperties` cases, the error that'll come back will just be for
  // `pattern` since that's what `patternPropeties` utilizes in the schema.
  it('should support js output format for patternProperties errors', async () => {
    const [, data] = await getSchemaAndData('patternProperties', __dirname);

    // The OpenAPI 3.1 schema has a good example of this for component names so we're using that
    // instead of writing our own.
    const schema = openapi.v31;
    const ajv = new Ajv({ allErrors: true, strict: false, validateFormats: false });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for unevaluatedProperties errors', async () => {
    const [schema, data] = await getSchemaAndData('unevaluatedProperties', __dirname);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for enum errors', async () => {
    const [schema, data] = await getSchemaAndData('enum', __dirname);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });
});
