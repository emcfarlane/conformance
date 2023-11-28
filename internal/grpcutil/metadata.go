// Copyright 2023 The Connect Authors
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

package grpcutil

import (
	"context"
	"strings"

	v1 "connectrpc.com/conformance/internal/gen/proto/go/connectrpc/conformance/v1"
	"connectrpc.com/connect"
	"google.golang.org/grpc/metadata"
)

// ConvertMetadataToProtoHeader converts gRPC metadata into proto Headers.
func ConvertMetadataToProtoHeader(
	src metadata.MD,
) []*v1.Header {
	headerInfo := make([]*v1.Header, 0, len(src))
	for key, value := range src {
		if strings.HasSuffix(key, "-bin") {
			// binary headers must be base64-encoded
			for i := range value {
				value[i] = connect.EncodeBinaryHeader([]byte(value[i]))
			}
		}
		hdr := &v1.Header{
			Name:  key,
			Value: value,
		}
		headerInfo = append(headerInfo, hdr)
	}
	return headerInfo
}

// ConvertProtoHeaderToMetadata converts a slice of proto Headers into gRPC metadata.
func ConvertProtoHeaderToMetadata(
	src []*v1.Header,
) metadata.MD {
	asMetadata := make(metadata.MD, len(src))
	for _, hdr := range src {
		key := strings.ToLower(hdr.Name)
		vals := hdr.Value
		if strings.HasSuffix(key, "-bin") {
			// binary headers are base64-encoded in Header proto, but
			// grpc-go library expects them to be unencoded
			vals = make([]string, len(hdr.Value))
			for i := range hdr.Value {
				data, err := connect.DecodeBinaryHeader(hdr.Value[i])
				if err != nil {
					// That's weird... If it's not encoded, then just add the raw value
					vals[i] = hdr.Value[i]
					continue
				}
				vals[i] = string(data)
			}
		}
		asMetadata[key] = vals
	}
	return asMetadata
}

// AppendToOutgoingContext appends the given headers to the outgoing context.
// Used for sending metadata from the client side.
func AppendToOutgoingContext(ctx context.Context, src []*v1.Header) context.Context {
	for _, hdr := range src {
		for _, val := range hdr.Value {
			ctx = metadata.AppendToOutgoingContext(ctx, hdr.Name, val)
		}
	}
	return ctx
}