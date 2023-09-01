import { readFileSync } from 'fs';
import path from 'path';

export async function getSchemaAndData(name, dirPath) {
  const schemaPath = path.join(dirPath, '..', '__fixtures__', name, 'schema.json');
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const dataPath = path.join(dirPath, '..', '__fixtures__', name, 'data.json');
  const json = readFileSync(dataPath, 'utf8');
  const data = JSON.parse(json);

  return [schema, data, json];
}
