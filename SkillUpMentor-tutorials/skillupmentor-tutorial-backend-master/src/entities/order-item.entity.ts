import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Exclude } from "class-transformer";
import { Order } from "./order.entity";

@Entity()
export class OrderItem extends Base {
    @Column()
    product_title: string

    @Column()
    price: number

    @Column()
    quantity: number

    // 1 order item can be in 1 order, 1 order can have multiple order items
    @ManyToOne(() => Order, (order) => order.order_items)
    @JoinColumn({name: 'order_id'})
    order: Order

    
}