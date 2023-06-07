--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.2

-- Started on 2023-06-07 08:36:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "SPARKLE";
--
-- TOC entry 3334 (class 1262 OID 16389)
-- Name: SPARKLE; Type: DATABASE; Schema: -; Owner: vladimirgresql
--

CREATE DATABASE "SPARKLE" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "SPARKLE" OWNER TO vladimirgresql;

\connect "SPARKLE"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 841 (class 1247 OID 16484)
-- Name: age_restriction; Type: TYPE; Schema: public; Owner: vladimirgresql
--

CREATE TYPE public.age_restriction AS ENUM (
    '3',
    '7',
    '12',
    '16',
    '18'
);


ALTER TYPE public.age_restriction OWNER TO vladimirgresql;

--
-- TOC entry 838 (class 1247 OID 16450)
-- Name: categ_produs; Type: TYPE; Schema: public; Owner: vladimirgresql
--

CREATE TYPE public.categ_produs AS ENUM (
    'DLC',
    'GAME',
    'ADDON'
);


ALTER TYPE public.categ_produs OWNER TO vladimirgresql;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16496)
-- Name: products; Type: TABLE; Schema: public; Owner: vladimirgresql
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(255),
    price numeric,
    publisher character varying(255),
    image character varying(255),
    genres character varying[],
    category public.categ_produs,
    description character varying(255),
    age_restriction public.age_restriction,
    add_date timestamp without time zone,
    physical_copies boolean
);


ALTER TABLE public.products OWNER TO vladimirgresql;

--
-- TOC entry 214 (class 1259 OID 16495)
-- Name: products_products_id_seq; Type: SEQUENCE; Schema: public; Owner: vladimirgresql
--

CREATE SEQUENCE public.products_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_products_id_seq OWNER TO vladimirgresql;

--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 214
-- Name: products_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vladimirgresql
--

ALTER SEQUENCE public.products_products_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 3182 (class 2604 OID 16499)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: vladimirgresql
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_products_id_seq'::regclass);


--
-- TOC entry 3328 (class 0 OID 16496)
-- Dependencies: 215
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: vladimirgresql
--

INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (34, 'Valorant', 0.00, 'Riot Games', 'image33.png', '{Shooter}', 'GAME', 'Free-to-play first-person shooter', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (35, 'Halo: The Master Chief Collection', 39.99, '343 Industries', 'image34.png', '{Shooter}', 'GAME', 'Collection of remastered Halo games', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (36, 'Genshin Impact', 0.00, 'miHoYo', 'image35.png', '{Action,RPG}', 'GAME', 'Open-world action role-playing game', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (37, 'Animal Crossing: New Horizons', 59.99, 'Nintendo', 'image36.png', '{Simulation}', 'GAME', 'Life simulation game', '3', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (38, 'Assassin''s Creed Odyssey', 59.99, 'Ubisoft', 'image37.png', '{Action,Adventure}', 'GAME', 'Ancient Greece-themed action-adventure game', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (39, 'Rainbow Six Siege', 19.99, 'Ubisoft', 'image38.png', '{Shooter}', 'GAME', 'Tactical first-person shooter', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (40, 'Ghost of Tsushima', 59.99, 'Sucker Punch Productions', 'image39.png', '{Action,Adventure}', 'GAME', 'Action-adventure game set in feudal Japan', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (41, 'Mortal Kombat 11', 59.99, 'NetherRealm Studios', 'image40.png', '{Fighting}', 'GAME', 'Latest installment in the Mortal Kombat series', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (42, 'Mario Kart 8 Deluxe', 59.99, 'Nintendo', 'image41.png', '{Racing}', 'GAME', 'Popular kart racing game', '3', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (43, 'God of War: Ragnarok', 59.99, 'Santa Monica Studio', 'image42.png', '{Action,Adventure}', 'GAME', 'Sequel to the critically acclaimed God of War', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (44, 'Far Cry 6', 59.99, 'Ubisoft', 'image43.png', '{Action,Adventure}', 'GAME', 'Latest installment in the Far Cry series', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (45, 'Mass Effect Legendary Edition', 59.99, 'BioWare', 'image44.png', '{RPG,Action}', 'GAME', 'Remastered collection of the Mass Effect Trilogy', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (33, 'League of Legends', 0.00, 'Riot Games', 'image45.png', '{Strategy,RPG}', 'GAME', 'Popular online multiplayer game', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (46, 'Warframe', 0.00, 'Digital Extremes', 'image46.png', '{Shooter,Action}', 'GAME', 'Free-to-play cooperative online game', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (47, 'The Sims 4', 39.99, 'Maxis', 'image47.png', '{Simulation}', 'GAME', 'Latest installment in the Sims series', '12', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (48, 'Metal Gear Solid V: The Phantom Pain', 19.99, 'Kojima Productions', 'image48.png', '{Action,Stealth}', 'GAME', 'Tactical stealth-action game from Hideo Kojima', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (49, 'Dark Souls III', 59.99, 'FromSoftware', 'image49.png', '{Action,RPG}', 'GAME', 'Third installment in the Dark Souls series', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (50, 'Persona 5 Royal', 59.99, 'Atlus', 'image50.png', '{RPG}', 'GAME', 'Extended edition of Persona 5', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (10, 'The Legend of Zelda: Breath of the Wild', 59.99, 'Nintendo', 'image10.png', '{Adventure,Action}', 'GAME', 'Open world adventure game in Zelda series', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (1, 'The Elder Scrolls V: Skyrim', 49.99, 'Bethesda', 'image1.png', '{RPG,Adventure}', 'GAME', 'Open-world RPG with dragons', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (2, 'Cyberpunk 2077', 59.99, 'CD Projekt', 'image2.png', '{RPG}', 'GAME', 'Futuristic Cybernetic RPG', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (3, 'Red Dead Redemption 2', 59.99, 'Rockstar Games', 'image3.png', '{Action,Adventure}', 'GAME', 'Western-themed action-adventure game', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (4, 'The Witcher 3: Wild Hunt - Blood and Wine', 19.99, 'CD Projekt', 'image4.png', '{RPG}', 'DLC', 'DLC for the Witcher 3 Game', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (5, 'Fallout 4', 39.99, 'Bethesda', 'image5.png', '{RPG,Action}', 'GAME', 'Post-apocalyptic RPG', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (6, 'Horizon Zero Dawn', 49.99, 'Guerrilla Games', 'image6.png', '{Action,RPG}', 'GAME', 'Action RPG set in a post-apocalyptic world', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (7, 'Final Fantasy VII Remake', 59.99, 'Square Enix', 'image7.png', '{RPG}', 'GAME', 'Remake of the classic Final Fantasy VII game', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (8, 'Super Mario Odyssey', 59.99, 'Nintendo', 'image8.png', '{Platform,Adventure}', 'GAME', '3D platform game with Mario', '7', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (9, 'God of War', 59.99, 'Santa Monica Studio', 'image9.png', '{Action,Adventure}', 'GAME', 'Action adventure game featuring Kratos', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (11, 'Minecraft', 29.99, 'Mojang', 'image11.png', '{Sandbox,Survival}', 'GAME', 'Popular sandbox survival game', '7', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (12, 'FIFA 2023', 59.99, 'EA Sports', 'image12.png', '{Sports}', 'GAME', 'Latest version of FIFA football game', '3', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (13, 'GTA V: Criminal Enterprise Starter Pack', 9.99, 'Rockstar Games', 'image13.png', '{Action,Adventure}', 'ADDON', 'Add-on pack for GTA V', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (14, 'Assassin''s Creed Valhalla', 59.99, 'Ubisoft', 'image14.png', '{Action,Adventure}', 'GAME', 'Viking-themed action-adventure game', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (15, 'Uncharted 4: A Thief''s End', 39.99, 'Naughty Dog', 'image15.png', '{Action,Adventure}', 'GAME', 'Action adventure game from Uncharted series', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (16, 'Star Wars Jedi: Fallen Order', 59.99, 'Respawn Entertainment', 'image16.png', '{Action,Adventure}', 'GAME', 'Star Wars themed action-adventure game', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (17, 'Battlefield 2042', 59.99, 'EA DICE', 'image17.png', '{Shooter}', 'GAME', 'First-person shooter game set in future', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (18, 'The Last of Us Part II', 59.99, 'Naughty Dog', 'image18.png', '{Action,Adventure}', 'GAME', 'Sequel to the critically acclaimed Last of Us', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (19, 'Sekiro: Shadows Die Twice', 59.99, 'FromSoftware', 'image19.png', '{Action,Adventure}', 'GAME', 'Sengoku era set challenging action-adventure game', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (20, 'Spider-Man: Miles Morales', 49.99, 'Insomniac Games', 'image20.png', '{Action,Adventure}', 'GAME', 'Action adventure game featuring Spider-Man', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (21, 'Control', 59.99, 'Remedy Entertainment', 'image21.png', '{Action,Adventure}', 'GAME', 'Supernatural third-person action-adventure game', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (22, 'DOOM Eternal', 59.99, 'id Software', 'image22.png', '{Shooter}', 'GAME', 'First-person shooter sequel to DOOM', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (23, 'Resident Evil 3', 59.99, 'Capcom', 'image23.png', '{Horror,Action}', 'GAME', 'Remake of Resident Evil 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (24, 'Fortnite: Battle Royale', 0.00, 'Epic Games', 'image24.png', '{Shooter,Survival}', 'GAME', 'Popular battle royale game', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (25, 'Overwatch', 39.99, 'Blizzard Entertainment', 'image25.png', '{Shooter}', 'GAME', 'Team-based multiplayer first-person shooter', '12', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (26, 'Among Us', 4.99, 'InnerSloth', 'image26.png', '{Party,Strategy}', 'GAME', 'Multiplayer party game', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (27, 'Cyberpunk 2077: Night City Expansion', 19.99, 'CD Projekt', 'image27.png', '{RPG}', 'DLC', 'Expansion pack for Cyberpunk 2077', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (28, 'Forza Horizon 4', 59.99, 'Playground Games', 'image28.png', '{Racing}', 'GAME', 'Open world racing game', '3', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (29, 'The Witcher 3: Wild Hunt - Hearts of Stone', 9.99, 'CD Projekt', 'image29.png', '{RPG}', 'DLC', 'Expansion for The Witcher 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (30, 'Call of Duty: Warzone', 0.00, 'Infinity Ward', 'image30.png', '{Shooter}', 'GAME', 'Free-to-play battle royale game', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (31, 'Bioshock Infinite', 29.99, 'Irrational Games', 'image31.png', '{Shooter,RPG}', 'GAME', 'First-person shooter with strong narrative', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (32, 'Monster Hunter World', 29.99, 'Capcom', 'image32.png', '{Action,RPG}', 'GAME', 'Action role-playing game', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (51, 'Galactic Conquerors', 49.99, 'Stellar Studios', NULL, '{Strategy,RPG}', 'GAME', 'Interstellar strategy game', '12', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (52, 'Apocalypse Survivors', 39.99, 'SurvivalSoft', NULL, '{Survival,Action}', 'GAME', 'Post-apocalyptic survival game', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (53, 'Crystal Mage Chronicles', 59.99, 'Arcane Arts', NULL, '{RPG}', 'GAME', 'Fantasy role-playing game with magic', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (54, 'Street King: Tokyo Drift', 59.99, 'SpeedDemon Studios', NULL, '{Racing}', 'GAME', 'Urban racing game set in Tokyo', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (55, 'Cybernetica', 69.99, 'OmegaCorp', NULL, '{Action,Adventure}', 'GAME', 'Cyberpunk-themed action-adventure game', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (56, 'Quantum Odyssey', 49.99, 'TimeTravel Games', NULL, '{Adventure,Puzzle}', 'GAME', 'Time-travelling adventure game', '12', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (57, 'Monster Tamer World', 59.99, 'CreatureCatch Studios', NULL, '{RPG,Adventure}', 'GAME', 'Game about catching and training monsters', '7', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (58, 'Mystic Seas: Pirate Legends', 29.99, 'Mariner Games', NULL, '{Action,Strategy}', 'GAME', 'Sea-faring pirate game', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (59, 'Stealth Shadow', 39.99, 'NinjaSoft', NULL, '{Stealth,Action}', 'GAME', 'Stealth action game with a ninja protagonist', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (60, 'Mecha Titans', 59.99, 'RoboRumble Entertainment', NULL, '{Action,RPG}', 'GAME', 'Action RPG with giant robots', '12', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (61, 'Hacker 2077: Code Revolution', 49.99, 'CyberPunk Productions', NULL, '{Strategy,Puzzle}', 'GAME', 'Hacking simulation game', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (62, 'Chef Royale', 19.99, 'Gourmet Games', NULL, '{Simulation,Strategy}', 'GAME', 'Cooking competition simulation game', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (63, 'Warlords: Battlecry', 39.99, 'ConquestCo', NULL, '{Strategy,Action}', 'GAME', 'Medieval-themed strategy game', '12', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (64, 'Shadow of the Elves', 59.99, 'FantasyForge', NULL, '{Adventure,RPG}', 'GAME', 'Elven-themed adventure RPG', '16', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (65, 'Modern Soldiers 5', 59.99, 'TacticalSoft', NULL, '{Shooter,Action}', 'GAME', 'Modern warfare first-person shooter', '18', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (66, 'Skylanders: Cloud Kingdom', 39.99, 'CloudNine Games', NULL, '{Action,Adventure}', 'GAME', 'Sky exploration action-adventure game', '7', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (67, 'Undead Unleashed', 29.99, 'HorrorCraft', NULL, '{Horror,Shooter}', 'GAME', 'Zombie survival horror game', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (68, 'Space Pioneers', 49.99, 'NovaGames', NULL, '{Adventure,Simulation}', 'GAME', 'Space colonization adventure simulation', '7', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (69, 'Dungeon Delvers: Dark Descent', 19.99, 'DungeonMaster Studios', NULL, '{RPG,Action}', 'GAME', 'Dungeon crawling action RPG', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (70, 'Race of Legends', 59.99, 'Champion Racers', NULL, '{Racing,Action}', 'GAME', 'Legendary car racing game', '3', '2023-06-06 20:02:08.625979', true);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (71, 'Cybernetica: Neon Shadows', 14.99, 'OmegaCorp', NULL, '{Action,Adventure}', 'DLC', 'DLC for Cybernetica', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (72, 'Street King: Neon Nights', 9.99, 'SpeedDemon Studios', NULL, '{Racing}', 'DLC', 'DLC for Street King: Tokyo Drift', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (73, 'Crystal Mage Chronicles: Shattered Realms', 19.99, 'Arcane Arts', NULL, '{RPG}', 'DLC', 'Expansion for Crystal Mage Chronicles', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (74, 'Galactic Conquerors: Dark Galaxy', 12.99, 'Stellar Studios', NULL, '{Strategy,RPG}', 'DLC', 'Expansion for Galactic Conquerors', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (75, 'Quantum Odyssey: Time Paradox', 14.99, 'TimeTravel Games', NULL, '{Adventure,Puzzle}', 'DLC', 'Expansion for Quantum Odyssey', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (76, 'Mystic Seas: Ghost Ship', 9.99, 'Mariner Games', NULL, '{Action,Strategy}', 'ADDON', 'Addon for Mystic Seas: Pirate Legends', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (77, 'Apocalypse Survivors: Aftermath', 14.99, 'SurvivalSoft', NULL, '{Survival,Action}', 'DLC', 'DLC for Apocalypse Survivors', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (78, 'Monster Tamer World: Crystal Beasts', 14.99, 'CreatureCatch Studios', NULL, '{RPG,Adventure}', 'ADDON', 'Addon for Monster Tamer World', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (79, 'Stealth Shadow: Silent Blade', 9.99, 'NinjaSoft', NULL, '{Stealth,Action}', 'DLC', 'DLC for Stealth Shadow', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (80, 'Mecha Titans: Sky Giants', 19.99, 'RoboRumble Entertainment', NULL, '{Action,RPG}', 'ADDON', 'Addon for Mecha Titans', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (81, 'Hacker 2077: Darknet Rising', 14.99, 'CyberPunk Productions', NULL, '{Strategy,Puzzle}', 'DLC', 'Expansion for Hacker 2077', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (82, 'Chef Royale: Gourmet Gauntlet', 9.99, 'Gourmet Games', NULL, '{Simulation,Strategy}', 'ADDON', 'Addon for Chef Royale', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (83, 'Warlords: Dragon Siege', 14.99, 'ConquestCo', NULL, '{Strategy,Action}', 'DLC', 'DLC for Warlords: Battlecry', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (84, 'Shadow of the Elves: Crystal Kingdoms', 19.99, 'FantasyForge', NULL, '{Adventure,RPG}', 'DLC', 'Expansion for Shadow of the Elves', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (85, 'Modern Soldiers 5: Operation Eclipse', 14.99, 'TacticalSoft', NULL, '{Shooter,Action}', 'ADDON', 'Addon for Modern Soldiers 5', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (86, 'Virtual Villagers: New Lands', 9.99, 'IslandLife Games', NULL, '{Simulation,Strategy}', 'DLC', 'DLC for Virtual Villagers', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (87, 'Witchcraft & Wizardry: Dark Prophecy', 14.99, 'MagicWorks', NULL, '{RPG,Adventure}', 'ADDON', 'Addon for Witchcraft & Wizardry', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (88, 'A.I. Rebellion: Rise of the Machines', 9.99, 'FutureTech', NULL, '{Strategy,Action}', 'DLC', 'DLC for A.I. Rebellion', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (89, 'Horror Mansion: Phantom Fears', 14.99, 'FrightNight Studios', NULL, '{Horror,Adventure}', 'ADDON', 'Addon for Horror Mansion', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (90, 'CryptoHackers: Quantum Vaults', 19.99, 'CryptoSoft', NULL, '{Puzzle,Strategy}', 'DLC', 'Expansion for CryptoHackers', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (91, 'RuneQuest: Icebound Kingdoms', 14.99, 'Runic Games', NULL, '{RPG,Action}', 'ADDON', 'Addon for RuneQuest', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (92, 'Inferno Racers: Frozen Fury', 9.99, 'Hellfire Racing', NULL, '{Racing,Action}', 'DLC', 'DLC for Inferno Racers', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (93, 'Star Empires: Alien Worlds', 19.99, 'GalaxySoft', NULL, '{Strategy,Simulation}', 'ADDON', 'Addon for Star Empires', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (94, 'Virtual Zoo: Rare Species', 14.99, 'Animalia Games', NULL, '{Simulation,Strategy}', 'DLC', 'DLC for Virtual Zoo', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (95, 'Battle Knights: Crusader Kings', 14.99, 'ChivalrySoft', NULL, '{Action,Strategy}', 'ADDON', 'Addon for Battle Knights', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (96, 'Cybernetica: Uprising', 9.99, 'OmegaCorp', NULL, '{Action,Adventure}', 'DLC', 'DLC for Cybernetica', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (97, 'Dragonflight: Skybound War', 19.99, 'DragonRoar Studios', NULL, '{RPG,Adventure}', 'DLC', 'Expansion for Dragonflight', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (98, 'Lost in Space: Alien Encounters', 14.99, 'Stellar Studios', NULL, '{Adventure,Puzzle}', 'ADDON', 'Addon for Lost in Space', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (99, 'RoboRumble: Titanium Titans', 9.99, 'RoboRumble Entertainment', NULL, '{Action,RPG}', 'DLC', 'DLC for RoboRumble', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (100, 'Street King: Tokyo Lights', 14.99, 'SpeedDemon Studios', NULL, '{Racing}', 'ADDON', 'Addon for Street King: Tokyo Drift', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (101, 'Control: AWE Expansion', 14.99, 'Remedy Entertainment', NULL, '{Action,Adventure}', 'DLC', 'DLC for Control', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (102, 'DOOM Eternal: The Ancient Gods', 19.99, 'id Software', NULL, '{Shooter}', 'DLC', 'DLC for DOOM Eternal', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (103, 'Resident Evil 3: Raccoon City Expansion', 14.99, 'Capcom', NULL, '{Horror,Action}', 'DLC', 'Expansion for Resident Evil 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (104, 'Fortnite: Season Pass', 9.99, 'Epic Games', NULL, '{Shooter,Survival}', 'ADDON', 'Season Pass for Fortnite: Battle Royale', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (105, 'Overwatch: Hero Pack', 19.99, 'Blizzard Entertainment', NULL, '{Shooter}', 'ADDON', 'Hero Pack for Overwatch', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (106, 'Among Us: Extra Skins', 1.99, 'InnerSloth', NULL, '{Party,Strategy}', 'ADDON', 'Extra skins for Among Us', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (107, 'Cyberpunk 2077: Badlands Expansion', 19.99, 'CD Projekt', NULL, '{RPG}', 'DLC', 'Expansion pack for Cyberpunk 2077', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (108, 'Forza Horizon 4: Ultimate Add-Ons Bundle', 19.99, 'Playground Games', NULL, '{Racing}', 'ADDON', 'Add-Ons Bundle for Forza Horizon 4', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (109, 'The Witcher 3: Blood and Wine', 19.99, 'CD Projekt', NULL, '{RPG}', 'DLC', 'Second expansion for The Witcher 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (110, 'Call of Duty: Warzone - Battle Pass', 9.99, 'Infinity Ward', NULL, '{Shooter}', 'ADDON', 'Battle Pass for Call of Duty: Warzone', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (111, 'Bioshock Infinite: Burial at Sea', 14.99, 'Irrational Games', NULL, '{Shooter,RPG}', 'DLC', 'Two-part DLC for Bioshock Infinite', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (112, 'Monster Hunter World: Iceborne', 39.99, 'Capcom', NULL, '{Action,RPG}', 'DLC', 'Expansion for Monster Hunter World', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (113, 'League of Legends: Riot Points', 10.00, 'Riot Games', NULL, '{Strategy,RPG}', 'ADDON', 'In-game currency for League of Legends', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (114, 'Valorant: Battle Pass', 9.99, 'Riot Games', NULL, '{Shooter}', 'ADDON', 'Battle Pass for Valorant', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (115, 'Halo: The Master Chief Collection - Reach DLC', 9.99, '343 Industries', NULL, '{Shooter}', 'DLC', 'DLC for Halo: The Master Chief Collection', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (116, 'Genshin Impact: Genesis Crystals', 9.99, 'miHoYo', NULL, '{Action,RPG}', 'ADDON', 'In-game currency for Genshin Impact', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (117, 'Animal Crossing: New Horizons - Happy Home Paradise', 24.99, 'Nintendo', NULL, '{Simulation}', 'DLC', 'Expansion for Animal Crossing: New Horizons', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (118, 'Assassin''s Creed Odyssey: Season Pass', 39.99, 'Ubisoft', NULL, '{Action,Adventure}', 'ADDON', 'Season Pass for Assassin''s Creed Odyssey', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (119, 'Rainbow Six Siege: Year Pass', 29.99, 'Ubisoft', NULL, '{Shooter}', 'ADDON', 'Year Pass for Rainbow Six Siege', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (120, 'Ghost of Tsushima: Legends', 0.00, 'Sucker Punch Productions', NULL, '{Action,Adventure}', 'DLC', 'Co-op multiplayer mode for Ghost of Tsushima', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (121, 'Mortal Kombat 11: Aftermath', 39.99, 'NetherRealm Studios', NULL, '{Fighting}', 'DLC', 'Expansion for Mortal Kombat 11', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (122, 'Mario Kart 8 Deluxe: Booster Course Pass', 24.99, 'Nintendo', NULL, '{Racing}', 'DLC', 'DLC for Mario Kart 8 Deluxe', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (123, 'God of War: Ragnarok - Fallen God', 19.99, 'Santa Monica Studio', NULL, '{Action,Adventure}', 'DLC', 'DLC for God of War: Ragnarok', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (124, 'Far Cry 6: Season Pass', 39.99, 'Ubisoft', NULL, '{Action,Adventure}', 'ADDON', 'Season Pass for Far Cry 6', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (125, 'Mass Effect Legendary Edition: Deluxe Upgrade', 9.99, 'BioWare', NULL, '{RPG,Action}', 'ADDON', 'Deluxe Upgrade for Mass Effect Legendary Edition', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (126, 'Warframe: Prime Access Pack', 79.99, 'Digital Extremes', NULL, '{Shooter,Action}', 'ADDON', 'Prime Access Pack for Warframe', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (127, 'The Sims 4: Cottage Living', 39.99, 'Maxis', NULL, '{Simulation}', 'DLC', 'Expansion Pack for The Sims 4', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (128, 'Metal Gear Solid V: The Definitive Experience', 29.99, 'Kojima Productions', NULL, '{Action,Stealth}', 'DLC', 'DLC for Metal Gear Solid V: The Phantom Pain', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (129, 'Dark Souls III: The Ringed City', 14.99, 'FromSoftware', NULL, '{Action,RPG}', 'DLC', 'DLC for Dark Souls III', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (130, 'Persona 5 Royal: Costume & BGM Bundle', 59.99, 'Atlus', NULL, '{RPG}', 'ADDON', 'Addon for Persona 5 Royal', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (131, 'Control: The Foundation', 14.99, 'Remedy Entertainment', NULL, '{Action,Adventure}', 'DLC', 'DLC for Control', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (132, 'DOOM Eternal: The Ancient Gods Part Two', 19.99, 'id Software', NULL, '{Shooter}', 'DLC', 'DLC for DOOM Eternal', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (133, 'Resident Evil 3: Resistance', 0.00, 'Capcom', NULL, '{Horror,Action}', 'DLC', 'DLC for Resident Evil 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (134, 'Fortnite: Galaxy Scout Pack', 19.99, 'Epic Games', NULL, '{Shooter,Survival}', 'ADDON', 'Addon for Fortnite: Battle Royale', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (135, 'Overwatch: Legendary Edition Upgrade', 20.00, 'Blizzard Entertainment', NULL, '{Shooter}', 'ADDON', 'Upgrade to the Legendary Edition for Overwatch', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (136, 'Among Us: Pets Bundle', 2.99, 'InnerSloth', NULL, '{Party,Strategy}', 'ADDON', 'Pets Bundle for Among Us', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (137, 'Cyberpunk 2077: The Badlands Outfit Pack', 4.99, 'CD Projekt', NULL, '{RPG}', 'ADDON', 'Outfit Pack for Cyberpunk 2077', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (138, 'Forza Horizon 4: LEGO Speed Champions', 19.99, 'Playground Games', NULL, '{Racing}', 'DLC', 'DLC for Forza Horizon 4', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (139, 'The Witcher 3: Expansion Pass', 24.99, 'CD Projekt', NULL, '{RPG}', 'ADDON', 'Expansion Pass for The Witcher 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (140, 'Call of Duty: Warzone - Combat Pack', 0.00, 'Infinity Ward', NULL, '{Shooter}', 'ADDON', 'Combat Pack for Call of Duty: Warzone', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (141, 'Bioshock Infinite: Burial at Sea', 14.99, 'Irrational Games', NULL, '{Shooter,RPG}', 'DLC', 'DLC for Bioshock Infinite', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (142, 'Monster Hunter World: Iceborne', 39.99, 'Capcom', NULL, '{Action,RPG}', 'DLC', 'Expansion for Monster Hunter World', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (143, 'League of Legends: Riot Points', 9.99, 'Riot Games', NULL, '{Strategy,RPG}', 'ADDON', 'In-game currency for League of Legends', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (144, 'Valorant: Points', 9.99, 'Riot Games', NULL, '{Shooter}', 'ADDON', 'In-game currency for Valorant', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (145, 'Halo: The Master Chief Collection - Reach', 9.99, '343 Industries', NULL, '{Shooter}', 'DLC', 'DLC for Halo: The Master Chief Collection', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (146, 'Genshin Impact: Battle Pass', 9.99, 'miHoYo', NULL, '{Action,RPG}', 'ADDON', 'Battle Pass for Genshin Impact', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (147, 'Animal Crossing: New Horizons - Nook Miles Ticket', 2.99, 'Nintendo', NULL, '{Simulation}', 'ADDON', 'Addon for Animal Crossing: New Horizons', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (148, 'Assassin''s Creed Odyssey: The Fate of Atlantis', 24.99, 'Ubisoft', NULL, '{Action,Adventure}', 'DLC', 'DLC for Assassin''s Creed Odyssey', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (149, 'Rainbow Six Siege: R6 Credits', 9.99, 'Ubisoft', NULL, '{Shooter}', 'ADDON', 'In-game currency for Rainbow Six Siege', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (150, 'Ghost of Tsushima: Director''s Cut Upgrade', 19.99, 'Sucker Punch Productions', NULL, '{Action,Adventure}', 'DLC', 'Upgrade for Ghost of Tsushima', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (151, 'Mortal Kombat 11: Kombat Pack', 39.99, 'NetherRealm Studios', NULL, '{Fighting}', 'ADDON', 'Add-on for Mortal Kombat 11', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (152, 'Mario Kart 8 Deluxe: 200cc Time Trials Pack', 4.99, 'Nintendo', NULL, '{Racing}', 'ADDON', 'Add-on for Mario Kart 8 Deluxe', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (153, 'God of War: Ragnarok - The Lost Pages', 14.99, 'Santa Monica Studio', NULL, '{Action,Adventure}', 'DLC', 'DLC for God of War: Ragnarok', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (154, 'Far Cry 6: The Vaas Insanity Pack', 14.99, 'Ubisoft', NULL, '{Action,Adventure}', 'ADDON', 'Add-on for Far Cry 6', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (155, 'Mass Effect Legendary Edition: Andromeda Initiative Pack', 4.99, 'BioWare', NULL, '{RPG,Action}', 'ADDON', 'Add-on for Mass Effect Legendary Edition', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (156, 'Warframe: Platinum', 4.99, 'Digital Extremes', NULL, '{Shooter,Action}', 'ADDON', 'In-game currency for Warframe', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (157, 'The Sims 4: Cats & Dogs', 39.99, 'Maxis', NULL, '{Simulation}', 'DLC', 'DLC for The Sims 4', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (158, 'Metal Gear Solid V: The Definitive Experience', 19.99, 'Kojima Productions', NULL, '{Action,Stealth}', 'ADDON', 'Add-on for Metal Gear Solid V: The Phantom Pain', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (159, 'Dark Souls III: The Ringed City', 14.99, 'FromSoftware', NULL, '{Action,RPG}', 'DLC', 'DLC for Dark Souls III', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (160, 'Persona 5 Royal: Costume & BGM Bundle', 59.99, 'Atlus', NULL, '{RPG}', 'ADDON', 'Add-on for Persona 5 Royal', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (161, 'Control: The Foundation', 14.99, 'Remedy Entertainment', NULL, '{Action,Adventure}', 'DLC', 'DLC for Control', '16', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (162, 'DOOM Eternal: The Ancient Gods Part One', 19.99, 'id Software', NULL, '{Shooter}', 'DLC', 'DLC for DOOM Eternal', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (163, 'Resident Evil 3: Costume Pack', 4.99, 'Capcom', NULL, '{Horror,Action}', 'ADDON', 'Add-on for Resident Evil 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (164, 'Fortnite: Battle Pass', 9.99, 'Epic Games', NULL, '{Shooter,Survival}', 'ADDON', 'Battle Pass for Fortnite: Battle Royale', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (165, 'Overwatch: Summer Games Loot Boxes', 9.99, 'Blizzard Entertainment', NULL, '{Shooter}', 'ADDON', 'Add-on for Overwatch', '12', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (166, 'Among Us: Halloween Bundle', 1.99, 'InnerSloth', NULL, '{Party,Strategy}', 'ADDON', 'Halloween Bundle for Among Us', '7', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (167, 'Cyberpunk 2077: The Nomad Outfit Pack', 4.99, 'CD Projekt', NULL, '{RPG}', 'ADDON', 'Outfit Pack for Cyberpunk 2077', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (168, 'Forza Horizon 4: VIP Membership', 19.99, 'Playground Games', NULL, '{Racing}', 'ADDON', 'VIP Membership for Forza Horizon 4', '3', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (169, 'The Witcher 3: Blood and Wine', 19.99, 'CD Projekt', NULL, '{RPG}', 'DLC', 'DLC for The Witcher 3', '18', '2023-06-06 20:02:08.625979', false);
INSERT INTO public.products (product_id, name, price, publisher, image, genres, category, description, age_restriction, add_date, physical_copies) VALUES (170, 'Call of Duty: Warzone - Starter Pack', 4.99, 'Infinity Ward', NULL, '{Shooter}', 'ADDON', 'Starter Pack for Call of Duty: Warzone', '18', '2023-06-06 20:02:08.625979', false);


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 214
-- Name: products_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vladimirgresql
--

SELECT pg_catalog.setval('public.products_products_id_seq', 170, true);


--
-- TOC entry 3184 (class 2606 OID 16503)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: vladimirgresql
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 3334
-- Name: DATABASE "SPARKLE"; Type: ACL; Schema: -; Owner: vladimirgresql
--

GRANT ALL ON DATABASE "SPARKLE" TO vladimir;


--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE products; Type: ACL; Schema: public; Owner: vladimirgresql
--

GRANT ALL ON TABLE public.products TO vladimir;


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 214
-- Name: SEQUENCE products_products_id_seq; Type: ACL; Schema: public; Owner: vladimirgresql
--

GRANT ALL ON SEQUENCE public.products_products_id_seq TO vladimir;


-- Completed on 2023-06-07 08:36:30

--
-- PostgreSQL database dump complete
--

