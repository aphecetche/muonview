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
  datasource?: Maybe<DataSource>;
  datasources?: Maybe<Array<Maybe<DataSource>>>;
  envelopDePlane?: Maybe<Envelop>;
  root?: Maybe<Scalars['String']>;
};


export type QueryDatasourceArgs = {
  id: Scalars['ID'];
};


export type QueryEnvelopDePlaneArgs = {
  deid: Scalars['Int'];
  bending: Scalars['Boolean'];
};

export type Vertex = {
  __typename?: 'Vertex';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type Dim2D = {
  __typename?: 'Dim2D';
  sx?: Maybe<Scalars['Float']>;
  sy?: Maybe<Scalars['Float']>;
};

export type DeId = {
  __typename?: 'DeId';
  deid?: Maybe<Scalars['Int']>;
};

export type PlaneId = {
  __typename?: 'PlaneId';
  deid?: Maybe<Scalars['Int']>;
  bending?: Maybe<Scalars['Boolean']>;
};

export type DsElecId = {
  __typename?: 'DsElecId';
  deid?: Maybe<Scalars['Int']>;
  dsid?: Maybe<Scalars['Int']>;
};

export type DsElecChId = {
  __typename?: 'DsElecChId';
  deid?: Maybe<Scalars['Int']>;
  dsid?: Maybe<Scalars['Int']>;
  dsch?: Maybe<Scalars['Int']>;
};

export type DetElecChId = {
  __typename?: 'DetElecChId';
  deid?: Maybe<Scalars['Int']>;
  padid?: Maybe<Scalars['Int']>;
};

export type ClusterId = {
  __typename?: 'ClusterId';
  id?: Maybe<Scalars['ID']>;
};

export type Envelop = {
  __typename?: 'Envelop';
  id: Scalars['ID'];
  center?: Maybe<Vertex>;
  size?: Maybe<Dim2D>;
  vertices?: Maybe<Array<Maybe<Vertex>>>;
};


export const GetEnvelopDePlaneDocument = gql`
    query GetEnvelopDePlane($deid: Int!) {
  envelopDePlane(deid: $deid, bending: true) {
    id
    size {
      sx
      sy
    }
    vertices {
      x
      y
    }
    center {
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