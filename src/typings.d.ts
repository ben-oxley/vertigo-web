/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* SystemJS module definition */
declare var module: NodeModule;
declare module "*.json" {
  const value: any;
  export default value;
}
interface NodeModule {
  id: string;
}

declare var tinymce: any;

declare var echarts: any;
