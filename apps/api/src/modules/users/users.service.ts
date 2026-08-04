import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
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

    findAllUsers() {
        return this.userRepository.find();
    }

    findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }
}
