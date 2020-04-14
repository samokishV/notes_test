import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ synchronize: false })
export class Notes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    text: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: number;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: number;
}
