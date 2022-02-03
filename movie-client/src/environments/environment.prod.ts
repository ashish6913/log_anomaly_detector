import { DiagLogLevel } from "@opentelemetry/api";

export const environment = {
  production: true,
  opentelemetryConfig: {
    commonConfig: {
      console: true, //(boolean) Display trace on console
      production: false, //(boolean) Send trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      logBody: true, //(boolean) true add body in a log, nothing otherwise
      serviceName: 'frontend', //Service name send in trace
      probabilitySampler: '1', //Samples a configurable percentage of traces, string value between '0' to '1'
      logLevel:DiagLogLevel.ALL //(Enum) DiagLogLevel is an Enum from @opentelemetry/api
    },
    batchSpanProcessorConfig: { //Only if production = true in commonConfig
      maxQueueSize: '2048', // The maximum queue size. After the size is reached spans are dropped.
      maxExportBatchSize: '512', // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
      scheduledDelayMillis: '5000', // The interval between two consecutive exports
      exportTimeoutMillis: '30000', // How long the export can run before it is cancelled
    },
    otelcolConfig: {
     // url: 'http://otel2-collector-headless:4318/v1/traces'
    //  url: '10.131.0.59:4318'
      // url: '172.30.22.104:4317/v1/traces', //URL of opentelemetry collector
      
    },
    jaegerPropagatorConfig: {
      customHeader: 'custom-header',
    }
  }
};
