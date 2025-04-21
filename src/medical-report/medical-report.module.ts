import { Module } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { MedicalReportController } from './medical-report.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MedicalReportController],
  providers: [MedicalReportService, PrismaService],
})
export class MedicalReportModule {}
