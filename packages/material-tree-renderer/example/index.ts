import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, Store } from 'redux';
import * as _ from 'lodash';
import {
  Actions,
  jsonformsReducer,
  JsonSchema,
  NOT_APPLICABLE,
  UISchemaElement,
  UISchemaTester
} from '@jsonforms/core';
import { materialFields, materialRenderers } from '@jsonforms/material-renderers';
import { taskSchema } from './schema';
import { Property } from '../src/services/property.util';
import App from './App';
import { taskView, userGroupView, userView } from './uischemata';
import { imageProvider } from './imageProvider';
import { InstanceLabelProvider, SchemaLabelProvider } from '../src/helpers/LabelProvider';

const uischema = {
  'type': 'MasterDetailLayout',
  'scope': '#'
};

const detailSchemata: { tester: UISchemaTester, uischema: UISchemaElement}[]  = [
  {
    tester: schema => _.keys(schema.properties).some(key => key === 'done') ?
      1 : NOT_APPLICABLE,
    uischema: taskView
  },
  {
    tester: schema => _.keys(schema.properties).some(key => key === 'birthday') ?
      1 : NOT_APPLICABLE,
    uischema: userView
  },
  {
    tester: schema => _.keys(schema.properties).some(key => key === 'users') ?
      1 : NOT_APPLICABLE,
    uischema: userGroupView
  }
];

const filterPredicate = (data: any) => (property: Property): boolean => {
  if (_.has(data, '_type') && _.has(property.schema, 'properties._type.default')) {
    return data._type === property.schema.properties._type.default;
  } else {
    return false;
  }
};

const isUserGroup = schema => _.has(schema.properties, 'users');
const isTask = schema => _.has(schema.properties, 'done');
const isUser = schema => _.has(schema.properties, 'birthday');

const schemaLabelProvider: SchemaLabelProvider =
    (schema: JsonSchema, schemaPath: string): string => {

    if (isUserGroup(schema)) {
        return `User Group`;
    }

    if (schemaPath.indexOf('task') !== -1) {
        return `Task`;
    }

    if (isUser(schema)) {
        return `User`;
    }

    return 'Unknown';
};

const instanceLabelProvider: InstanceLabelProvider =
  (schema: JsonSchema, data: any): string => {

    if (isUserGroup(schema)) {
        return `User Group`;
    }

    if (isTask(schema)) {
        return `Task ${data.name || ''}`;
    }

    if (isUser(schema)) {
        return `User ${data.name || ''}`;
    }

    return 'Unknown';
  };

const initState: any = {
  jsonforms: {
    renderers: materialRenderers,
    fields: materialFields
  }
};

const store: Store<any> = createStore(
  combineReducers({
      jsonforms: jsonformsReducer()
    }
  ),
  { ...initState }
);

store.dispatch(Actions.init({}, taskSchema, uischema));
store.dispatch(
    Actions.registerDefaultData(
        'properties.users.items',
        { name: 'Test user' }
    )
);


detailSchemata.forEach(({ tester, uischema: detailedUiSchema }) =>
  store.dispatch(Actions.registerUISchema(tester, detailedUiSchema))
);

ReactDOM.render(
  React.createElement(
    App,
    {
      store,
      filterPredicate,
      labelProviders: {
          forData: instanceLabelProvider,
          forSchema: schemaLabelProvider
      },
      imageProvider: imageProvider
    },
    null
  ),
  document.getElementById('editor'));
