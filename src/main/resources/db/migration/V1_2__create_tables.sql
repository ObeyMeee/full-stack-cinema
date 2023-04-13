create table public.actors
(
    id        uuid not null
        primary key,
    full_name varchar(255)
);

alter table public.actors
    owner to postgres;

create table public.countries
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table public.countries
    owner to postgres;

create table public.genres
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table public.genres
    owner to postgres;

create table public.halls
(
    id     uuid    not null
        primary key,
    number integer not null,
    type   varchar(255)
);

alter table public.halls
    owner to postgres;

create table public.media
(
    id      uuid not null
        primary key,
    image   text,
    trailer text
);

alter table public.media
    owner to postgres;

create table public.films
(
    id              uuid    not null
        primary key,
    description     varchar(255),
    director        varchar(255),
    duration        integer not null,
    enabled         boolean not null,
    production_year integer,
    title           varchar(255),
    media_id        uuid
        constraint fkrdfc2dr0b455fesu2qf11qovo
            references public.media
);

alter table public.films
    owner to postgres;

create table public.comments
(
    id       uuid             not null
        primary key,
    mark     double precision not null,
    review   text,
    username varchar(255),
    film_id  uuid             not null
        constraint fkpiw1eyj5u8hwd162g9kgj3vuc
            references public.films
);

alter table public.comments
    owner to postgres;

create table public.films_actors
(
    film_id  uuid not null
        constraint fkm871tpbjgvlefqev7aaq827s0
            references public.films,
    actor_id uuid not null
        constraint fkdjtf3dy8e0s3x13r8noaif9w
            references public.actors
);

alter table public.films_actors
    owner to postgres;

create table public.films_countries
(
    film_id    uuid not null
        constraint fk6tkrwhgida3f5394lkxl7gogp
            references public.films,
    country_id uuid not null
        constraint fkr4qe9orc9gf3qnioq1fj1wgxq
            references public.countries
);

alter table public.films_countries
    owner to postgres;

create table public.films_genres
(
    film_id  uuid not null
        constraint fkqr8m71obccc9w6cp91l3k8r2w
            references public.films,
    genre_id uuid not null
        constraint fktcwy3ocjyhnni2yr22y2hpb9p
            references public.genres
);

alter table public.films_genres
    owner to postgres;

create table public.rows
(
    id      uuid    not null
        primary key,
    number  integer not null,
    price   integer not null,
    type    varchar(255),
    hall_id uuid
        constraint fk8dwpdpkba6x7g4qbgg1ic0ik7
            references public.halls
);

alter table public.rows
    owner to postgres;

create table public.seats
(
    id       uuid    not null
        primary key,
    is_taken boolean not null,
    number   integer not null,
    row_id   uuid
        constraint fkfi3owtwwqbc0mh605hq2ygs1x
            references public.rows
);

alter table public.seats
    owner to postgres;

create table public.sessions
(
    id       uuid    not null
        primary key,
    enabled  boolean not null,
    start_at timestamp(6),
    film_id  uuid    not null
        constraint fkn2m0d43s7i2gofapl0d8qkvq7
            references public.films,
    hall_id  uuid    not null
        constraint fkcbrgca6k34wv4jr41ik2qdoaf
            references public.halls
);

alter table public.sessions
    owner to postgres;

create table public.tickets
(
    id        uuid    not null
        primary key,
    bought_at timestamp(6),
    price     integer not null,
    row       integer not null,
    seat      integer not null,
    username  varchar(255),
    film_id   uuid    not null
        constraint fk6t5777nsc5ela5uwyh9ot3a0w
            references public.sessions
);

alter table public.tickets
    owner to postgres;