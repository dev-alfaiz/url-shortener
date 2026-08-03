import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
    private readonly logger = new Logger(AnalyticsService.name);
    healthCheck() {
        this.logger.debug('Health check called');
        return {
            module: "auth",
            status: "healthy",
        };
    };
}
