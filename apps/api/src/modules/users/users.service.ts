import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

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

    createUser(dto: any) {
        const user = this.userRepository.create(dto);
        return this.userRepository.save(user);
    }

    findAllUsers() {
        return this.userRepository.find();
    }

    findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }
}
