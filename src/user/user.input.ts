/* eslint-disable max-classes-per-file */
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;
  
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;
}

@InputType()
export class UserUpdateInput {
  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

/* eslint-enable */
