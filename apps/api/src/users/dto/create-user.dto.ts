import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'manager@bsarena.local' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Front Desk Manager' })
  @IsString()
  name: string;

  @ApiProperty({ minLength: 8, example: 'Manager123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ enum: Role, default: Role.MANAGER })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
