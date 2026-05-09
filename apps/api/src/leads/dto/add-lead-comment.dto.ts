import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AddLeadCommentDto {
  @ApiProperty({ example: 'Called the lead and scheduled a facility tour for Friday.' })
  @IsString()
  @MinLength(2)
  body: string;
}
