// このファイルは xcratch/scripts/embed-icons.mjs が作る。手で直さない。
//
// 中身は scratch-gui/src/lib/libraries/extensions/multiserial/ の SVG を
// base64 の data URI にしたもの。SVG を直したら、xcratch/ で
//   node ./scripts/embed-icons.mjs
// を走らせ、この生成物と docs/multiserial.mjs を一緒にコミットすること。

/**
 * ブロックの頭の絵。元は block-icon.svg。
 * @type {string}
 */
export const blockIconURI =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH' +
    'dpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdH' +
    'Jva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm' +
    '9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjQiIHk9IjUiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3Ii' +
    'ByeD0iMS41Ii8+PHJlY3QgeD0iNCIgeT0iMTYuNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIHJ4PSIxLj' +
    'UiLz48cmVjdCB4PSI0IiB5PSIyOCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIHJ4PSIxLjUiLz48cGF0aC' +
    'BkPSJNMTQgOC41IEMxOSA4LjUgMTkgMTcgMjQgMTciLz48cGF0aCBkPSJNMTQgMjAgTDI0IDIwIi8+PH' +
    'BhdGggZD0iTTE0IDMxLjUgQzE5IDMxLjUgMTkgMjMgMjQgMjMiLz48cmVjdCB4PSIyNCIgeT0iMTMiIH' +
    'dpZHRoPSIxMiIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L2c+PC9zdmc+Cg==';

/**
 * カテゴリ一覧の絵。元は menu-icon.svg。
 * @type {string}
 */
export const menuIconURI =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH' +
    'dpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3' +
    'k9IjIwIiByPSIxOSIgZmlsbD0iIzVDNkU4MCIgc3Ryb2tlPSIjNDU1MzYwIiBzdHJva2Utd2lkdGg9Ij' +
    'IiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2IDYpIHNjYWxlKDAuNykiPjxnIGZpbGw9Im5vbmUiIH' +
    'N0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3' +
    'Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjEwIiBoZWlnaHQ9Ij' +
    'ciIHJ4PSIxLjUiLz48cmVjdCB4PSI0IiB5PSIxNi41IiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgcng9Ij' +
    'EuNSIvPjxyZWN0IHg9IjQiIHk9IjI4IiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgcng9IjEuNSIvPjxwYX' +
    'RoIGQ9Ik0xNCA4LjUgQzE5IDguNSAxOSAxNyAyNCAxNyIvPjxwYXRoIGQ9Ik0xNCAyMCBMMjQgMjAiLz' +
    '48cGF0aCBkPSJNMTQgMzEuNSBDMTkgMzEuNSAxOSAyMyAyNCAyMyIvPjxyZWN0IHg9IjI0IiB5PSIxMy' +
    'Igd2lkdGg9IjEyIiBoZWlnaHQ9IjE0IiByeD0iMiIvPjwvZz48L2c+PC9zdmc+Cg==';
