// import {
//   CompositePropagator,
//   W3CBaggagePropagator,
//   W3CTraceContextPropagator
// } from "@opentelemetry/core";
// import { BatchSpanProcessor, SpanProcessor } from '@opentelemetry/tracing';
// // import { BatchSpanProcessor, SpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
// import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
// import { JaegerPropagator } from "@opentelemetry/propagator-jaeger";
// import { B3InjectEncoding, B3Propagator } from "@opentelemetry/propagator-b3";
// import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
// import { NodeSDK } from "@opentelemetry/sdk-node";
// import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
// import * as process from "process";
//
// const traceExporter = new JaegerExporter({
//   host: "localhost",
//   port: 6831,
//   maxQueueSize: 100,
//   options: {
//     tags: {
//       "service.version": "1.0.0",
//       "service.environment": "production"
//     }
//   }
// });
//
//
// const otelSDK = new NodeSDK({
//   metricInterval: 1000,
//   spanProcessor: new BatchSpanProcessor(new JaegerExporter({
//     endpoint: "http://localhost:14268/api/traces"
//   })),
//   contextManager: new AsyncLocalStorageContextManager(),
//   textMapPropagator: new CompositePropagator({
//     propagators: [
//       new JaegerPropagator(),
//       new W3CTraceContextPropagator(),
//       new W3CBaggagePropagator(),
//       new B3Propagator(),
//       new B3Propagator({
//         injectEncoding: B3InjectEncoding.MULTI_HEADER
//       })
//     ]
//   }),
//   instrumentations: [getNodeAutoInstrumentations()]
// });
//
// export default otelSDK;
//
// // You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// // or on some operating system signal.
// process.on("SIGTERM", () => {
//   otelSDK
//     .shutdown()
//     .then(
//       () => console.log("SDK shut down successfully"),
//       (err) => console.log("Error shutting down SDK", err)
//     )
//     .finally(() => process.exit(0));
// });
