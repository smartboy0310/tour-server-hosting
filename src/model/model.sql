CREATE TABLE users (
   user_id bigserial PRIMARY KEY,
   user_name varchar(256) not null,
   user_role varchar(256) not null,
   user_login varchar(64) not null,
   user_password varchar(64) not null
);

CREATE TABLE regions (
   region_id serial PRIMARY KEY,
   region_name_oz text not null,
   region_name_uz text not null,
   region_name_ru text not null,
   region_name_en text not null,
   region_short_info_oz text not null,
   region_short_info_uz text not null,
   region_short_info_ru text not null,
   region_short_info_en text not null,
   region_shrine_count text not null,
   region_video text not null,  
   region_photo  text [] not null,
   region_photo_name  text [] not null,
   region_status boolean DEFAULT false,
   region_is_delete boolean DEFAULT false,
   region_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   region_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shrines (
   shrine_id serial PRIMARY KEY,
   shrine_name_oz text not null,
   shrine_name_uz text not null,
   shrine_name_ru text not null,
   shrine_name_en text not null,
   shrine_title_oz text not null,
   shrine_title_uz text not null,
   shrine_title_ru text not null,
   shrine_title_en text not null,
   shrine_info_oz text not null,
   shrine_info_uz text not null,
   shrine_info_ru text not null,
   shrine_info_en text not null,
   shrine_add_title_oz text not null,
   shrine_add_title_uz text not null,
   shrine_add_title_ru text not null,
   shrine_add_title_en text not null,
   shrine_add_info_oz text not null,
   shrine_add_info_uz text not null,
   shrine_add_info_ru text not null,
   shrine_add_info_en text not null,
   shrine_address_oz text not null,
   shrine_address_uz text not null,
   shrine_address_ru text not null,
   shrine_address_en text not null,
   shrine_location json not null,
   shrine_phone varchar(32) not null,
   shrine_type text not null,   
   shrine_top int not null,
   shrine_video text not null,   
   shrine_audio json not null,
   shrine_audio_name json not null,
   shrine_photo  text [] not null,
   shrine_photo_name  text [] not null,
   shrine_status boolean DEFAULT false,
   shrine_is_delete boolean DEFAULT false,
   shrine_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   shrine_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP,
   region_id int not null REFERENCES regions(region_id)
);

CREATE TABLE games (
   game_id serial PRIMARY KEY, 
   game_name_oz text not null,
   game_name_uz text not null,
   game_name_ru text not null,
   game_name_en text not null,
   game_title_oz text not null,
   game_title_uz text not null,
   game_title_ru text not null,
   game_title_en text not null,
   game_info_oz text not null,
   game_info_uz text not null,
   game_info_ru text not null,
   game_info_en text not null,
   game_video text not null,
   game_photo text [] not null,
   game_photo_name text [] not null,
   game_type text not null,  
   game_status boolean DEFAULT false,
   game_is_delete boolean DEFAULT false,
   game_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   game_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP,
   region_id int REFERENCES regions(region_id)
);

CREATE TABLE foods (
   food_id serial PRIMARY KEY,
   food_name_oz text not null,
   food_name_uz text not null,
   food_name_ru text not null,
   food_name_en text not null,
   food_title_oz text not null,
   food_title_uz text not null,
   food_title_ru text not null,
   food_title_en text not null,
   food_info_oz text not null,
   food_info_uz text not null,
   food_info_ru text not null,
   food_info_en text not null,
   food_photo text [] not null,
   food_photo_name text [] not null,
   food_status boolean DEFAULT false,
   food_is_delete boolean DEFAULT false,
   food_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   food_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE essentials (
   essential_id serial PRIMARY KEY,
   essential_name_oz text not null,
   essential_name_uz text not null,
   essential_name_ru text not null,
   essential_name_en text not null,
   essential_title_oz text not null,
   essential_title_uz text not null,
   essential_title_ru text not null,
   essential_title_en text not null,
   essential_info_oz text not null,
   essential_info_uz text not null,
   essential_info_ru text not null,
   essential_info_en text not null,
   essential_photo text not null,
   essential_photo_name text not null,
   essential_status boolean DEFAULT false,
   essential_is_delete boolean DEFAULT false,
   essential_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   essential_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE about (
   project_about_oz text not null,
   project_about_uz text not null,
   project_about_ru text not null,
   project_about_en text not null,
   project_target_oz text not null,
   project_target_uz text not null,
   project_target_ru text not null,
   project_target_en text not null,
   project_status boolean DEFAULT false
);

CREATE TABLE leader (
   leader_id serial PRIMARY KEY,
   leader_name_oz text not null,
   leader_name_uz text not null,
   leader_name_ru text not null,
   leader_name_en text not null,
   leader_role_oz text not null,
   leader_role_uz text not null,
   leader_role_ru text not null,
   leader_role_en text not null,
   leader_info_oz text not null,
   leader_info_uz text not null,
   leader_info_ru text not null,
   leader_info_en text not null,
   leader_phone varchar(32) not null,
   leader_email varchar(128) not null,
   leader_photo text not null,
   leader_photo_name text not null,
   leader_status boolean DEFAULT false,
   leader_is_delete boolean DEFAULT false,
   leader_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   leader_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participant (
   participant_id serial PRIMARY KEY,
   participant_name_oz text not null,
   participant_name_uz text not null,
   participant_name_ru text not null,
   participant_name_en text not null,
   participant_role_oz text not null,
   participant_role_uz text not null,
   participant_role_ru text not null,
   participant_role_en text not null,
   participant_info_oz text not null,
   participant_info_uz text not null,
   participant_info_ru text not null,
   participant_info_en text not null,
   participant_photo text not null,
   participant_photo_name text not null,
   participant_status boolean DEFAULT false,
   participant_is_delete boolean DEFAULT false,
   participant_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   participant_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE special_object (
   object_id bigserial PRIMARY KEY,
   object_name_oz text not null,
   object_name_uz text not null,
   object_name_ru text not null,
   object_name_en text not null,
   object_title_oz text not null,
   object_title_uz text not null,
   object_title_ru text not null,
   object_title_en text not null,
   object_info_oz text not null,
   object_info_uz text not null,
   object_info_ru text not null,
   object_info_en text not null,
   object_address_oz text not null,
   object_address_uz text not null,
   object_address_ru text not null,
   object_address_en text not null,
   object_location json not null,
   object_phone varchar(32) not null,
   object_work_time text,
   object_link json,
   object_photo text [] not null,
   object_photo_name text [] not null,
   object_type text not null,
   object_status boolean DEFAULT false,
   object_is_delete boolean DEFAULT false,
   object_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   object_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP,
   region_id int not null REFERENCES regions(region_id),
   shrine_id int REFERENCES shrines(shrine_id)
);

CREATE TABLE general (
   home_video text not null,
   home_video_name text not null,
   telegram_link text not null,
   facebook_link text not null,
   instagram_link text not null   
);

CREATE TABLE homeslider (
   slide_id serial PRIMARY KEY,
   slide_title_oz text not null,
   slide_title_uz text not null,
   slide_title_ru text not null,
   slide_title_en text not null,
   slide_photo text not null,
   slide_photo_name text not null,
   slide_status boolean DEFAULT false,
   slide_is_delete boolean DEFAULT false,
   slide_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
   slide_deleted_at timestamp DEFAULT CURRENT_TIMESTAMP
);



