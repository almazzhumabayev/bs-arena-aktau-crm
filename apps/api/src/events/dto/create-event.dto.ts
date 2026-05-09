import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'BS Arena Spring Cup' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'spring-cup' })
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2026-06-13T10:00:00.000Z' })
  @IsISO8601()
  startsAt: string;

  @ApiPropertyOptional({ example: '2026-06-14T18:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  endsAt?: string;

  @ApiProperty({ example: 'Main Arena' })
  @IsString()
  location: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
