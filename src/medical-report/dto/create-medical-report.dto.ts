import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsJSON, IsOptional } from 'class-validator';

export class CreateMedicalReportDto {
  @ApiProperty({ example: 'patient-uuid' })
  @IsString()
  patientId: string;

  @ApiProperty({ example: 'cardiology' })
  @IsString()
  reportType: string;

  @ApiProperty({ example: 'Hypertension detected', required: false })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({ example: '{"ecg": "normal"}' })
  @IsJSON()
  findings: string;

  @ApiProperty({ example: 'Monitor condition', required: false })
  @IsString()
  @IsOptional()
  conclusion?: string;
}
