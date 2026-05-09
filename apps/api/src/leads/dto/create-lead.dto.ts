import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'Aigerim Nurlybek' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: '+7 777 123 45 67' })
  @IsString()
  @MinLength(5)
  phone: string;

  @ApiPropertyOptional({ example: 'aigerim@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Arena Member' })
  @IsOptional()
  @IsString()
  interest?: string;

  @ApiPropertyOptional({ example: 'Website' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ example: 'I want to book a football slot for my team.' })
  @IsOptional()
  @IsString()
  message?: string;
}
