import { ApiProperty } from "@nestjs/swagger";
import { $Enums, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty({ type: 'string', nullable: true })
  lastName: string | null;

  @ApiProperty({ format: 'email' })
  email: string;

  @Exclude()
  role: $Enums.Role;

  @Exclude()
  password: string;
}
