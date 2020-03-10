package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private Long id;
    @Column(name = "vl_order", nullable = true)
    private Double value;
    @Column(name = "dt_order", nullable = false)
    private Date date;

    @OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_order")
    private List<OrderItem> orderItems;
    @ManyToOne(targetEntity = Status.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_status")
    private Status status;

    @OneToOne(targetEntity = Invoice.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_invoice")
    private Invoice invoice;

}
