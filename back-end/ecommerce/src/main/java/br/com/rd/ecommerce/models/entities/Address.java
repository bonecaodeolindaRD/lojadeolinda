package br.com.rd.ecommerce.models.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Data
@Entity
@Table(name = "tb_address")
@NoArgsConstructor
@AllArgsConstructor
public class Address implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_address")
    private Long id;
    @Column(name = "ds_street", nullable = false, length = 100)
    private String street;
    @Column(name = "nr_cep", nullable = false, length = 10)
    private String cep;
    @Column(name = "ds_district", nullable = false, length = 45)
    private String district;
    @Column(name = "ds_citie")
    private String citie;
    @Column(name = "ds_complement")
    private String complement;
    @Column(name = "nr_number", nullable = false)
    private Integer number;
    @Column(name = "ds_uf", nullable = false, length = 5)
    private String uf;
    @ManyToOne
    @JoinColumn(name = "id_provider")
    private Provider provider;
    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;
}
