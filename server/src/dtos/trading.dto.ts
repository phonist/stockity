import { IsIn, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  public symbol: string;

  @IsString()
  @IsIn(['buy', 'sell'])
  public side: 'buy' | 'sell';

  @IsNumber()
  @IsPositive()
  public quantity: number;

  @IsNumber()
  @IsPositive()
  public price: number;
}

export class CashAdjustmentDto {
  @IsNumber()
  @Min(0.01)
  public amount: number;
}
