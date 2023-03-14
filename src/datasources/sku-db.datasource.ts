import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'skuDB',
  connector: 'postgresql',
  url: 'postgres://postgres:josem1598@localhost/skuDB',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'josem1598',
  database: 'skuDB'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SkuDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'skuDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.skuDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
