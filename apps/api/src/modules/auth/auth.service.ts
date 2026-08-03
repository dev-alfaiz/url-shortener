import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    healthCheck() {
        this.logger.debug('Health check called');
        return {
            module: "auth",
            status: "healthy",
        };
    };
}
