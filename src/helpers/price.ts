import { SuiContext, SuiNetwork, SuiObjectContext } from "@sentio/sdk/sui";
import { getPriceByType } from "@sentio/sdk/utils";
import { BigNumber } from "bignumber.js";

export async function getPricedAmount(
  type: string,
  amount: BigNumber,
  ctx: SuiContext | SuiObjectContext
) {
  const price = await getPriceByType(SuiNetwork.MAIN_NET, type, ctx.timestamp, {
    toleranceInDays: 1,
  });

  if (!price) {
    console.log("No price found for, cannot calculate fee", type);
    return BigNumber(0);
  }

  return BigNumber(price).times(amount);
}
