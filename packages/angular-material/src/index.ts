/*
  The MIT License
  
  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import 'hammerjs';
import { RankedTester } from '@jsonforms/core';
export * from './module';
import { BooleanControlRenderer, booleanControlTester } from './controls/boolean.renderer';
import { TextControlRenderer, TextControlRendererTester } from './controls/text.renderer';
import { TextAreaRenderer, TextAreaRendererTester } from './controls/textarea.renderer';
import { NumberControlRenderer, NumberControlRendererTester } from './controls/number.renderer';
import { RangeControlRenderer, RangeControlRendererTester } from './controls/range.renderer';
import { VerticalLayoutRenderer, verticalLayoutTester } from './layouts/vertical-layout.renderer';
import {
  HorizontalLayoutRenderer,
  horizontalLayoutTester
} from './layouts/horizontal-layout.renderer';

export * from './controls';

export const angularMaterialRenderers:
  { tester: RankedTester, renderer: any }[] = [
  // controls
  { tester: booleanControlTester, renderer: BooleanControlRenderer },
  { tester: TextControlRendererTester, renderer: TextControlRenderer },
  { tester: TextAreaRendererTester, renderer: TextAreaRenderer },
  { tester: NumberControlRendererTester, renderer: NumberControlRenderer },
  { tester: RangeControlRendererTester, renderer: RangeControlRenderer },
  // layouts
  { tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
  { tester: horizontalLayoutTester, renderer: HorizontalLayoutRenderer },
];
