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

create table public.media
(
    id      uuid not null
        primary key,
    image  text,
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
    name            varchar(255),
    production_year integer,
    media_id        uuid
        constraint fkrdfc2dr0b455fesu2qf11qovo
            references public.media
);

alter table public.films
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

create table public.roles
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table public.roles
    owner to postgres;

create table public.sessions
(
    id       uuid    not null
        primary key,
    enabled  boolean not null,
    start_at timestamp(6),
    film_id  uuid    not null
        constraint fkn2m0d43s7i2gofapl0d8qkvq7
            references public.films
);

alter table public.sessions
    owner to postgres;

create table public.users
(
    id       uuid not null
        primary key,
    email    varchar(255),
    name     varchar(255),
    password varchar(255)
);

alter table public.users
    owner to postgres;

create table public.tickets
(
    id        uuid    not null
        primary key,
    bought_at timestamp(6),
    price     integer not null,
    row       integer not null,
    seat      integer not null,
    type      varchar(255),
    film_id   uuid    not null
        constraint fk6t5777nsc5ela5uwyh9ot3a0w
            references public.sessions,
    user_id   uuid    not null
        constraint fk4eqsebpimnjen0q46ja6fl2hl
            references public.users
);

alter table public.tickets
    owner to postgres;

create table public.users_roles
(
    user_id uuid not null
        constraint fk2o0jvgh89lemvvo17cbqvdxaa
            references public.users,
    role_id uuid not null
        constraint fkj6m8fwv7oqv74fcehir1a9ffy
            references public.roles,
    primary key (user_id, role_id)
);

alter table public.users_roles
    owner to postgres;

