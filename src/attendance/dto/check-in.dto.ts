import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

export class CheckInDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  placeId: string;
}
