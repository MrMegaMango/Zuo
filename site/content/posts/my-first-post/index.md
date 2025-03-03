+++
date = '2025-02-25T22:05:54Z'
draft = false
title = 'How we speed up 80% of Samaya AI and saved millions of $$$'
description = "What a journey it has been! In this post, I’ll walk you through how we transformed Samaya AI by boosting its performance by 80% and saving millions of dollars along the way."
tags = ["AI infra"]
categories = ["blog"]
ShowToc = true
TocOpen = true
[cover]
image = "final-architecture.png"
alt = "Final Architecture Overview"
caption = "Our Optimized Architecture"
relative = true
+++

We began by taking a hard look at our existing system. My predecessor set up some Amplitude metrics. Our simple QA takes about 2 minutes to finish.
Though Amplitude is good for product/user analytics, it's now powerful enough for profiling. After building some latency breakdown and p99 graphs, I start to worry that the push model of Amplitude python client would introduce more latency, and I need to do more in time series graphs like calculations, so I bring in Prometheus and Grafana to our infra, under a monitoring namespace in k8s for both prod and staging clusters.

![Initial Setup](initial-setup.png)

Our baseline metrics showed significant room for improvement:
![Baseline Metrics](baseline-metrics.png)

## Identifying Bottlenecks

Our analysis revealed several critical bottlenecks:
![Bottleneck Analysis](bottleneck-analysis.png)

## Performance Optimization Journey

### Phase 1: TensorRT
I used Nvidia's TensorRT to convert our model in vLLM to be more performant.
![First Optimization Phase](optimization-1.png)

Key metrics we tracked:
- Problematic concurrent network calls: ![Trace Errors](trace-errors.png)
- CPU Utilization: ![CPU Usage](cpu-utilization.png)
- Network Latency: ![Network Performance](network-latency.png)

### Phase 2: Caching and Distribution
I found that the redis cache calls were taking 500ms.
Suspect the latency come from poor network call concurrency from Python.
![Second Optimization Phase](optimization-2.png)

Improvements in cache performance:
![Cache Hit Rates](cache-hits.png)

### Monitoring and Observability

I implemented opentelemetry traces and metrics. I use Tempo, Prometheus, and Grafana to visualize:
![Monitoring Dashboard](side-by-side.png)

Distributed tracing helped identify bottlenecks:
![Distributed Tracing](distributed-tracing.png)

Error rates dropped significantly:
![Error Rates](trace-storage.png)

## Results and Impact

### Performance Improvements
![Before vs After](before-after.png)

### Cost Savings
![Cost Analysis](cost-savings.png)

System throughput increased dramatically:
![Throughput Metrics](throughput.png)

## Comparison with Industry Standards
![Industry Comparison](comparison.png)

## Future Roadmap
![Future Plans](future-roadmap.png)

## Monitoring Setup
Our current monitoring configuration:
![Alerts Setup](alerts-setup.png)
