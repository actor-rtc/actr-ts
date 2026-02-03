---
name: actr-ts-codegen
description: Generate TypeScript/JavaScript files under examples/**/generated from Actr.toml/Actr.lock.toml and .proto sources using TypeScript-based protobuf tooling. Use when asked to regenerate echo-client generated code, update route keys, or recompile protobuf outputs without Actr CLI.
---

# Actr TS Codegen

## Goal
Generate the `generated` directory for actr-ts examples using TypeScript-friendly protobuf tooling (no Actr CLI), including protobuf codecs, client route helpers, and local actor forwarding glue.

## Prerequisites
Install the generator dependencies in the repo when you run the script:

- `npm install -D protobufjs @iarna/toml`

## Inputs
- `Actr.toml` (required)
- `Actr.lock.toml` (optional but preferred)
- `.proto` files under `protos/remote/` (default) or `--proto-root`

## Outputs
- `<package>.pb.ts` / `<package>.pb.js` — protobuf codecs
- `<package>.client.ts` / `<package>.client.js` — route key constants and encode/decode helpers
- `local.actor.ts` / `local.actor.js` — forwarding logic for local actor

See `references/output-spec.md` for naming rules and content expectations.

## Workflow
1. Locate `Actr.toml` for the example.
2. Ensure `.proto` files are available under `protos/remote/` (or pass `--proto-root`).
3. Run the generator script.
4. Confirm `generated/` contains `.ts` and `.js` outputs.

## Script
Use the bundled script and pass the example config:

```bash
node skills/actr-ts-codegen/scripts/generate-generated.js --config examples/echo-client/Actr.toml
```

Optional flags:
- `--out <dir>`: Override output directory (default: `<config-dir>/generated`)
- `--proto-root <dir>`: Override proto root (default: `<config-dir>/protos/remote`)
- `--lock <file>`: Override lock file path (default: `<config-dir>/Actr.lock.toml`)
- `--dist-import <path>`: Override import path used in `local.actor.*`

## Conventions
- Route keys are emitted as `<package>.<service>.<method>`.
- `local.actor.*` uses `actr_type` from `Actr.lock.toml` or `Actr.toml` dependencies.
- Single-field request messages generate `encode<MsgName>(value)` convenience helpers.

## Limitations
- If `Actr.lock.toml` is missing, the script scans all `.proto` files in `--proto-root` and may require `actr_type` matches by service name.
- Unsupported proto field types or complex options should be added to the generator if needed.

