/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DataSourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DataSources
// ====================================================

export interface DataSources_datasources {
  __typename: "DataSource";
  id: string;
  kind: DataSourceType;
  name: string;
}

export interface DataSources {
  datasources: (DataSources_datasources | null)[] | null;
}
