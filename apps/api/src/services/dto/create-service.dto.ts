import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Football Arena' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'football-arena' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Indoor football pitch rental and team training sessions.' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'from 18,000 KZT/hour' })
  @IsOptional()
  @IsString()
  priceLabel?: string;

  @ApiPropertyOptional({ example: 60 })
  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
