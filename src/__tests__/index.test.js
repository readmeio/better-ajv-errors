import { openapi } from '@readme/openapi-schemas';
import Ajv from 'ajv';
import Ajv2020 from 'ajv/dist/2020';
import { describe, it, expect } from 'vitest';

import betterAjvErrors from '..';
import betterAjvErrorsBabelExport from '../../lib';
import { getSchemaAndData } from '../test-helpers';

describe('Main', () => {
  describe.each(['cli', 'cli-array'])('given a format of `%s`', format => {
    it.each([
      ['should output error with reconstructed codeframe', true],
      ['should output error with reconstructed codeframe [without colors]', false],
    ])('%s', async (_, colorize) => {
      const [schema, data] = await getSchemaAndData('default', __dirname);
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).toBe(false);

      const res = betterAjvErrors(schema, data, validate.errors, {
        colorize,
        format,
        indent: 2,
      });

      expect(res).toMatchSnapshot();
    });
  });

  it('should output error with codeframe', async () => {
    const [schema, data, json] = await getSchemaAndData('default', __dirname);
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(false);

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'cli',
      json,
    });
    expect(res).toMatchSnapshot();
  });

  describe('Babel export', () => {
    it('should function as normal', async () => {
      const [schema, data] = await getSchemaAndData('default', __dirname);
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).toBe(false);

      const res = betterAjvErrorsBabelExport(schema, data, validate.errors);
      expect(res).toMatchSnapshot();
    });
  });

  describe('complex schema examples', () => {
    it('should output an error on an invalid OpenAPI 3.1 definition', async () => {
      const schema = openapi.v31;
      const [, data] = await getSchemaAndData('openapi-3.1', __dirname);

      // Need to load the 2020 dist because it supports draft-7, which we'll need for an 3.1.0
      // OpenAPI definition.
      const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });

      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).toBe(false);

      const res = betterAjvErrors(schema, data, validate.errors, {
        indent: 2,
        format: 'cli',
      });
      expect(res).toMatchSnapshot();
    });

    it('should output an error on an unrecognized OpenAPI version definition', async () => {
      // The v3.1 JSON Schema requires that `openapi` match a specific pattern so lets get a
      // failure out of that by specifying something that doesn't match it.
      const schema = openapi.v31;
      const [, data] = await getSchemaAndData('openapi-3.2', __dirname);

      // Need to load the 2020 dist because it supports draft-7, which we'll need for an 3.1.0
      // OpenAPI definition.
      const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });

      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).toBe(false);

      const res = betterAjvErrors(schema, data, validate.errors, {
        indent: 2,
        format: 'cli',
      });
      expect(res).toMatchSnapshot();
    });
  });
});
