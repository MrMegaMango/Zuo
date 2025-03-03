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
image = "slowest-query.png"
alt = "Slowest query of the day"
caption = "Our production query, sort by slowness"
relative = true
+++

Samaya AI builds a question answering platform using document retrieval to avoid hallucination. At the start of this work, our basic question answering chatbot takes about 2 minutes to finish processing.

We began by taking a hard look at our existing system. My predecessor set up some Amplitude metrics. 
Though Amplitude is good for product/user analytics, it's not powerful enough for profiling. After building some latency breakdown and p99 graphs, I start to worry that the push model of Amplitude python client would introduce more latency, and I wanted more functionalities in these time series graphs like doing arithmetic calculations between two signals. So I bring in self hosted Prometheus and Grafana to our infra, under a monitoring namespace in k8s for both prod and staging clusters.
![Amplitude dashboard](initial-setup.png)

## Identifying Bottlenecks

Our analysis revealed several major latency contributors:
Query understanding, document retrieval, and summarization.

## Performance Optimization Journey

## TensorRT
I used Nvidia's TensorRT to convert our model in vLLM to be more performant.
![First Optimization Phase](optimization-1.png)

- Problematic concurrent network calls: ![Trace Errors](trace-errors.png)
- Unreliable endpoints: ![CPU Usage](cpu-utilization.png)
- Side by side comparison: ![Network Performance](network-latency.png)

## Caching 
I found that the redis cache calls were taking 500ms.
Suspect the latency come from poor network call concurrency from Python.
![Second Optimization Phase](optimization-2.png)

database calls:
![Cache Hit Rates](cache-hits.png)

This heatmap shows two hot zones for the simple getting encryption key operation, one near 16.8ms, the other near 537ms:
![Fetch Encryption Key](encryption-heatmap.png)
Similarly, key validation function could take way longer than it should.
![Bottleneck Analysis](key-validation.png)

## Parallelization 
I found many places where we are doing sequential operation where it could be running in parallel, like bm25 elastic search sparse retrieval vs pinecone vector dense retrieval, or text generation vs table generation. These parallelization cut some of the major latency factors in half. 

### Monitoring and Observability

Metrics gave a view of a broad sense of how system is doing, but I needed something finer to see the devil in the details. I implemented opentelemetry traces. I use Prometheus, Tempo, and Grafana to visualize. I like open source tools and am able to ask questions to the community and contribute.

We use Tilt to spin up k8s locally. Application log vs execution trace side by side:
![Monitoring Dashboard](side-by-side.png)

Distributed tracing helped identify bottlenecks:
![Distributed Tracing](distributed-tracing.png)

Error rates dropped significantly:
![Error Rates](trace-storage.png)
I needed sampling and retention to reduce the Terrabytes of data used in traces.

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
