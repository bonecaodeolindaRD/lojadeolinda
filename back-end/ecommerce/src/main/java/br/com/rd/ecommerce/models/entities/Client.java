package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "tb_client")
public class Client {

    @Column
    @GeneratedValue
    private Integer id;


    @Column
    private String name;


    @Column
    private String CPF;


    @Column
    private String email;


    @Column
    private Long phoneNumber;


    @Column
    private String password;
}
