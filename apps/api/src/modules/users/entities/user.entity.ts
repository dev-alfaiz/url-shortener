import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index('IDX_USER_EMAIL')
    @Column({
        name: "email",
        unique: true,
    })
    email: string;

    @Column({
        name: "password",
    })
    password: string;

    @Column({
        name: "first_name",
    })
    firstName: string;

    @Column({
        name: "last_name",
    })
    lastName: string;

    @Column({
        name: "profile_image",
        nullable: true,
    })
    profileImage?: string;

    @Column({
        name: "is_active",
        default: true,
    })
    isActive: boolean;

    @Column({
        name: "is_email_verified",
        default: false,
    })
    isEmailVerified: boolean;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

}