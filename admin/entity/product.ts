import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "default"})
    title: string;

    @Column({default: 0})
    price: number;

    @Column({default: "default"})
    image: string;

    @Column({default: 0})
    likes: number;
}
