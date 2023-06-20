create table actors
(
    id        uuid not null
        primary key,
    full_name varchar(255)
);

create table countries
(
    id   uuid not null
        primary key,
    name varchar(255)
);

create table genres
(
    id   uuid not null
        primary key,
    name varchar(255)
);

create table halls
(
    id     uuid    not null
        primary key,
    number integer not null,
    type   varchar(255)
);

create table media
(
    id      uuid not null
        primary key,
    image   text,
    trailer text
);

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

create table comments
(
    id       uuid             not null
        primary key,
    mark     double precision not null,
    review   text,
    username varchar(255)     not null,
    wrote_at timestamp(6)     not null,
    film_id  uuid             not null
        constraint fkpiw1eyj5u8hwd162g9kgj3vuc
            references films
);

create table films_actors
(
    film_id  uuid not null
        constraint fkm871tpbjgvlefqev7aaq827s0
            references films,
    actor_id uuid not null
        constraint fkdjtf3dy8e0s3x13r8noaif9w
            references actors
);

create table films_countries
(
    film_id    uuid not null
        constraint fk6tkrwhgida3f5394lkxl7gogp
            references films,
    country_id uuid not null
        constraint fkr4qe9orc9gf3qnioq1fj1wgxq
            references countries
);

create table films_genres
(
    film_id  uuid not null
        constraint fkqr8m71obccc9w6cp91l3k8r2w
            references films,
    genre_id uuid not null
        constraint fktcwy3ocjyhnni2yr22y2hpb9p
            references genres
);

create table reactions
(
    id         bigserial
        primary key,
    type       varchar(255),
    username   varchar(255),
    comment_id uuid
        constraint fk49rifnmyo1sd243acaysemlbw
            references comments
);

create table rows
(
    id      uuid    not null
        primary key,
    number  integer not null,
    price   integer not null,
    type    varchar(255),
    hall_id uuid
        constraint fk8dwpdpkba6x7g4qbgg1ic0ik7
            references halls
);

create table seats
(
    id     uuid    not null
        primary key,
    number integer not null,
    row_id uuid
        constraint fkfi3owtwwqbc0mh605hq2ygs1x
            references rows
);

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

create table tickets
(
    id         uuid    not null
        primary key,
    bought_at  timestamp(6),
    price      integer not null,
    row        integer not null,
    seat       integer not null,
    username   varchar(255),
    session_id uuid    not null
        constraint fk6yhwfajgdoqa8kq4gnuimtkpp
            references sessions
);