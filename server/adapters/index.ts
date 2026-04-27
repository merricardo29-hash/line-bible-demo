import { config } from '../config';
import { createDemoAdapter } from './demoAdapter';
import { createKalshiAdapter } from './kalshiAdapter';
import { createTheOddsApiAdapter } from './theOddsApiAdapter';
import type { SportsbookAdapter } from '../domain';

export const adapters: SportsbookAdapter[] = config.oddsApiKey
  ? [createTheOddsApiAdapter(config.oddsApiKey, config.oddsSportKey), createKalshiAdapter(config.kalshiSeriesTickers)]
  : [
      createDemoAdapter('draftkings'),
      createDemoAdapter('fanduel'),
      createDemoAdapter('betmgm'),
      createDemoAdapter('bet365'),
      createKalshiAdapter(config.kalshiSeriesTickers),
    ];
