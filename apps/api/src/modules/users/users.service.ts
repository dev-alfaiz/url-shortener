import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    healthCheck() {
        this.logger.debug('Health check called');
        return {
            module: "users",
            status: "healthy",
        };
    };
}
