-- Deploy cosyworking:1.initDb to pg

BEGIN;

-- *** CREATION DOMAIN ***

    -- *** EMAIL DOMAIN ***

CREATE DOMAIN public.email AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

-- *** CREATION TABLES ***

    --  *** ROLE *** 

CREATE TABLE IF NOT EXISTS public.role
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT role_pkey PRIMARY KEY (id),
    CONSTRAINT role_description_unique UNIQUE (description)
);

    --  *** USER ***

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    last_name text COLLATE pg_catalog."default" NOT NULL,
    first_name text COLLATE pg_catalog."default" NOT NULL,
    email email COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default",
    avatar text COLLATE pg_catalog."default",
    about text COLLATE pg_catalog."default",
    gender text COLLATE pg_catalog."default" NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT username_unique UNIQUE (username),
    CONSTRAINT role_id_fk FOREIGN KEY (role_id)
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

    --  *** EQUIPMENT *** 

CREATE TABLE IF NOT EXISTS public.equipment
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    description text COLLATE pg_catalog."default" NOT NULL,
    icon_link text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT equipment_pkey PRIMARY KEY (id),
    CONSTRAINT equipment_description_unique UNIQUE (description),
    CONSTRAINT equipment_incon_link_unique UNIQUE (icon_link)
);

    --  *** STATE *** 

CREATE TABLE IF NOT EXISTS public.state
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT state_pkey PRIMARY KEY (id),
    CONSTRAINT state_description_unique UNIQUE (description)
);

    --  *** WORKSPACE *** 

CREATE TABLE IF NOT EXISTS public.workspace
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    zip_code text COLLATE pg_catalog."default" NOT NULL,
    city text COLLATE pg_catalog."default" NOT NULL,
    longitude text COLLATE pg_catalog."default" NOT NULL,
    latitude text COLLATE pg_catalog."default" NOT NULL,
    half_day_price integer NOT NULL,
    day_price integer NOT NULL,
    availability boolean NOT NULL DEFAULT true,
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT workspace_pkey PRIMARY KEY (id),
    CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

    --  *** IMAGE ***

CREATE TABLE IF NOT EXISTS public.image
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    link text COLLATE pg_catalog."default" NOT NULL,
    main_image boolean NOT NULL DEFAULT false,
    workspace_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT image_pkey PRIMARY KEY (id),
    CONSTRAINT workspace_id_fk FOREIGN KEY (workspace_id)
        REFERENCES public.workspace (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


    --  *** BOOKING REF *** 
CREATE TABLE IF NOT EXISTS public.booking_ref
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    price integer NOT NULL DEFAULT 0,
    CONSTRAINT booking_ref_pkey PRIMARY KEY (id)
);

    --  *** BOOKING *** 

CREATE TABLE IF NOT EXISTS public.booking
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    workspace_id integer NOT NULL,
    state_id integer NOT NULL,
    booking_ref_id integer NOT NULL,
    price integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT booking_pkey PRIMARY KEY (id),
    CONSTRAINT booking_ref_fk FOREIGN KEY (booking_ref_id)
        REFERENCES public.booking_ref (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT booking_state_id_fk FOREIGN KEY (state_id)
        REFERENCES public.state (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT booking_user_id_fk FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT booking_workspace_id_fk FOREIGN KEY (workspace_id)
        REFERENCES public.workspace (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

    --  *** WORKSPACE_HAS_EQUIPMENT *** 

CREATE TABLE IF NOT EXISTS public.workspace_has_equipment
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    equipment_id integer NOT NULL,
    workspace_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT workspace_has_equipment_pkey PRIMARY KEY (id),
    CONSTRAINT equipment_id_fk FOREIGN KEY (equipment_id)
        REFERENCES public.equipment (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT workspace_id_fk FOREIGN KEY (workspace_id)
        REFERENCES public.workspace (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

COMMIT;
