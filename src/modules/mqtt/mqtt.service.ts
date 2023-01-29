import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { MQTTConfig } from './mqtt.config';
import * as mqtt from 'mqtt';

@Injectable()
export class MQTTService {
  private client: mqtt.MqttClient;
  constructor(private readonly config: ConfigService<MQTTConfig>) {}

  connect(): void {
    this.client = mqtt.connect(`mqtt://${this.config.env.MQTT_HOST}:${this.config.env.MQTT_PORT}`, {
      username: this.config.env.MQTT_USERNAME,
      password: this.config.env.MQTT_PASSWORD,
    });
    this.client.on('connect', () => {
      console.log('connected');
    });
    this.client.on('error', (error) => {
      console.log('client', error); // never fires
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic);
  }

}
