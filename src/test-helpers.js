import fs from 'node:fs/promises';
import path from 'node:path';

export function getFixturePath(dir, name, file) {
  return path.join(...[dir, '..', '__fixtures__', name, file].filter(Boolean));
}

export async function getSchemaAndData(name, dirPath) {
  const schemaPath = getFixturePath(dirPath, name, 'schema.json');
  const schema = await fs.readFile(schemaPath, 'utf8').then(JSON.parse);
  const dataPath = getFixturePath(dirPath, name, 'data.json');
  const json = await fs.readFile(dataPath, 'utf8');
  const data = JSON.parse(json);

  return [schema, data, json];
}
