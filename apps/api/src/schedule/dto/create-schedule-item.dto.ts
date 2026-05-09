import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateScheduleItemDto {
  @ApiProperty({ example: 'Football Academy' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Main Arena' })
  @IsString()
  area: string;

  @ApiProperty({ minimum: 0, maximum: 6, example: 2 })
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty({ example: '18:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '19:30' })
  @IsString()
  endTime: string;

  @ApiPropertyOptional({ example: 24 })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  coachId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  serviceId?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
