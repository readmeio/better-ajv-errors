import { parse } from '@humanwhocodes/momoa';
import { describe, it, expect } from 'vitest';

import { getSchemaAndData } from '../../test-helpers';
import RequiredValidationError from '../required';

describe('Required', () => {
  it.each([
    ['prints correctly for missing required prop', true],
    ['prints correctly for missing required prop[without colors]', false],
  ])('%s', async (_, colorize) => {
    const [schema, data] = await getSchemaAndData('required', __dirname);
    const jsonRaw = JSON.stringify(data, null, 2);
    const jsonAst = parse(jsonRaw);

    const error = new RequiredValidationError(
      {
        keyword: 'required',
        dataPath: '/nested',
        schemaPath: '#/required',
        params: { missingProperty: 'id' },
        message: "should have required property 'id'",
      },
      { colorize, data, schema, jsonRaw, jsonAst },
    );

    expect(error.print()).toMatchSnapshot();
  });
});
