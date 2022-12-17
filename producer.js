import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'notifications',
    brokers: ['ace-pipefish-5389-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'YWNlLXBpcGVmaXNoLTUzODkkZGtuPohAnsto3iDM5bTqL7PBHwETCI1o0lxrJOE',
      password: 'CPyfUGQiRjRUfHzw3cL2odMdHFgDN7G6tDtIh6er-mTVHBPA71En9fS2Hd68bEoKPKUsPw==',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID()
        })
      }
    ]
  });

  await producer.disconnect();
};

bootstrap();
