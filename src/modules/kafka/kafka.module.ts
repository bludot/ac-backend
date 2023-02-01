import { ConfigModule } from "../config/config.module";
import { Module } from "@nestjs/common";
import { KafkaConfig } from "./kafka.config";
import { ConfigService } from "../config/config.service";
import { KafkaService } from "./kafka.service";
import { ACModule } from "../ac/ac.module";
import { ACService } from "../ac/ac.service";

const KafkaFactory = {
  provide: "KAFKA",
  imports: [ConfigModule.register(KafkaConfig), ACModule],
  useFactory: async (optionsProvider: ConfigService<KafkaConfig>, acService: ACService) => {
    const kafkaService = new KafkaService(optionsProvider, acService);
    await kafkaService.connectAndSubscribe();
    return kafkaService;
  },
  inject: [ConfigService, ACService],
}

@Module({
  imports: [ConfigModule.register(KafkaConfig), ACModule],
  providers: [KafkaFactory],
  exports: ['KAFKA'],
})

export class KafkaModule {}