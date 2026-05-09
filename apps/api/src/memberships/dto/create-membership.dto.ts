import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty({ example: 'Arena Member' })
  @IsString()
  title: string;

  @ApiProperty({ example: 22000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'month' })
  @IsString()
  period: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ example: ['Unlimited gym access', 'Class booking priority'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  benefits: string[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
