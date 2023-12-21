import { ApiProperty } from "@nestjs/swagger";

export class AuthEntity {
  @ApiProperty({ format: 'jwt' })
  accessToken: string;
}
