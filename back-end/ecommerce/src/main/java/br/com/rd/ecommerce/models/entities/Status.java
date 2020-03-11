package br.com.rd.ecommerce.models.entities;

<<<<<<< HEAD
=======

>>>>>>> 83b64d82797d83c6bd909bc1601f31b14abbd9c0
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_status")
public class Status {
    private Integer id;
=======
import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_status")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_status")
    private Long id;
    @Column(name = "ds_name")
    private String name;
>>>>>>> 83b64d82797d83c6bd909bc1601f31b14abbd9c0

}
