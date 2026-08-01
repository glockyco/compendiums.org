from __future__ import annotations

import errno
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "127.0.0.1"
START_PORT = int(os.environ.get("PORT", "4173"))
PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"

handler = partial(SimpleHTTPRequestHandler, directory=PUBLIC_DIR)
server: ThreadingHTTPServer | None = None

for port in range(START_PORT, START_PORT + 100):
    try:
        server = ThreadingHTTPServer((HOST, port), handler)
        break
    except OSError as error:
        if error.errno != errno.EADDRINUSE:
            raise

if server is None:
    raise SystemExit(f"No available port found from {START_PORT} through {START_PORT + 99}")

host, port = server.server_address
print(f"Serving {PUBLIC_DIR} at http://{host}:{port}")

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
