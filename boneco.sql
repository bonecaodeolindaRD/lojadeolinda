drop database if exists eboneco_de_olinda;
create database if not exists eboneco_de_olinda;
use eboneco_de_olinda;

create table enderecos(
	id_endereco int primary key auto_increment,
    endereco varchar(255),
    cep varchar(10)
);

create table clientes(
	id_cliente int primary key auto_increment,
    nome varchar(100) not null,
    cpf varchar(15) not null,
    email varchar(60) not null,
    senha varchar(255) not null,
    id_endereco int,
    foreign key(id_cliente) references enderecos(id_endereco)
);

create table categorias(
	id_categoria int primary key auto_increment,
    nome varchar(45) not null
);

create table estoques(
	id_estoque int primary key auto_increment
);

create table status_pedidos(
	id_status int primary key auto_increment,
    nome varchar(20)
);

create table tipo_notas(
	id_tipo int primary key auto_increment,
    descricao_nota varchar(20)
);

create table fornecedores(
	id_fornecedor int primary key auto_increment,
    nome varchar(100),
    cnpj varchar(16),
    id_endereco int,
    foreign key(id_endereco) references enderecos(id_endereco)
);

create table produtos(
	id_produto int primary key auto_increment,
    nome varchar(45),
    descricao varchar(255),
    imagem_produto varchar(255),
    valor decimal(6,2),
    id_categoria int, 
    foreign key(id_categoria) references categorias(id_categoria)
);

create table nfs(
	id_nf int primary key auto_increment,
    id_fornecedores int,
    data datetime,
    id_tipo_de_nota int,
    valor_total decimal(8, 2),
    foreign key(id_fornecedores) references fornecedores(id_fornecedor),
    foreign key(id_tipo_de_nota) references tipo_notas(id_tipo)
);

create table pedidos(
	id_pedido int primary key auto_increment,
    id_cliente int,
    id_status int,
    foreign key(id_cliente) references clientes(id_cliente),
    foreign key(id_status) references status_pedidos(id_status)
);

create table pedidos_produtos(
	id_pedido int,
    id_produto int,
    quantidade int not null,
    foreign key (id_pedido) references pedidos(id_pedido),
    foreign key (id_produto) references produtos(id_produto)
);

create table produtos_nf(
	id_produto int,
    quantidade_produto int not null,
    valor_item decimal(8,2),
    id_nf int,
    foreign key (id_produto) references produtos (id_produto),
    foreign key (id_nf) references nfs (id_nf)
);

create table hieraquias(
	id_hierarquia int primary key auto_increment,
    cargo varchar(45)
);

create table funcionarios(
	id_funcionario int primary key auto_increment,
    nome varchar(70) not null,
    email varchar(70),
    senha varchar(255)  not null,
    usuario varchar(70) not null,
    id_hierarquia int,
    foreign key (id_hierarquia) references hieraquias(id_hierarquia)
);

create table produtos_estoques(
	id_produto int,
	id_estoque int,
	saldo int,
	foreign key(id_produto) references produtos(id_produto),
	foreign key(id_estoque) references estoques(id_estoque)
);

alter table nfs add(
	id_pedido int,
    foreign key(id_pedido) references pedidos(id_pedido)
);

alter table pedidos add(
	id_nf int,
    foreign key(id_nf) references nfs(id_nf)
);