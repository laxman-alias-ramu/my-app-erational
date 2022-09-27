import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    complaintId: number;

    @Column({ type: 'date' , default : () => "(CURRENT_DATE)"})
    complaintDate: Date;

    @Column({default: "default"})
    customerName: string;

    @Column({default: "default"})
    customerDesc: string;

    @Column({default: "NOT ATTENDED"})
    complaintStatus: string;

    @Column({ type: 'date', nullable: true})
    complaintPostponeDate: Date;

    @Column({ type: 'date' , nullable: true})
    complaintCompleteDate: Date;
}