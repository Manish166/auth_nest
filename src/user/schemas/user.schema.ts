
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, type: String })
  firstName!: string;

  @Prop({type: String })
  lastName?: string;

  @Prop({ required: true, unique: true, type: String  })
  email!: string;

  @Prop({required: true, type: String })
  password!: string;

  @Prop({default: Role.Student, type: String })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
