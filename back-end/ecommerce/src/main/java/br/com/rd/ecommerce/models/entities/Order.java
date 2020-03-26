package br.com.rd.ecommerce.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(name = "vl_shipping")
    private Double shipping;
    @OneToOne(targetEntity = Order.class)
    @JoinColumn(name = "id_invoice")
    private Invoice invoice;
    @ManyToOne
    @JoinColumn(name = "id_client")
    @JsonBackReference
    private Client client;
    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_order")
    @JsonManagedReference
    private List<OrderItem> orderItem;
    @ManyToOne
    @JoinColumn(name = "id_address")
    private Address address;

    public void addItem(OrderItem item){
        if(orderItem == null) orderItem = new ArrayList<>();
        orderItem.add(item);
    }

    public double total(){
        double sum = 0.0;
        for(OrderItem o: orderItem)
            sum += o.calcSubValue();
        if(shipping == null)
            return sum + 200;
        return sum + this.shipping;
    }
}
