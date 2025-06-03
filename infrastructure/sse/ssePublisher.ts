type Client = {
  write: (data: string) => void;
  close: () => void;
};

class SSEPublisher {
  private clients = new Map<string, Client>();
  id = Math.random();

  addClient(userId: string, client: Client) {
    this.clients.set(userId, client);
  }

  removeClient(userId: string) {
    this.clients.delete(userId);
  }

  publishToUser(userId: string, message: object) {
    const client = this.clients.get(userId);

    if (!client) {
      return;
    }

    const data = `data: ${JSON.stringify(message)}\n\n`;
    client.write(data);
  }

  getConnectedUserIds() {
    return Array.from(this.clients.keys());
  }
}

const globalForSSE = globalThis as unknown as {
  ssePublisher?: SSEPublisher;
};

export const ssePublisher = (globalForSSE.ssePublisher ??= new SSEPublisher());
