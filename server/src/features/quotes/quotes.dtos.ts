import { IsString } from 'class-validator';

export class PostQuoteDto {
  @IsString()
  public name: string;
}

export class GetQuoteDto {
  @IsString()
  public name: string;

  @IsString()
  public timestamp: Date;
}
