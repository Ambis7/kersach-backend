import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResearchController],
  providers: [ResearchService, PrismaService],
})
export class ResearchModule {}
