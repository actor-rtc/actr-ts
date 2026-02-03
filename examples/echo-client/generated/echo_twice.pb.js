"use strict";
// DO NOT EDIT.
// Generated from protos/remote/echo-echo-server/echo.proto, protos/remote/echo-twice-server/echo-twice.proto
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoTwice_EchoTwiceRequest = exports.EchoTwice_EchoTwiceResponse = void 0;

const EchoTwice_EchoTwiceRequest = {
  encode(message) {
    const parts = [];

    if (message.message !== undefined && message.message !== null) {
      const tag = 10;
      const message_messageBytes = Buffer.from(message.message, 'utf8');
      parts.push(encodeVarint(tag));
      parts.push(encodeVarint(message_messageBytes.length));
      parts.push(message_messageBytes);
    }

    return Buffer.concat(parts);
  },

  decode(buffer) {
    let offset = 0;
    let message = '';

    while (offset < buffer.length) {
      const tagResult = decodeVarint(buffer, offset);
      const tag = Number(tagResult.value);
      offset += tagResult.length;

      const fieldNumber = tag >> 3;
      const wireType = tag & 0x07;

      if (wireType === 2) {
        const lengthResult = decodeVarint(buffer, offset);
        const length = varintToNumber(lengthResult.value, "length");
        offset += lengthResult.length;

        const end = offset + length;
        const value = buffer.subarray(offset, end);
        offset = end;

        switch (fieldNumber) {
          case 1:
            message = value.toString('utf8');
            break;
          default:
            break;
        }
        continue;
      }

      throw new Error(`Unsupported wire type: ${wireType}`);
    }

    return {
      message,
    };
  },
};

exports.EchoTwice_EchoTwiceRequest = EchoTwice_EchoTwiceRequest;

const EchoTwice_EchoTwiceResponse = {
  encode(message) {
    const parts = [];

    if (message.reply !== undefined && message.reply !== null) {
      const tag = 10;
      const message_replyBytes = Buffer.from(message.reply, 'utf8');
      parts.push(encodeVarint(tag));
      parts.push(encodeVarint(message_replyBytes.length));
      parts.push(message_replyBytes);
    }

    if (message.timestamp !== undefined && message.timestamp !== null) {
      const tag = 16;
      parts.push(encodeVarint(tag));
      parts.push(encodeVarintBigint(message.timestamp));
    }

    return Buffer.concat(parts);
  },

  decode(buffer) {
    let offset = 0;
    let reply = '';
    let timestamp = 0n;

    while (offset < buffer.length) {
      const tagResult = decodeVarint(buffer, offset);
      const tag = Number(tagResult.value);
      offset += tagResult.length;

      const fieldNumber = tag >> 3;
      const wireType = tag & 0x07;

      if (wireType === 2) {
        const lengthResult = decodeVarint(buffer, offset);
        const length = varintToNumber(lengthResult.value, "length");
        offset += lengthResult.length;

        const end = offset + length;
        const value = buffer.subarray(offset, end);
        offset = end;

        switch (fieldNumber) {
          case 1:
            reply = value.toString('utf8');
            break;
          default:
            break;
        }
        continue;
      }

      if (wireType === 0) {
        const valueResult = decodeVarint(buffer, offset);
        offset += valueResult.length;

        switch (fieldNumber) {
          case 2:
            timestamp = valueResult.value;
            break;
          default:
            break;
        }
        continue;
      }

      throw new Error(`Unsupported wire type: ${wireType}`);
    }

    return {
      reply,
      timestamp,
    };
  },
};

exports.EchoTwice_EchoTwiceResponse = EchoTwice_EchoTwiceResponse;

function encodeVarint(value) {
  let v = value >>> 0;
  const bytes = [];
  while (v >= 0x80) {
    bytes.push((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  bytes.push(v);
  return Buffer.from(bytes);
}

function encodeVarintBigint(value) {
  let v = BigInt(value);
  const bytes = [];
  while (v >= 0x80n) {
    bytes.push(Number((v & 0x7fn) | 0x80n));
    v >>= 7n;
  }
  bytes.push(Number(v));
  return Buffer.from(bytes);
}

function decodeVarint(buffer, offset) {
  let result = 0n;
  let shift = 0n;
  let i = 0;
  while (offset + i < buffer.length) {
    const byte = BigInt(buffer[offset + i]);
    result |= (byte & 0x7fn) << shift;
    i += 1;
    if ((byte & 0x80n) === 0n) {
      return { value: result, length: i };
    }
    shift += 7n;
  }
  throw new Error('Invalid varint: buffer ended unexpectedly');
}

function varintToNumber(value, label) {
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(`Varint ${label} exceeds safe integer range`);
  }
  return Number(value);
}

function encodeZigZag32(value) {
  return (value << 1) ^ (value >> 31);
}

function encodeZigZag64(value) {
  const v = BigInt(value);
  return (v << 1n) ^ (v >> 63n);
}

function decodeZigZag32(value) {
  return (value >>> 1) ^ -(value & 1);
}

function decodeZigZag64(value) {
  return (value >> 1n) ^ (-(value & 1n));
}

function encodeFixed32(value) {
  const buf = Buffer.alloc(4);
  buf.writeUInt32LE(value >>> 0, 0);
  return buf;
}

function encodeFixed64(value) {
  const buf = Buffer.alloc(8);
  const v = BigInt(value);
  buf.writeBigUInt64LE(v, 0);
  return buf;
}

function encodeFloat32(value) {
  const buf = Buffer.alloc(4);
  buf.writeFloatLE(value, 0);
  return buf;
}

function encodeFloat64(value) {
  const buf = Buffer.alloc(8);
  buf.writeDoubleLE(value, 0);
  return buf;
}

function readFixed32(buffer) {
  return buffer.readUInt32LE(0);
}

function readFixed64(buffer) {
  return buffer.readBigUInt64LE(0);
}

function readFloat32(buffer) {
  return buffer.readFloatLE(0);
}

function readFloat64(buffer) {
  return buffer.readDoubleLE(0);
}