package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private Long id;
    @Column(name = "vl_value")
    private Double value;
    @Column(name = "dt_order")
    @Temporal(TemporalType.DATE)
    private Date date;
    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_order")
    private List<OrderItem> orderItem;
    @ManyToOne
    @JoinColumn(name = "id_address")
    private Address address;

    public void addItem(OrderItem item){
        if(orderItem == null) orderItem = new ArrayList<>();
        orderItem.add(item);
    }
}
