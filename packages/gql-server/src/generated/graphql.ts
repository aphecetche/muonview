import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  envelop?: Maybe<Envelop>;
  root?: Maybe<Scalars['String']>;
};


export type QueryDatasourceArgs = {
  id: Scalars['ID'];
};


export type QueryEnvelopArgs = {
  id?: Maybe<InputElementId>;
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
  id: Scalars['ID'];
};

export type PlaneId = {
  __typename?: 'PlaneId';
  deid?: Maybe<DeId>;
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

export type InputElementId = {
  deid?: Maybe<Scalars['Int']>;
  dsid?: Maybe<Scalars['Int']>;
  dsch?: Maybe<Scalars['Int']>;
  padid?: Maybe<Scalars['Int']>;
  bending?: Maybe<Scalars['Boolean']>;
  clusterId?: Maybe<Scalars['ID']>;
};

export type ElementId = DeId | DsElecChId | DetElecChId | ClusterId | DsElecId | PlaneId;

export type Envelop = {
  __typename?: 'Envelop';
  id?: Maybe<ElementId>;
  center?: Maybe<Vertex>;
  size?: Maybe<Dim2D>;
  vertices?: Maybe<Array<Maybe<Vertex>>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  DataSource: ResolverTypeWrapper<DataSource>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DataSourceType: DataSourceType;
  Query: ResolverTypeWrapper<{}>;
  Vertex: ResolverTypeWrapper<Vertex>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Dim2D: ResolverTypeWrapper<Dim2D>;
  DeId: ResolverTypeWrapper<DeId>;
  PlaneId: ResolverTypeWrapper<PlaneId>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DsElecId: ResolverTypeWrapper<DsElecId>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  DsElecChId: ResolverTypeWrapper<DsElecChId>;
  DetElecChId: ResolverTypeWrapper<DetElecChId>;
  ClusterId: ResolverTypeWrapper<ClusterId>;
  InputElementId: InputElementId;
  ElementId: ResolversTypes['DeId'] | ResolversTypes['DsElecChId'] | ResolversTypes['DetElecChId'] | ResolversTypes['ClusterId'] | ResolversTypes['DsElecId'] | ResolversTypes['PlaneId'];
  Envelop: ResolverTypeWrapper<Omit<Envelop, 'id'> & { id?: Maybe<ResolversTypes['ElementId']> }>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DataSource: DataSource;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Query: {};
  Vertex: Vertex;
  Float: Scalars['Float'];
  Dim2D: Dim2D;
  DeId: DeId;
  PlaneId: PlaneId;
  Boolean: Scalars['Boolean'];
  DsElecId: DsElecId;
  Int: Scalars['Int'];
  DsElecChId: DsElecChId;
  DetElecChId: DetElecChId;
  ClusterId: ClusterId;
  InputElementId: InputElementId;
  ElementId: ResolversParentTypes['DeId'] | ResolversParentTypes['DsElecChId'] | ResolversParentTypes['DetElecChId'] | ResolversParentTypes['ClusterId'] | ResolversParentTypes['DsElecId'] | ResolversParentTypes['PlaneId'];
  Envelop: Omit<Envelop, 'id'> & { id?: Maybe<ResolversParentTypes['ElementId']> };
}>;

export type DataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSource'] = ResolversParentTypes['DataSource']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  what?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  datasource?: Resolver<Maybe<ResolversTypes['DataSource']>, ParentType, ContextType, RequireFields<QueryDatasourceArgs, 'id'>>;
  datasources?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSource']>>>, ParentType, ContextType>;
  envelop?: Resolver<Maybe<ResolversTypes['Envelop']>, ParentType, ContextType, RequireFields<QueryEnvelopArgs, never>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type VertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vertex'] = ResolversParentTypes['Vertex']> = ResolversObject<{
  x?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Dim2DResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dim2D'] = ResolversParentTypes['Dim2D']> = ResolversObject<{
  sx?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeId'] = ResolversParentTypes['DeId']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaneIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaneId'] = ResolversParentTypes['PlaneId']> = ResolversObject<{
  deid?: Resolver<Maybe<ResolversTypes['DeId']>, ParentType, ContextType>;
  bending?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DsElecIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DsElecId'] = ResolversParentTypes['DsElecId']> = ResolversObject<{
  deid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dsid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DsElecChIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DsElecChId'] = ResolversParentTypes['DsElecChId']> = ResolversObject<{
  deid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dsid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dsch?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DetElecChIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DetElecChId'] = ResolversParentTypes['DetElecChId']> = ResolversObject<{
  deid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  padid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClusterIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClusterId'] = ResolversParentTypes['ClusterId']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ElementIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['ElementId'] = ResolversParentTypes['ElementId']> = ResolversObject<{
  __resolveType: TypeResolveFn<'DeId' | 'DsElecChId' | 'DetElecChId' | 'ClusterId' | 'DsElecId' | 'PlaneId', ParentType, ContextType>;
}>;

export type EnvelopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Envelop'] = ResolversParentTypes['Envelop']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ElementId']>, ParentType, ContextType>;
  center?: Resolver<Maybe<ResolversTypes['Vertex']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Dim2D']>, ParentType, ContextType>;
  vertices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vertex']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DataSource?: DataSourceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Vertex?: VertexResolvers<ContextType>;
  Dim2D?: Dim2DResolvers<ContextType>;
  DeId?: DeIdResolvers<ContextType>;
  PlaneId?: PlaneIdResolvers<ContextType>;
  DsElecId?: DsElecIdResolvers<ContextType>;
  DsElecChId?: DsElecChIdResolvers<ContextType>;
  DetElecChId?: DetElecChIdResolvers<ContextType>;
  ClusterId?: ClusterIdResolvers<ContextType>;
  ElementId?: ElementIdResolvers<ContextType>;
  Envelop?: EnvelopResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
