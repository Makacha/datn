import socketserver


class SocketHandler(socketserver.BaseRequestHandler):
    def handle(self):
        self.data = self.request.recv(1024).strip()
        print("{} wrote:".format(self.client_address[0]))
        print(self.data)
        self.request.sendall(self.data.upper())


class Socket(socketserver.BaseServer):
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server = socketserver.TCPServer((self.host, self.port), SocketHandler)

    def start(self):
        self.server.serve_forever()


socket = Socket("localhost", 9999)

socket.start()
