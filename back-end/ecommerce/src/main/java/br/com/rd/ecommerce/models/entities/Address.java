package br.com.rd.ecommerce.models.entities;


import com.fasterxml.jackson.annotation.JacksonInject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Data
@Entity
@Table(name = "tb_address")
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_address")
    private Integer id;
    @Column(nullable = false, name = "ds_street")
    private String street;
    @Column(nullable = false, name = "nr_number",length = 100)
    private Integer number;
    @Column(nullable = false, name = "ds_cep", length = 11)
    private String CEP;
    @Column(nullable = false, name = "ds_district", length = 45)
    private String district;
    @Column(nullable = false, name = "ds_uf", length = 5)
    private String UF;

    @ManyToOne(targetEntity = Provider.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_provider")
    private Provider provider;

    @ManyToOne(targetEntity = Client.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client")
    private Client client;
}
