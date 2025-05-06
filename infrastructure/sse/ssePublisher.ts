type SSEWritable = {
  write: (data: string) => void;
  close: () => void;
};

class SSEPublisher {
  private clients: { userId: string; stream: SSEWritable }[] = [];

  addClient(userId: string, stream: SSEWritable) {
    this.removeClient(userId);
    this.clients.push({ userId, stream });
  }

  removeClient(userId: string) {
    this.clients = this.clients.filter((c) => c.userId !== userId);
  }

  publishToUser<T = unknown>(
    userId: string,
    event: { type: string; payload: T }
  ) {
    const data = `data: ${JSON.stringify(event)}\n\n`;

    this.clients
      .filter((c) => c.userId === userId)
      .forEach((c) => {
        try {
          c.stream.write(data);
        } catch (e) {
          console.error(`SSE 전송 실패: ${userId}`, e);
        }
      });
  }
}

export const ssePublisher = new SSEPublisher();
