import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCoachDto {
  @ApiProperty({ example: 'Arman Sadykov' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Head Football Coach' })
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ example: ['Football', 'Youth academy'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  specialities: string[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
