package com.ecommerce.order.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long productId;
    
    @Column(nullable = false)
    private String productName;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private Double totalPrice;
    
    @Column(nullable = false)
    private String customerName;
    
    @Column(nullable = false)
    private String customerEmail;
    
    private String shippingAddress;
    
    @Column(nullable = false)
    private String status;
    
    @Column(nullable = false)
    private LocalDateTime orderDate;
}
