import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    private readonly saltRounds = 12;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    healthCheck() {
        this.logger.debug('Health check called');
        return {
            module: "users",
            status: "healthy",
        };
    };

    async createUser(dto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create(dto);
            return await this.userRepository.save(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error creating user: ${error.message}`, error.stack);
            } else {
                this.logger.error('Error creating user', String(error));
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async comparePasswords(password: string, storedHash: string): Promise<boolean> {
        return await bcrypt.compare(password, storedHash);
    }

    async register(createUserDto: CreateUserDto) {

        const existing =
            await this.userRepository.findOne({
                where: {
                    email: createUserDto.email,
                },
            });

        if (existing) {

            throw new ConflictException(
                "Email already exists",
            );

        }

        const hashedPassword = await this.hashPassword(createUserDto.password);

        const user =
            this.userRepository.create({
                ...createUserDto,
                password: hashedPassword,

            });

        await this.userRepository.save(user);

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

    }

    findAllUsers() {
        return this.userRepository.find();
    }

    findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }
}
