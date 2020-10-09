import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type BoundingBox = {
  __typename?: 'BoundingBox';
  xmin: Scalars['Float'];
  ymin: Scalars['Float'];
  xmax: Scalars['Float'];
  ymax: Scalars['Float'];
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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Vertex: ResolverTypeWrapper<Vertex>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Offset: ResolverTypeWrapper<Offset>;
  Dim2D: ResolverTypeWrapper<Dim2D>;
  DeId: ResolverTypeWrapper<DeId>;
  DePlaneId: ResolverTypeWrapper<DePlaneId>;
  DsElecId: ResolverTypeWrapper<DsElecId>;
  DsElecChId: ResolverTypeWrapper<DsElecChId>;
  DetElecChId: ResolverTypeWrapper<DetElecChId>;
  ClusterId: ResolverTypeWrapper<ClusterId>;
  Envelop: ResolverTypeWrapper<Envelop>;
  BoundingBox: ResolverTypeWrapper<BoundingBox>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DataSource: DataSource;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Query: {};
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  Vertex: Vertex;
  Float: Scalars['Float'];
  Offset: Offset;
  Dim2D: Dim2D;
  DeId: DeId;
  DePlaneId: DePlaneId;
  DsElecId: DsElecId;
  DsElecChId: DsElecChId;
  DetElecChId: DetElecChId;
  ClusterId: ClusterId;
  Envelop: Envelop;
  BoundingBox: BoundingBox;
}>;

export type DataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSource'] = ResolversParentTypes['DataSource']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  what?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  boundingBoxDePlane?: Resolver<ResolversTypes['BoundingBox'], ParentType, ContextType, RequireFields<QueryBoundingBoxDePlaneArgs, 'deid' | 'bending'>>;
  datasource?: Resolver<Maybe<ResolversTypes['DataSource']>, ParentType, ContextType, RequireFields<QueryDatasourceArgs, 'id'>>;
  datasources?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSource']>>>, ParentType, ContextType>;
  envelopDePlane?: Resolver<ResolversTypes['Envelop'], ParentType, ContextType, RequireFields<QueryEnvelopDePlaneArgs, 'deid' | 'bending'>>;
  envelopDePlaneDualSampas?: Resolver<Array<Maybe<ResolversTypes['Envelop']>>, ParentType, ContextType, RequireFields<QueryEnvelopDePlaneDualSampasArgs, 'deid' | 'bending'>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type VertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vertex'] = ResolversParentTypes['Vertex']> = ResolversObject<{
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OffsetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offset'] = ResolversParentTypes['Offset']> = ResolversObject<{
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Dim2DResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dim2D'] = ResolversParentTypes['Dim2D']> = ResolversObject<{
  sx?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sy?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeId'] = ResolversParentTypes['DeId']> = ResolversObject<{
  deid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DePlaneIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DePlaneId'] = ResolversParentTypes['DePlaneId']> = ResolversObject<{
  deid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DsElecIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DsElecId'] = ResolversParentTypes['DsElecId']> = ResolversObject<{
  deid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dsid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DsElecChIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DsElecChId'] = ResolversParentTypes['DsElecChId']> = ResolversObject<{
  deid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dsid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dsch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DetElecChIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DetElecChId'] = ResolversParentTypes['DetElecChId']> = ResolversObject<{
  deid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  padid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClusterIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClusterId'] = ResolversParentTypes['ClusterId']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnvelopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Envelop'] = ResolversParentTypes['Envelop']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vertices?: Resolver<Array<ResolversTypes['Vertex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BoundingBoxResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoundingBox'] = ResolversParentTypes['BoundingBox']> = ResolversObject<{
  xmin?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ymin?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  xmax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ymax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DataSource?: DataSourceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Vertex?: VertexResolvers<ContextType>;
  Offset?: OffsetResolvers<ContextType>;
  Dim2D?: Dim2DResolvers<ContextType>;
  DeId?: DeIdResolvers<ContextType>;
  DePlaneId?: DePlaneIdResolvers<ContextType>;
  DsElecId?: DsElecIdResolvers<ContextType>;
  DsElecChId?: DsElecChIdResolvers<ContextType>;
  DetElecChId?: DetElecChIdResolvers<ContextType>;
  ClusterId?: ClusterIdResolvers<ContextType>;
  Envelop?: EnvelopResolvers<ContextType>;
  BoundingBox?: BoundingBoxResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
