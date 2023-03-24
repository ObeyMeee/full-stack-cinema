create table actors
(
    id        uuid not null
        primary key,
    full_name varchar(255)
);

alter table actors
    owner to postgres;

create table countries
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table countries
    owner to postgres;

create table genres
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table genres
    owner to postgres;

create table halls
(
    id     uuid    not null
        primary key,
    number integer not null,
    type   varchar(255)
);

alter table halls
    owner to postgres;

create table media
(
    id      uuid not null
        primary key,
    image   text,
    trailer text
);

alter table media
    owner to postgres;

create table films
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
            references media
);

alter table films
    owner to postgres;

create table films_actors
(
    film_id  uuid not null
        constraint fkm871tpbjgvlefqev7aaq827s0
            references films,
    actor_id uuid not null
        constraint fkdjtf3dy8e0s3x13r8noaif9w
            references actors
);

alter table films_actors
    owner to postgres;

create table films_countries
(
    film_id    uuid not null
        constraint fk6tkrwhgida3f5394lkxl7gogp
            references films,
    country_id uuid not null
        constraint fkr4qe9orc9gf3qnioq1fj1wgxq
            references countries
);

alter table films_countries
    owner to postgres;

create table films_genres
(
    film_id  uuid not null
        constraint fkqr8m71obccc9w6cp91l3k8r2w
            references films,
    genre_id uuid not null
        constraint fktcwy3ocjyhnni2yr22y2hpb9p
            references genres
);

alter table films_genres
    owner to postgres;

create table roles
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table roles
    owner to postgres;

create table rows
(
    id      uuid    not null
        primary key,
    number  integer not null,
    type    varchar(255),
    hall_id uuid
        constraint fk8dwpdpkba6x7g4qbgg1ic0ik7
            references halls
);

alter table rows
    owner to postgres;

create table seats
(
    id       uuid    not null
        primary key,
    is_taken boolean not null,
    number   integer not null,
    row_id   uuid
        constraint fkfi3owtwwqbc0mh605hq2ygs1x
            references rows
);

alter table seats
    owner to postgres;

create table sessions
(
    id       uuid    not null
        primary key,
    enabled  boolean not null,
    start_at timestamp(6),
    film_id  uuid    not null
        constraint fkn2m0d43s7i2gofapl0d8qkvq7
            references films,
    hall_id  uuid    not null
        constraint fkcbrgca6k34wv4jr41ik2qdoaf
            references halls
);

alter table sessions
    owner to postgres;

create table users
(
    id       uuid not null
        primary key,
    email    varchar(255),
    name     varchar(255),
    password varchar(255)
);

alter table users
    owner to postgres;

create table comments
(
    id      uuid             not null
        primary key,
    mark    double precision not null,
    review  text,
    film_id uuid             not null
        constraint fkpiw1eyj5u8hwd162g9kgj3vuc
            references films,
    user_id uuid             not null
        constraint fk8omq0tc18jd43bu5tjh6jvraq
            references users
);

alter table comments
    owner to postgres;

create table tickets
(
    id        uuid    not null
        primary key,
    bought_at timestamp(6),
    price     integer not null,
    film_id   uuid    not null
        constraint fk6t5777nsc5ela5uwyh9ot3a0w
            references sessions,
    user_id   uuid    not null
        constraint fk4eqsebpimnjen0q46ja6fl2hl
            references users
);

alter table tickets
    owner to postgres;

create table users_roles
(
    user_id uuid not null
        constraint fk2o0jvgh89lemvvo17cbqvdxaa
            references users,
    role_id uuid not null
        constraint fkj6m8fwv7oqv74fcehir1a9ffy
            references roles,
    primary key (user_id, role_id)
);

alter table users_roles
    owner to postgres;

