import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsJSON, IsOptional } from 'class-validator';

export class UpdateMedicalReportDto {
  @ApiPropertyOptional({ example: 'cardiology' })
  @IsString()
  @IsOptional()
  reportType?: string;

  @ApiPropertyOptional({ example: 'Hypertension detected' })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional({ example: '{"ecg": "normal"}' })
  @IsJSON()
  @IsOptional()
  findings?: string;

  @ApiPropertyOptional({ example: 'Monitor condition' })
  @IsString()
  @IsOptional()
  conclusion?: string;
}
