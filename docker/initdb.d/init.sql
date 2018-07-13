create table tb_payment (
    `id` bigint not null primary key auto_increment,
    `type` varchar(255) not null,
    `value` decimal(10,2) not null,
    `coin` varchar(3) not null,
    `status` varchar(255) not null,
    `date` date,
    `description` text
);