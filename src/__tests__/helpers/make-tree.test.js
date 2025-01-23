import { describe, expect, it } from 'vitest';

import { makeTree } from '../../helpers';

describe('makeTree', () => {
  it('works on empty array', () => {
    expect(makeTree([])).toMatchInlineSnapshot(`
      {
        "children": {},
      }
    `);
  });

  it('works on root dataPath', () => {
    expect(makeTree([{ dataPath: '' }])).toMatchInlineSnapshot(`
      {
        "children": {
          "": {
            "children": {},
            "errors": [
              {
                "dataPath": "",
              },
            ],
          },
        },
      }
    `);
  });

  it('works on nested dataPath', () => {
    expect(makeTree([{ dataPath: '/root/child' }])).toMatchInlineSnapshot(`
      {
        "children": {
          "/root": {
            "children": {
              "/child": {
                "children": {},
                "errors": [
                  {
                    "dataPath": "/root/child",
                  },
                ],
              },
            },
            "errors": [],
          },
        },
      }
    `);
  });

  it('works on array dataPath', () => {
    expect(makeTree([{ dataPath: '/root/child/0' }, { dataPath: '/root/child/1' }])).toMatchInlineSnapshot(`
      {
        "children": {
          "/root": {
            "children": {
              "/child/0": {
                "children": {},
                "errors": [
                  {
                    "dataPath": "/root/child/0",
                  },
                ],
              },
              "/child/1": {
                "children": {},
                "errors": [
                  {
                    "dataPath": "/root/child/1",
                  },
                ],
              },
            },
            "errors": [],
          },
        },
      }
    `);
  });

  it('works on array item dataPath', () => {
    expect(makeTree([{ dataPath: '/root/child/0/grand-child' }, { dataPath: '/root/child/1/grand-child' }]))
      .toMatchInlineSnapshot(`
      {
        "children": {
          "/root": {
            "children": {
              "/child/0": {
                "children": {
                  "/grand-child": {
                    "children": {},
                    "errors": [
                      {
                        "dataPath": "/root/child/0/grand-child",
                      },
                    ],
                  },
                },
                "errors": [],
              },
              "/child/1": {
                "children": {
                  "/grand-child": {
                    "children": {},
                    "errors": [
                      {
                        "dataPath": "/root/child/1/grand-child",
                      },
                    ],
                  },
                },
                "errors": [],
              },
            },
            "errors": [],
          },
        },
      }
    `);
  });
});
