import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { KafkaConfig } from "./kafka.config";
import { Kafka, Consumer } from "kafkajs";
import { ACService } from "../ac/ac.service";
import { IRoomConditions } from "../ac/interfaces";

@Injectable()
export class KafkaService {
  private kafka: Kafka
  private consumer: Consumer
  constructor(
    private readonly config: ConfigService<KafkaConfig>,
    private readonly acService: ACService,
  ) {}

  async connectAndSubscribe(): Promise<void> {
    this.kafka = new Kafka({
      clientId: this.config.env.KAFKA_CLIENT_ID,
      brokers: this.config.env.KAFKA_BROKERS,
    })
    this.consumer = this.kafka.consumer({ groupId: this.config.env.KAFKA_GROUP_ID })
    await this.consumer.connect()
    await this.consumer.subscribe({ topics: this.config.env.KAFKA_TOPICS, fromBeginning: true })
    this.consumer.run({
      autoCommit: true,
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        try {
          const content = JSON.parse(message.value.toString())
          // decode base64 to string
          const decoded = Buffer.from(content.payload, 'base64').toString('utf-8')
          const obj: IRoomConditions = JSON.parse(decoded)
          this.acService.setRoomConditions(obj)
        } catch (e) {
          console.error({
            key: message.key.toString(),
            value: message.value.toString(),
            headers: message.headers,
          })
        }
      },
    })
  }
}