import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UrlsService {
    private readonly logger = new Logger(UrlsService.name);
    healthCheck() {
        this.logger.debug('Health check called');
        return {
            module: "urls",
            status: "healthy",
        };
    };
}
