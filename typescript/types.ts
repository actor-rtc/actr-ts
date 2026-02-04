// Re-export napi-rs generated types
import {
  ActrId,
  ActrType,
  Realm,
  PayloadType,
  DataStream,
  MetadataEntry,
  ContextBridge as NativeContextBridge,
  RpcEnvelopeBridge,
} from '../index';

export {
  ActrId,
  ActrType,
  Realm,
  PayloadType,
  DataStream,
  MetadataEntry,
  RpcEnvelopeBridge,
};

/**
 * Enhanced ContextBridge with helper methods.
 */
export interface ContextBridge extends NativeContextBridge {
  /**
   * Call a remote actor with default options (RpcReliable, 30s timeout).
   *
   * @param target - Target actor ID
   * @param routeKey - RPC route key
   * @param payload - Request payload (protobuf-encoded Buffer)
   * @returns Response payload (protobuf-encoded Buffer)
   */
  call(target: ActrId, routeKey: string, payload: Buffer): Promise<Buffer>;

  /**
   * Get the current RPC call ID.
   */
  callId(): ActrId | null;
}

