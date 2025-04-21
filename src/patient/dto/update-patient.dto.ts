import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({ example: '1990-01-01' })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional({ example: 'Hypertension' })
  @IsString()
  @IsOptional()
  medicalHistory?: string;
}
