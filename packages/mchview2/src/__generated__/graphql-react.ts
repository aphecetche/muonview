import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A DataSource can be anything that can provide data to mchview */
export type DataSource = {
  __typename?: 'DataSource';
  id: Scalars['ID'];
  format: DataSourceType;
  what: Scalars['String'];
  name: Scalars['String'];
};

export enum DataSourceType {
  Ccdb = 'CCDB',
  Dplsink = 'DPLSINK'
}

export type Query = {
  __typename?: 'Query';
  boundingBoxDePlane: BoundingBox;
  datasource?: Maybe<DataSource>;
  datasources?: Maybe<Array<Maybe<DataSource>>>;
  envelopDePlane: Envelop;
  envelopDePlaneDualSampas: Array<Maybe<Envelop>>;
  root?: Maybe<Scalars['String']>;
};


export type QueryBoundingBoxDePlaneArgs = {
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
};


export type QueryDatasourceArgs = {
  id: Scalars['ID'];
};


export type QueryEnvelopDePlaneArgs = {
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
};


export type QueryEnvelopDePlaneDualSampasArgs = {
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
};

export type Vertex = {
  __typename?: 'Vertex';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Offset = {
  __typename?: 'Offset';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Dim2D = {
  __typename?: 'Dim2D';
  sx: Scalars['Float'];
  sy: Scalars['Float'];
};

export type DeId = {
  __typename?: 'DeId';
  deid: Scalars['Int'];
};

export type DePlaneId = {
  __typename?: 'DePlaneId';
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
};

export type DsElecId = {
  __typename?: 'DsElecId';
  deid: Scalars['Int'];
  dsid: Scalars['Int'];
};

export type DsElecChId = {
  __typename?: 'DsElecChId';
  deid: Scalars['Int'];
  dsid: Scalars['Int'];
  dsch: Scalars['Int'];
};

export type DetElecChId = {
  __typename?: 'DetElecChId';
  deid: Scalars['Int'];
  padid: Scalars['Int'];
};

export type ClusterId = {
  __typename?: 'ClusterId';
  id: Scalars['ID'];
};

export type Envelop = {
  __typename?: 'Envelop';
  id: Scalars['ID'];
  vertices: Array<Vertex>;
};

export type EnvelopWithValue = {
  __typename?: 'EnvelopWithValue';
  envelop: Envelop;
  value?: Maybe<Scalars['Float']>;
};

export type BoundingBox = {
  __typename?: 'BoundingBox';
  xmin: Scalars['Float'];
  ymin: Scalars['Float'];
  xmax: Scalars['Float'];
  ymax: Scalars['Float'];
};

export type GetEnvelopDePlaneQueryVariables = Exact<{
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
}>;


export type GetEnvelopDePlaneQuery = (
  { __typename?: 'Query' }
  & { envelopDePlane: (
    { __typename?: 'Envelop' }
    & Pick<Envelop, 'id'>
    & { vertices: Array<(
      { __typename?: 'Vertex' }
      & Pick<Vertex, 'x' | 'y'>
    )> }
  ) }
);

export type GetBoundingBoxDePlaneQueryVariables = Exact<{
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
}>;


export type GetBoundingBoxDePlaneQuery = (
  { __typename?: 'Query' }
  & { boundingBoxDePlane: (
    { __typename?: 'BoundingBox' }
    & Pick<BoundingBox, 'xmin' | 'ymin' | 'xmax' | 'ymax'>
  ) }
);

export type GetDualSampasEnvelopQueryVariables = Exact<{
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
}>;


export type GetDualSampasEnvelopQuery = (
  { __typename?: 'Query' }
  & { envelopDePlaneDualSampas: Array<Maybe<(
    { __typename?: 'Envelop' }
    & Pick<Envelop, 'id'>
    & { vertices: Array<(
      { __typename?: 'Vertex' }
      & Pick<Vertex, 'x' | 'y'>
    )> }
  )>> }
);


export const GetEnvelopDePlaneDocument = gql`
    query GetEnvelopDePlane($deid: Int!, $bending: Boolean!) {
  envelopDePlane(deid: $deid, bending: $bending) {
    id
    vertices {
      x
      y
    }
  }
}
    `;

/**
 * __useGetEnvelopDePlaneQuery__
 *
 * To run a query within a React component, call `useGetEnvelopDePlaneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnvelopDePlaneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnvelopDePlaneQuery({
 *   variables: {
 *      deid: // value for 'deid'
 *      bending: // value for 'bending'
 *   },
 * });
 */
export function useGetEnvelopDePlaneQuery(baseOptions?: Apollo.QueryHookOptions<GetEnvelopDePlaneQuery, GetEnvelopDePlaneQueryVariables>) {
        return Apollo.useQuery<GetEnvelopDePlaneQuery, GetEnvelopDePlaneQueryVariables>(GetEnvelopDePlaneDocument, baseOptions);
      }
export function useGetEnvelopDePlaneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnvelopDePlaneQuery, GetEnvelopDePlaneQueryVariables>) {
          return Apollo.useLazyQuery<GetEnvelopDePlaneQuery, GetEnvelopDePlaneQueryVariables>(GetEnvelopDePlaneDocument, baseOptions);
        }
export type GetEnvelopDePlaneQueryHookResult = ReturnType<typeof useGetEnvelopDePlaneQuery>;
export type GetEnvelopDePlaneLazyQueryHookResult = ReturnType<typeof useGetEnvelopDePlaneLazyQuery>;
export type GetEnvelopDePlaneQueryResult = Apollo.QueryResult<GetEnvelopDePlaneQuery, GetEnvelopDePlaneQueryVariables>;
export const GetBoundingBoxDePlaneDocument = gql`
    query GetBoundingBoxDePlane($deid: Int!, $bending: Boolean!) {
  boundingBoxDePlane(deid: $deid, bending: $bending) {
    xmin
    ymin
    xmax
    ymax
  }
}
    `;

/**
 * __useGetBoundingBoxDePlaneQuery__
 *
 * To run a query within a React component, call `useGetBoundingBoxDePlaneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoundingBoxDePlaneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoundingBoxDePlaneQuery({
 *   variables: {
 *      deid: // value for 'deid'
 *      bending: // value for 'bending'
 *   },
 * });
 */
export function useGetBoundingBoxDePlaneQuery(baseOptions?: Apollo.QueryHookOptions<GetBoundingBoxDePlaneQuery, GetBoundingBoxDePlaneQueryVariables>) {
        return Apollo.useQuery<GetBoundingBoxDePlaneQuery, GetBoundingBoxDePlaneQueryVariables>(GetBoundingBoxDePlaneDocument, baseOptions);
      }
export function useGetBoundingBoxDePlaneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoundingBoxDePlaneQuery, GetBoundingBoxDePlaneQueryVariables>) {
          return Apollo.useLazyQuery<GetBoundingBoxDePlaneQuery, GetBoundingBoxDePlaneQueryVariables>(GetBoundingBoxDePlaneDocument, baseOptions);
        }
export type GetBoundingBoxDePlaneQueryHookResult = ReturnType<typeof useGetBoundingBoxDePlaneQuery>;
export type GetBoundingBoxDePlaneLazyQueryHookResult = ReturnType<typeof useGetBoundingBoxDePlaneLazyQuery>;
export type GetBoundingBoxDePlaneQueryResult = Apollo.QueryResult<GetBoundingBoxDePlaneQuery, GetBoundingBoxDePlaneQueryVariables>;
export const GetDualSampasEnvelopDocument = gql`
    query GetDualSampasEnvelop($deid: Int!, $bending: Boolean!) {
  envelopDePlaneDualSampas(deid: $deid, bending: $bending) {
    id
    vertices {
      x
      y
    }
  }
}
    `;

/**
 * __useGetDualSampasEnvelopQuery__
 *
 * To run a query within a React component, call `useGetDualSampasEnvelopQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDualSampasEnvelopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDualSampasEnvelopQuery({
 *   variables: {
 *      deid: // value for 'deid'
 *      bending: // value for 'bending'
 *   },
 * });
 */
export function useGetDualSampasEnvelopQuery(baseOptions?: Apollo.QueryHookOptions<GetDualSampasEnvelopQuery, GetDualSampasEnvelopQueryVariables>) {
        return Apollo.useQuery<GetDualSampasEnvelopQuery, GetDualSampasEnvelopQueryVariables>(GetDualSampasEnvelopDocument, baseOptions);
      }
export function useGetDualSampasEnvelopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDualSampasEnvelopQuery, GetDualSampasEnvelopQueryVariables>) {
          return Apollo.useLazyQuery<GetDualSampasEnvelopQuery, GetDualSampasEnvelopQueryVariables>(GetDualSampasEnvelopDocument, baseOptions);
        }
export type GetDualSampasEnvelopQueryHookResult = ReturnType<typeof useGetDualSampasEnvelopQuery>;
export type GetDualSampasEnvelopLazyQueryHookResult = ReturnType<typeof useGetDualSampasEnvelopLazyQuery>;
export type GetDualSampasEnvelopQueryResult = Apollo.QueryResult<GetDualSampasEnvelopQuery, GetDualSampasEnvelopQueryVariables>;