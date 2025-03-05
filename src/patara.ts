import { SuiContext } from "@sentio/sdk/sui";
import {
  events_amm,
  events_clmm,
  events_farm,
  events_fee,
  events_lend,
  events_send,
  events_swap,
} from "./types/sui/0x8ddd1b220d6102f90af76422b9fcdd2f43eafb72cece36a367746d280f76208f.js";
import { BigNumber } from "bignumber.js";
import { getPricedAmount } from "./helpers/price.js";
import { getMetadata } from "./helpers/metadata.js";

const bindingOptions = {
  startCheckpoint: 86586044n,
};

export function initPataraProcessor() {
  events_amm
    .bind(bindingOptions)
    .onEventAddLiquidityEvent(
      async (event: events_amm.AddLiquidityEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_amm_add_liquidity").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];

          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("amm_add_liquidity", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_amm_add_liquidity_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_amm_add_liquidity_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    )
    .onEventRemoveLiquidityEvent(
      async (
        event: events_amm.RemoveLiquidityEventInstance,
        ctx: SuiContext
      ) => {
        ctx.meter.Counter("events_amm_remove_liquidity").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];

          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("amm_remove_liquidity", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_amm_remove_liquidity_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_amm_remove_liquidity_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    );

  events_clmm
    .bind(bindingOptions)
    .onEventCreatePositionEvent(
      async (
        event: events_clmm.CreatePositionEventInstance,
        ctx: SuiContext
      ) => {
        ctx.meter.Counter("events_clmm_create_position").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];

          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("clmm_create_position", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_clmm_create_position_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_clmm_create_position_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    )
    .onEventIncreasePositionEvent(
      async (
        event: events_clmm.IncreasePositionEventInstance,
        ctx: SuiContext
      ) => {
        ctx.meter.Counter("events_clmm_increase_position").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];

          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("clmm_increase_position", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_clmm_increase_position_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_clmm_increase_position_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    )
    .onEventDecreasePositionEvent(
      async (
        event: events_clmm.DecreasePositionEventInstance,
        ctx: SuiContext
      ) => {
        ctx.meter.Counter("events_clmm_decrease_position").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];
          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("clmm_decrease_position", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_clmm_decrease_position_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_clmm_decrease_position_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    )
    .onEventClosePositionEvent(
      async (
        event: events_clmm.ClosePositionEventInstance,
        ctx: SuiContext
      ) => {
        ctx.meter.Counter("events_clmm_close_position").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];
          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("clmm_close_position", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_clmm_close_position_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_clmm_close_position_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    )
    .onEventHarvestPositionEvent(
      async (
        event: events_clmm.HarvestPositionEventInstance,
        ctx: SuiContext
      ) => {
        ctx.meter.Counter("events_clmm_harvest_position").add(1);

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];
          const inputToken = await getMetadata(coin.name.toString());

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("clmm_harvest_position", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_clmm_harvest_position_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_clmm_harvest_position_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    );

  events_farm
    .bind(bindingOptions)
    .onEventDepositEvent(
      async (event: events_farm.DepositEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_farm_deposit").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.lp_coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.lp_coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.lp_coin_amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("farm_deposit", {
          input: normalized_input_name,
          input_amount: event.data_decoded.lp_coin_amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_farm_deposit_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_farm_deposit_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    )
    .onEventHarvestEvent(
      async (event: events_farm.HarvestEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_farm_harvest").add(1);

        const inputTokens = [];

        for (const coin of event.data_decoded.coin_types) {
          const inputToken = await getMetadata(coin.name.toString());

          inputTokens.push(inputToken);
        }

        for (
          let index = 0;
          index < event.data_decoded.coin_types.length;
          index++
        ) {
          const coin = event.data_decoded.coin_types[index];
          const inputToken = inputTokens[index];

          const normalized_input_name = `0x${coin.name.toString()}`;

          const normalized_input_amount = BigNumber(
            event.data_decoded.amounts[index].toString()
          ).div(BigNumber(10).pow(inputToken.decimals));

          const input_amount_usd = await getPricedAmount(
            normalized_input_name,
            normalized_input_amount,
            ctx
          );

          ctx.eventLogger.emit("farm_harvest", {
            input: normalized_input_name,
            input_amount: event.data_decoded.amounts[index].toString(),
            input_amount_usd: input_amount_usd.toString(),
            event: event.id.eventSeq + " " + event.id.txDigest,
            sender: event.sender,
          });

          ctx.meter
            .Gauge("total_farm_harvest_input_amount")
            .record(normalized_input_amount.toString(), {
              token: normalized_input_name,
            });

          ctx.meter
            .Gauge("total_farm_harvest_input_amount_usd")
            .record(input_amount_usd.toString(), {
              token: normalized_input_name,
            });
        }
      }
    )
    .onEventRelockEvent(
      (event: events_farm.RelockEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_farm_relock").add(1);

        ctx.eventLogger.emit("farm_relock", {
          coin_type: "0x" + event.data_decoded.lp_coin_type.name.toString(),
          sender: event.sender,
        });
      }
    )
    .onEventWithdrawEvent(
      async (event: events_farm.WithdrawEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_farm_withdraw").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.lp_coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.lp_coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.lp_coin_amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("farm_withdraw", {
          input: normalized_input_name,
          input_amount: event.data_decoded.lp_coin_amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_farm_withdraw_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_farm_withdraw_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    );

  events_fee
    .bind(bindingOptions)
    .onEventFeeEvent(
      async (event: events_fee.FeeEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_fee_fee").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("fee", {
          input: normalized_input_name,
          input_amount: event.data_decoded.amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          event: event.data_decoded.event_type.name.split("::")[1],
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_fee_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_fee_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    );

  events_lend
    .bind(bindingOptions)
    .onEventLendEvent(
      async (event: events_lend.LendEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_lend_lend").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("lend_lend", {
          input: normalized_input_name,
          input_amount: event.data_decoded.amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_lend_lend_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_lend_lend_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    )
    .onEventBorrowEvent(
      async (event: events_lend.BorrowEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_lend_borrow").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("lend_borrow", {
          input: normalized_input_name,
          input_amount: event.data_decoded.amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_lend_borrow_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_lend_borrow_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    )
    .onEventRepayEvent(
      async (event: events_lend.RepayEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_lend_repay").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("lend_repay", {
          input: normalized_input_name,
          input_amount: event.data_decoded.amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_lend_repay_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_lend_repay_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    )
    .onEventWithdrawEvent(
      async (event: events_lend.WithdrawEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_lend_withdraw").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("lend_withdraw", {
          input: normalized_input_name,
          input_amount: event.data_decoded.amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_lend_withdraw_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_lend_withdraw_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    );

  events_send
    .bind(bindingOptions)
    .onEventSendEvent(
      async (event: events_send.SendEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_send_send").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        ctx.eventLogger.emit("send", {
          input: normalized_input_name,
          input_amount: event.data_decoded.amount.toString(),
          input_amount_usd: input_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_send_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_send_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });
      }
    );

  events_swap
    .bind(bindingOptions)
    .onEventSwapEvent(
      async (event: events_swap.SwapEventInstance, ctx: SuiContext) => {
        ctx.meter.Counter("events_swap_swap").add(1);

        const inputToken = await getMetadata(
          event.data_decoded.coin_in_type.name.toString()
        );

        const outputToken = await getMetadata(
          event.data_decoded.coin_out_type.name.toString()
        );

        const normalized_input_name = `0x${event.data_decoded.coin_in_type.name.toString()}`;
        const normalized_output_name = `0x${event.data_decoded.coin_out_type.name.toString()}`;

        const normalized_input_amount = BigNumber(
          event.data_decoded.amount_in.toString()
        ).div(BigNumber(10).pow(inputToken.decimals));

        const normalized_output_amount = BigNumber(
          event.data_decoded.amount_out.toString()
        ).div(BigNumber(10).pow(outputToken.decimals));

        const input_amount_usd = await getPricedAmount(
          normalized_input_name,
          normalized_input_amount,
          ctx
        );

        const output_amount_usd = await getPricedAmount(
          normalized_output_name,
          normalized_output_amount,
          ctx
        );

        ctx.eventLogger.emit("swap", {
          input: normalized_input_name,
          output: normalized_output_name,
          input_amount: event.data_decoded.amount_in.toString(),
          output_amount: event.data_decoded.amount_out.toString(),
          input_amount_usd: input_amount_usd.toString(),
          output_amount_usd: output_amount_usd.toString(),
          sender: event.sender,
        });

        ctx.meter
          .Gauge("total_swap_input_amount")
          .record(normalized_input_amount.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_swap_input_amount_usd")
          .record(input_amount_usd.toString(), {
            token: normalized_input_name,
          });

        ctx.meter
          .Gauge("total_swap_output_amount")
          .record(normalized_output_amount.toString(), {
            token: normalized_output_name,
          });

        ctx.meter
          .Gauge("total_swap_output_amount_usd")
          .record(output_amount_usd.toString(), {
            token: normalized_output_name,
          });
      }
    );
}
