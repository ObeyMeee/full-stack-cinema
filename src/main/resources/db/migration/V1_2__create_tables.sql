create table countries
(
    id   uuid         not null
        primary key,
    name varchar(255) not null
        constraint uk_1pyiwrqimi3hnl3vtgsypj5r
            unique
);

create table crew_members
(
    id        bigint not null
        primary key,
    full_name varchar(255)
);

create table crew_roles
(
    crew_member bigint not null
        constraint fk9791bo7i6digq25pkwyg9qkyc
            references crew_members,
    roles       smallint
);

create table genres
(
    id   uuid         not null
        primary key,
    name varchar(255) not null
        constraint uk_pe1a9woik1k97l87cieguyhh4
            unique
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
    poster  varchar(255),
    trailer varchar(255)
);

create table films
(
    id               uuid    not null
        primary key,
    age_restriction  integer
        constraint films_age_restriction_check
            check (age_restriction >= 0),
    description      text,
    duration         integer not null
        constraint films_duration_check
            check (duration >= 0),
    enabled          boolean not null,
    end_release_at   date,
    language         varchar(255),
    production_year  integer
        constraint films_production_year_check
            check (production_year >= 1895),
    start_release_at date,
    title            varchar(255),
    media_id         uuid
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

create table films_countries
(
    film_id    uuid not null
        constraint fk6tkrwhgida3f5394lkxl7gogp
            references films,
    country_id uuid not null
        constraint fkr4qe9orc9gf3qnioq1fj1wgxq
            references countries
);

create table films_crew
(
    film_id        uuid   not null
        constraint fk8fij7e6rr2k6b5tf12ne4fody
            references films,
    crew_member_id bigint not null
        constraint fksdf10uvbpj7s4ojnspj4j4ygm
            references crew_members,
    primary key (film_id, crew_member_id)
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

create table purchase
(
    id       bigserial
        primary key,
    dealt_at timestamp(6),
    username varchar(255)
);

create table reactions
(
    id         bigserial
        primary key,
    type       varchar(255) not null,
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
    id             uuid    not null
        primary key,
    enabled        boolean not null,
    good_row_price integer not null
        constraint sessions_good_row_price_check
            check (good_row_price >= 1),
    lux_row_price  integer not null
        constraint sessions_lux_row_price_check
            check (lux_row_price >= 1),
    start_at       timestamp(6),
    film_id        uuid    not null
        constraint fkn2m0d43s7i2gofapl0d8qkvq7
            references films,
    hall_id        uuid    not null
        constraint fkcbrgca6k34wv4jr41ik2qdoaf
            references halls
);

create table tickets
(
    id          uuid    not null
        primary key,
    price       integer not null,
    row         integer not null,
    seat        integer not null,
    purchase_id bigint
        constraint fkt7ugns80vdxgwtl7xcvlf90re
            references purchase,
    session_id  uuid    not null
        constraint fk6yhwfajgdoqa8kq4gnuimtkpp
            references sessions
);