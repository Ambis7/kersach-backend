import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export enum Role {
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @ApiProperty({ example: 'doctor@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Dr. John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ enum: Role, default: Role.DOCTOR })
  @IsEnum(Role)
  role: Role;
}
