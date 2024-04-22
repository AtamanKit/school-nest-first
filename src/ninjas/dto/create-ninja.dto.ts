import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;

    @IsEnum(['stars', 'nunchunks'], { message: 'Use correct weapon!' })
    weapon: 'stars' | 'nunchunks';
}
