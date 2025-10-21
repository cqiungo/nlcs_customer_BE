import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'email không được để trống' })
    email: string;
    @IsNotEmpty({ message: 'mật khẩu không được để trống' })
    password: string;
    @IsOptional()
    name:string;
    @IsOptional()
    phone:string;
    @IsOptional()
    role:string;
    @IsOptional()
    address:string;
}
