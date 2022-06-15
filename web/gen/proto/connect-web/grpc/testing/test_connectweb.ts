// Copyright 2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable */
/* @ts-nocheck */
// @generated by protoc-gen-connect-web v0.0.6 with parameter "target=ts"
// @generated from file grpc/testing/test.proto (package grpc.testing, syntax proto3)
//
// This is copied from gRPC's testing Protobuf definitions: https://github.com/grpc/grpc/blob/master/src/proto/grpc/testing/test.proto
//
// The TestService has been extended to include the following RPCs:
// FailUnaryCall(SimpleRequest) returns (SimpleResponse): this RPC is a unary
// call that always returns a readable non-ASCII error with error details.
// FailStreamingOutputCall(StreamingOutputCallRequest) returns (stream StreamingOutputCallResponse):
// this RPC is a server streaming call that always returns a readable non-ASCII error with error details.
// UnimplementedStreamingOutputCall(grpc.testing.Empty) returns (stream grpc.testing.Empty): this RPC
// is a server streaming call that will not be implemented.
//
// The UnimplementedService has been extended to include the following RPCs:
// UnimplementedStreamingOutputCall(grpc.testing.Empty) returns (stream grpc.testing.Empty): this RPC
// is a server streaming call that will not be implemented.
// Copyright 2015-2016 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// An integration test service that covers all the method signature permutations
// of unary/streaming requests/responses.

import {Empty} from "./empty_pb.js";
import {MethodKind} from "@bufbuild/protobuf";
import {ClientConfigureRequest, ClientConfigureResponse, LoadBalancerAccumulatedStatsRequest, LoadBalancerAccumulatedStatsResponse, LoadBalancerStatsRequest, LoadBalancerStatsResponse, ReconnectInfo, ReconnectParams, SimpleRequest, SimpleResponse, StreamingInputCallRequest, StreamingInputCallResponse, StreamingOutputCallRequest, StreamingOutputCallResponse} from "./messages_pb.js";

/**
 * A simple service to test the various types of RPCs and experiment with
 * performance with various types of payload.
 *
 * @generated from service grpc.testing.TestService
 */
export const TestService = {
  typeName: "grpc.testing.TestService",
  methods: {
    /**
     * One empty request followed by one empty response.
     *
     * @generated from rpc grpc.testing.TestService.EmptyCall
     */
    emptyCall: {
      name: "EmptyCall",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * One request followed by one response.
     *
     * @generated from rpc grpc.testing.TestService.UnaryCall
     */
    unaryCall: {
      name: "UnaryCall",
      I: SimpleRequest,
      O: SimpleResponse,
      kind: MethodKind.Unary,
    },
    /**
     * One request followed by one response. This RPC always fails.
     *
     * @generated from rpc grpc.testing.TestService.FailUnaryCall
     */
    failUnaryCall: {
      name: "FailUnaryCall",
      I: SimpleRequest,
      O: SimpleResponse,
      kind: MethodKind.Unary,
    },
    /**
     * One request followed by one response. Response has cache control
     * headers set such that a caching HTTP proxy (such as GFE) can
     * satisfy subsequent requests.
     *
     * @generated from rpc grpc.testing.TestService.CacheableUnaryCall
     */
    cacheableUnaryCall: {
      name: "CacheableUnaryCall",
      I: SimpleRequest,
      O: SimpleResponse,
      kind: MethodKind.Unary,
    },
    /**
     * One request followed by a sequence of responses (streamed download).
     * The server returns the payload with client desired type and sizes.
     *
     * @generated from rpc grpc.testing.TestService.StreamingOutputCall
     */
    streamingOutputCall: {
      name: "StreamingOutputCall",
      I: StreamingOutputCallRequest,
      O: StreamingOutputCallResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * One request followed by a sequence of responses (streamed download). This RPC always fails.
     *
     * @generated from rpc grpc.testing.TestService.FailStreamingOutputCall
     */
    failStreamingOutputCall: {
      name: "FailStreamingOutputCall",
      I: StreamingOutputCallRequest,
      O: StreamingOutputCallResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * A sequence of requests followed by one response (streamed upload).
     * The server returns the aggregated size of client payload as the result.
     *
     * @generated from rpc grpc.testing.TestService.StreamingInputCall
     */
    streamingInputCall: {
      name: "StreamingInputCall",
      I: StreamingInputCallRequest,
      O: StreamingInputCallResponse,
      kind: MethodKind.ClientStreaming,
    },
    /**
     * A sequence of requests with each request served by the server immediately.
     * As one request could lead to multiple responses, this interface
     * demonstrates the idea of full duplexing.
     *
     * @generated from rpc grpc.testing.TestService.FullDuplexCall
     */
    fullDuplexCall: {
      name: "FullDuplexCall",
      I: StreamingOutputCallRequest,
      O: StreamingOutputCallResponse,
      kind: MethodKind.BiDiStreaming,
    },
    /**
     * A sequence of requests followed by a sequence of responses.
     * The server buffers all the client requests and then serves them in order. A
     * stream of responses are returned to the client when the server starts with
     * first request.
     *
     * @generated from rpc grpc.testing.TestService.HalfDuplexCall
     */
    halfDuplexCall: {
      name: "HalfDuplexCall",
      I: StreamingOutputCallRequest,
      O: StreamingOutputCallResponse,
      kind: MethodKind.BiDiStreaming,
    },
    /**
     * The test server will not implement this method. It will be used
     * to test the behavior when clients call unimplemented methods.
     *
     * @generated from rpc grpc.testing.TestService.UnimplementedCall
     */
    unimplementedCall: {
      name: "UnimplementedCall",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * The test server will not implement this method. It will be used
     * to test the behavior when clients call unimplemented streaming output methods.
     *
     * @generated from rpc grpc.testing.TestService.UnimplementedStreamingOutputCall
     */
    unimplementedStreamingOutputCall: {
      name: "UnimplementedStreamingOutputCall",
      I: Empty,
      O: Empty,
      kind: MethodKind.ServerStreaming,
    },
  }
} as const;

/**
 * A simple service NOT implemented at servers so clients can test for
 * that case.
 *
 * @generated from service grpc.testing.UnimplementedService
 */
export const UnimplementedService = {
  typeName: "grpc.testing.UnimplementedService",
  methods: {
    /**
     * A call that no server should implement
     *
     * @generated from rpc grpc.testing.UnimplementedService.UnimplementedCall
     */
    unimplementedCall: {
      name: "UnimplementedCall",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * A call that no server should implement
     *
     * @generated from rpc grpc.testing.UnimplementedService.UnimplementedStreamingOutputCall
     */
    unimplementedStreamingOutputCall: {
      name: "UnimplementedStreamingOutputCall",
      I: Empty,
      O: Empty,
      kind: MethodKind.ServerStreaming,
    },
  }
} as const;

/**
 * A service used to control reconnect server.
 *
 * @generated from service grpc.testing.ReconnectService
 */
export const ReconnectService = {
  typeName: "grpc.testing.ReconnectService",
  methods: {
    /**
     * @generated from rpc grpc.testing.ReconnectService.Start
     */
    start: {
      name: "Start",
      I: ReconnectParams,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc grpc.testing.ReconnectService.Stop
     */
    stop: {
      name: "Stop",
      I: Empty,
      O: ReconnectInfo,
      kind: MethodKind.Unary,
    },
  }
} as const;

/**
 * A service used to obtain stats for verifying LB behavior.
 *
 * @generated from service grpc.testing.LoadBalancerStatsService
 */
export const LoadBalancerStatsService = {
  typeName: "grpc.testing.LoadBalancerStatsService",
  methods: {
    /**
     * Gets the backend distribution for RPCs sent by a test client.
     *
     * @generated from rpc grpc.testing.LoadBalancerStatsService.GetClientStats
     */
    getClientStats: {
      name: "GetClientStats",
      I: LoadBalancerStatsRequest,
      O: LoadBalancerStatsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets the accumulated stats for RPCs sent by a test client.
     *
     * @generated from rpc grpc.testing.LoadBalancerStatsService.GetClientAccumulatedStats
     */
    getClientAccumulatedStats: {
      name: "GetClientAccumulatedStats",
      I: LoadBalancerAccumulatedStatsRequest,
      O: LoadBalancerAccumulatedStatsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

/**
 * A service to remotely control health status of an xDS test server.
 *
 * @generated from service grpc.testing.XdsUpdateHealthService
 */
export const XdsUpdateHealthService = {
  typeName: "grpc.testing.XdsUpdateHealthService",
  methods: {
    /**
     * @generated from rpc grpc.testing.XdsUpdateHealthService.SetServing
     */
    setServing: {
      name: "SetServing",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc grpc.testing.XdsUpdateHealthService.SetNotServing
     */
    setNotServing: {
      name: "SetNotServing",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

/**
 * A service to dynamically update the configuration of an xDS test client.
 *
 * @generated from service grpc.testing.XdsUpdateClientConfigureService
 */
export const XdsUpdateClientConfigureService = {
  typeName: "grpc.testing.XdsUpdateClientConfigureService",
  methods: {
    /**
     * Update the tes client's configuration.
     *
     * @generated from rpc grpc.testing.XdsUpdateClientConfigureService.Configure
     */
    configure: {
      name: "Configure",
      I: ClientConfigureRequest,
      O: ClientConfigureResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

