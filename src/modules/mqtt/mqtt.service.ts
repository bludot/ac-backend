import { Injectable } from '@nestjs/common'
import * as mqtt from 'mqtt'
import { uuid } from 'uuidv4'
import { ConfigService } from '../config/config.service'
import { MQTTConfig } from './mqtt.config'

@Injectable()
export class MQTTService {
  private client: mqtt.MqttClient
  constructor(private readonly config: ConfigService<MQTTConfig>) {}

  connect(): void {
    this.client = mqtt.connect(
      `mqtt://${this.config.env.MQTT_HOST}:${this.config.env.MQTT_PORT}`,
      {
        username: this.config.env.MQTT_USERNAME,
        password: this.config.env.MQTT_PASSWORD,
      },
    )
    this.client.on('connect', () => {
      console.log('connected')
    })
    this.client.on('error', (error) => {
      console.log('client', error) // never fires
    })
    this.heartbeat()
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message)
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic)
  }

  // heartbeat send uuid and wait for response
  heartbeat(): void {
    // settimeout 30 seconds
    setInterval(() => {
      this.client.publish(this.config.env.HeartBeatTopic, uuid())
    }, 5000)
  }
}
