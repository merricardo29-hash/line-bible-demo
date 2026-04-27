create table sportsbooks (
  id text primary key,
  label text not null,
  kind text not null,
  difficulty text not null,
  status text not null
);

create table events (
  id text primary key,
  sport text not null,
  league text not null,
  home_team text not null,
  away_team text not null,
  start_time timestamptz not null
);

create table odds_snapshots (
  id text primary key,
  event_id text not null references events(id),
  sportsbook_id text not null references sportsbooks(id),
  market_type text not null,
  side text not null,
  line numeric null,
  price integer not null,
  pulled_at timestamptz not null
);

create index odds_snapshots_lookup_idx
  on odds_snapshots (event_id, market_type, side, sportsbook_id, pulled_at desc);
