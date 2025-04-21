import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { ResearchModule } from './research/research.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PatientModule,
    MedicalReportModule,
    ResearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
