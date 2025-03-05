import { SuiContext } from "@sentio/sdk/sui";
import { dca } from "./types/sui/0x0db109c281e8ab325493cb5b47425f1e32082358e28fcb2366c01e7929690cfe.js";
import { BigNumber } from "bignumber.js";
import { getPricedAmount } from "./helpers/price.js";
import { getMetadata } from "./helpers/metadata.js";

const bindingOptions = {
  startCheckpoint: 50462430n,
};

export function initDCAProcessor() {
  dca
    .bind(bindingOptions)
    .onEventStart((event: dca.StartInstance, ctx: SuiContext) => {
      ctx.meter.Counter("dca_start").add(1);
      ctx.eventLogger.emit("dca_start", {
        dca: event.data_decoded.dca,
        delegatee: event.data_decoded.delegatee,
        input: "0x" + event.data_decoded.input.name.toString(),
        output: "0x" + event.data_decoded.output.name.toString(),
        every: event.data_decoded.every.toString(),
        time_scale: event.data_decoded.time_scale,
        input_amount: event.data_decoded.input_amount.toString(),
        sender: event.sender,
      });
    })
    .onEventStartV2((event: dca.StartV2Instance, ctx: SuiContext) => {
      ctx.meter.Counter("dca_start").add(1);
      ctx.eventLogger.emit("dca_start", {
        dca: event.data_decoded.dca,
        delegatee: event.data_decoded.delegatee,
        input: "0x" + event.data_decoded.input.name.toString(),
        output: "0x" + event.data_decoded.output.name.toString(),
        every: event.data_decoded.every.toString(),
        time_scale: event.data_decoded.time_scale,
        input_amount: event.data_decoded.input_amount.toString(),
        sender: event.sender,
      });
    })
    .onEventDestroy((event: dca.DestroyInstance, ctx: SuiContext) => {
      ctx.meter.Counter("dca_destroy").add(1);
      ctx.eventLogger.emit("dca_destroy", {
        dca: event.data_decoded.dca,
        input: "0x" + event.data_decoded.input.name.toString(),
        output: "0x" + event.data_decoded.output.name.toString(),
        sender: event.sender,
      });
    })
    .onEventResolve(async (event: dca.ResolveInstance, ctx: SuiContext) => {
      ctx.meter.Counter("dca_resolve").add(1);

      const inputToken = await getMetadata(
        event.data_decoded.input.name.toString()
      );

      const outputToken = await getMetadata(
        event.data_decoded.output.name.toString()
      );

      const normalized_input_name = `0x${event.data_decoded.input.name.toString()}`;
      const normalized_output_name = `0x${event.data_decoded.output.name.toString()}`;

      const normalized_fee = BigNumber(event.data_decoded.fee.toString()).div(
        BigNumber(10).pow(outputToken.decimals)
      );

      const normalized_input_amount = BigNumber(
        event.data_decoded.input_amount.toString()
      ).div(BigNumber(10).pow(inputToken.decimals));

      const normalized_output_amount = BigNumber(
        event.data_decoded.output_amount.toString()
      ).div(BigNumber(10).pow(outputToken.decimals));

      const fee_usd = await getPricedAmount(
        normalized_output_name,
        normalized_fee,
        ctx
      );

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

      ctx.eventLogger.emit("dca_resolve", {
        dca: event.data_decoded.dca,
        input: normalized_input_name,
        output: normalized_output_name,
        resolvedOn: ctx.timestamp,
        fee: event.data_decoded.fee.toString(),
        normalized_fee: normalized_fee.toString(),
        fee_usd: fee_usd.toString(),
        input_amount: event.data_decoded.input_amount.toString(),
        normalized_input_amount: normalized_input_amount.toString(),
        input_amount_usd: input_amount_usd.toString(),
        output_amount: event.data_decoded.output_amount.toString(),
        normalized_output_amount: normalized_output_amount.toString(),
        output_amount_usd: output_amount_usd.toString(),
        sender: event.sender,
      });

      ctx.meter
        .Gauge("normalized_total_fee_amount")
        .record(normalized_fee.toString(), {
          token: normalized_output_name,
        });

      ctx.meter
        .Gauge("normalized_total_fee_amount_usd")
        .record(fee_usd.toString(), {
          token: normalized_output_name,
        });

      ctx.meter
        .Gauge("total_input_amount")
        .record(normalized_input_amount.toString(), {
          token: normalized_input_name,
        });

      ctx.meter
        .Gauge("total_input_amount_usd")
        .record(input_amount_usd.toString(), {
          token: normalized_input_name,
        });

      ctx.meter
        .Gauge("total_output_amount")
        .record(normalized_output_amount.toString(), {
          token: normalized_output_name,
        });

      ctx.meter
        .Gauge("total_output_amount_usd")
        .record(output_amount_usd.toString(), {
          token: normalized_output_name,
        });
    });
}
