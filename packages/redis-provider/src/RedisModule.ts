import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { IRedisProvider } from "./contracts/interfaces/IRedisProvider";
import { RedisProvider } from "./providers/RedisProvider";
import { IRedisHashProvider } from "./contracts/interfaces/IRedisHashProvider";
import { RedisHashProvider } from "./providers/RedisHashProvider";
import { IRedisSetProvider } from "./contracts/interfaces/IRedisSetProvider";
import { RedisSetProvider } from "./providers/RedisSetProvider";
import { IRedisFactory } from "./contracts/interfaces/IRedisFactory";
import { IConfigProvider } from "config-provider/src/contracts/interfaces/IConfigProvider";
import { RedisFactory } from "./providers/RedisFactory";

@Module({
	providers: [
		{
			provide: IRedisProvider,
			useClass: RedisProvider
		},
		{
			provide: IRedisHashProvider,
			useClass: RedisHashProvider
		},
		{
			provide: IRedisSetProvider,
			useClass: RedisSetProvider
		},
		{
			provide: IRedisFactory,
			inject: [Logger, IConfigProvider],
			useFactory: async (logger: Logger, configProvider: IConfigProvider) => {
				const redisFactory = new RedisFactory(configProvider);
				await redisFactory.connect((err) => {
					logger.error(err);
				});

				return redisFactory;
			}
		},
		Logger
	],
	exports: [IRedisProvider, IRedisFactory, IRedisHashProvider, IRedisSetProvider]
})
export class RedisModule implements OnModuleInit {
	constructor(private moduleRef: ModuleRef) {}

	onModuleInit() {
		const configProvider = this.moduleRef.get<IConfigProvider>(IConfigProvider, { strict: false });
		this.validateConfig(configProvider);
	}
	validateConfig(configProvider: IConfigProvider) {
		configProvider.required(["redis:url"]);
	}
}
