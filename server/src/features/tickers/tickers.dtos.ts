import { IsDate, IsString } from 'class-validator';

export class CreateTickerDto {
  @IsString()
  public name: string;
}

export class UpdateTickerDto {
  @IsString()
  public name: string;

  @IsString()
  public timestamp: Date;
}
