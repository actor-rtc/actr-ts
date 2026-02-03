use actr_config::ObservabilityConfig;

/// Initialize logging and observability (tracing; OpenTelemetry when enabled).
pub fn init_observability(config: ObservabilityConfig) {
  use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

  let filter = tracing_subscriber::EnvFilter::try_from_default_env()
    .unwrap_or_else(|_| {
      tracing_subscriber::EnvFilter::new(&config.filter_level)
    });

  let fmt_layer = tracing_subscriber::fmt::layer()
    .with_target(true)
    .with_thread_ids(true);

  let registry = tracing_subscriber::registry()
    .with(filter)
    .with(fmt_layer);

  if config.tracing_enabled {
    // TODO: Configure OpenTelemetry OTLP exporter and add tracing_opentelemetry layer to registry.
    // Example: opentelemetry_otlp::new_pipeline().tracing().with_exporter(...).install_batch(...);
    // Then: registry.with(tracing_opentelemetry::layer().with_tracer(tracer)).init();
  }

  registry.init();
}
