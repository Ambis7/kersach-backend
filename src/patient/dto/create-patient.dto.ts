import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({ example: 'Hypertension', required: false })
  @IsString()
  medicalHistory?: string;
}
