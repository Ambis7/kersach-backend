import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsJSON, IsOptional } from 'class-validator';

export class UpdateResearchDto {
  @ApiPropertyOptional({ example: 'ECG' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ example: '{"waveform": "data"}' })
  @IsJSON()
  @IsOptional()
  data?: string;

  @ApiPropertyOptional({ example: 'completed' })
  @IsString()
  @IsOptional()
  status?: string;
}
