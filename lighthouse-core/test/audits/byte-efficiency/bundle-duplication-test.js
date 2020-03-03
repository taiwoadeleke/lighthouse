/**
 * @license Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/* eslint-env jest */

const fs = require('fs');
const BundleDuplicationAudit = require('../../../audits/byte-efficiency/bundle-duplication.js');

function load(name) {
  const mapJson = fs.readFileSync(
    `${__dirname}/../../fixtures/source-maps/${name}.js.map`,
    'utf-8'
  );
  const content = fs.readFileSync(`${__dirname}/../../fixtures/source-maps/${name}.js`, 'utf-8');
  return {map: JSON.parse(mapJson), content};
}

describe('BundleDuplicationAudit computed artifact', () => {
  it('works (simple)', async () => {
    const context = {computedCache: new Map(), options: {ignoreThresholdInBytes: 500}};
    const {map, content} = load('foo.min');
    const artifacts = {
      SourceMaps: [
        {scriptUrl: 'https://example.com/foo1.min.js', map},
        {scriptUrl: 'https://example.com/foo2.min.js', map},
      ],
      ScriptElements: [
        {src: 'https://example.com/foo1.min.js', content},
        {src: 'https://example.com/foo2.min.js', content},
      ],
    };
    const results = await BundleDuplicationAudit.audit_(artifacts, [], context);
    expect({items: results.items, wastedBytesByUrl: results.wastedBytesByUrl})
      .toMatchInlineSnapshot(`
      Object {
        "items": Array [
          Object {
            "source": "Other",
            "sourceBytes": Array [],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/foo1.min.js",
              "https://example.com/foo2.min.js",
            ],
            "wastedBytes": 682,
          },
        ],
        "wastedBytesByUrl": Map {
          "https://example.com/foo2.min.js" => 682,
        },
      }
    `);
  });

  it('works (complex)', async () => {
    const context = {computedCache: new Map()};
    const bundleData1 = load('coursehero-bundle-1');
    const bundleData2 = load('coursehero-bundle-2');
    const artifacts = {
      SourceMaps: [
        {scriptUrl: 'https://example.com/coursehero-bundle-1.js', map: bundleData1.map},
        {scriptUrl: 'https://example.com/coursehero-bundle-2.js', map: bundleData2.map},
      ],
      ScriptElements: [
        {src: 'https://example.com/coursehero-bundle-1.js', content: bundleData1.content},
        {src: 'https://example.com/coursehero-bundle-2.js', content: bundleData2.content},
      ],
    };
    const results = await BundleDuplicationAudit.audit_(artifacts, [], context);
    expect({items: results.items, wastedBytesByUrl: results.wastedBytesByUrl})
      .toMatchInlineSnapshot(`
      Object {
        "items": Array [
          Object {
            "source": "Control/assets/js/vendor/ng/select/select.js",
            "sourceBytes": Array [
              48513,
              48513,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 48513,
          },
          Object {
            "source": "Control/assets/js/vendor/ng/select/angular-sanitize.js",
            "sourceBytes": Array [
              9135,
              9135,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 9135,
          },
          Object {
            "source": "js/src/utils/service/amplitude-service.ts",
            "sourceBytes": Array [
              1348,
              1325,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 1325,
          },
          Object {
            "source": "js/src/search/results/store/filter-store.ts",
            "sourceBytes": Array [
              12717,
              12650,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 12650,
          },
          Object {
            "source": "js/src/search/results/view/filter/autocomplete-list.tsx",
            "sourceBytes": Array [
              1143,
              1134,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-2.js",
              "https://example.com/coursehero-bundle-1.js",
            ],
            "wastedBytes": 1134,
          },
          Object {
            "source": "js/src/search/results/view/filter/autocomplete-filter.tsx",
            "sourceBytes": Array [
              3823,
              3812,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 3812,
          },
          Object {
            "source": "js/src/search/results/view/filter/autocomplete-filter-with-icon.tsx",
            "sourceBytes": Array [
              2696,
              2693,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 2693,
          },
          Object {
            "source": "js/src/common/component/school-search.tsx",
            "sourceBytes": Array [
              5840,
              5316,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-2.js",
              "https://example.com/coursehero-bundle-1.js",
            ],
            "wastedBytes": 5316,
          },
          Object {
            "source": "js/src/common/component/search/abstract-taxonomy-search.tsx",
            "sourceBytes": Array [
              3103,
              3098,
            ],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 3098,
          },
          Object {
            "source": "Other",
            "sourceBytes": Array [],
            "totalBytes": 0,
            "url": "",
            "urls": Array [
              "https://example.com/coursehero-bundle-1.js",
              "https://example.com/coursehero-bundle-2.js",
            ],
            "wastedBytes": 10519,
          },
        ],
        "wastedBytesByUrl": Map {
          "https://example.com/coursehero-bundle-2.js" => 88204,
          "https://example.com/coursehero-bundle-1.js" => 9991,
        },
      }
    `);
  });
});
