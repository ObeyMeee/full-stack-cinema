create table if not exists actors
(
    id        uuid not null
        primary key,
    full_name varchar(255)
);

alter table actors
    owner to postgres;

create table if not exists countries
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table countries
    owner to postgres;

create table if not exists genres
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table genres
    owner to postgres;

create table if not exists media
(
    id      uuid not null
        primary key,
    poster  text,
    trailer text
);

alter table media
    owner to postgres;

create table if not exists film_details
(
    id              uuid    not null
        primary key,
    description     varchar(255),
    director        varchar(255),
    duration        integer not null,
    production_year integer,
    media_id        uuid
        constraint fk7aj3tgy4ti6tv769yhi5lhldb
            references media
);

alter table film_details
    owner to postgres;

create table if not exists film_details_actors
(
    film_details_id uuid not null
        constraint fkbk4jhx1dpfea91a7mdqaorr08
            references film_details,
    actor_id        uuid not null
        constraint fkkid7g23jxb70iwex4jmnfvr9b
            references actors
);

alter table film_details_actors
    owner to postgres;

create table if not exists film_details_countries
(
    film_details_id uuid not null
        constraint fk7kanjmw7ooaxbvel00kn0a189
            references film_details,
    country_id      uuid not null
        constraint fk782i5eqd7h6h4ruoe3o6u5q7e
            references countries
);

alter table film_details_countries
    owner to postgres;

create table if not exists film_details_genres
(
    film_details_id uuid not null
        constraint fk7jqcf9pj8bf6unt0y45re3hfm
            references film_details,
    genre_id        uuid not null
        constraint fkk46wr48a1dejs71h90mfiu6c5
            references genres
);

alter table film_details_genres
    owner to postgres;

create table if not exists films
(
    id         uuid    not null
        primary key,
    enabled    boolean not null,
    name       varchar(255),
    start_at   timestamp(6),
    details_id uuid
        constraint fkart5dwwh5j8v4g97608rnwgcg
            references film_details
);

alter table films
    owner to postgres;

create table if not exists roles
(
    id   uuid not null
        primary key,
    name varchar(255)
);

alter table roles
    owner to postgres;

create table if not exists users
(
    id       uuid not null
        primary key,
    email    varchar(255),
    name     varchar(255),
    password varchar(255)
);

alter table users
    owner to postgres;

create table if not exists tickets
(
    id        uuid    not null
        primary key,
    bought_at timestamp(6),
    price     integer not null,
    row       integer not null,
    seat      integer not null,
    type      varchar(255),
    film_id   uuid
        constraint fkmi16yi0ieu68mw07r57jnk8tq
            references films,
    user_id   uuid
        constraint fk4eqsebpimnjen0q46ja6fl2hl
            references users
);

alter table tickets
    owner to postgres;

create table if not exists users_roles
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
