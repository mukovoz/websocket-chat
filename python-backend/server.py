import asyncio
import websockets
import json

PORT = 5000

# Here we will save all connections from clients
connections = set()

# Here we will save list of all messages
# TODO: replicate them to Database as well
messages = []

async def on_new_message(message):
    print('New Message Received', message.get('text'))

    messages.append(message)
    message_data = json.dumps([message])
    return message_data


async def handler(websocket):
    connections.add(websocket)
    print("New client connected - {len(connections)}")
    try:
        # Send 10 latest messages to new client
        await websocket.send(json.dumps(messages[-10:]))

        async for message in websocket:
          _message =   await on_new_message(json.loads(message))

          if connections:
                 [await conn.send(_message) for conn in connections]

    except websockets.exceptions.ConnectionClosed as e:
        print(f"Client disconnected: {e}")

    finally:
        connections.remove(websocket)

async def main():
    async with websockets.serve(handler, "localhost", PORT):
        print(f"Server started on port {PORT}")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
