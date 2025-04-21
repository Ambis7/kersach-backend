import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsJSON } from 'class-validator';

export class CreateResearchDto {
  @ApiProperty({ example: 'patient-uuid' })
  @IsString()
  patientId: string;

  @ApiProperty({ example: 'ECG' })
  @IsString()
  type: string;

  @ApiProperty({ example: '{"waveform": "data"}' })
  @IsJSON()
  data: string;

  @ApiProperty({ example: 'pending' })
  @IsString()
  status: string;
}
