import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { IConfigProvider } from "../../ConfigProvider/Contracts/Interfaces/ConfigProvider.interface";
import { IRedisFactory } from "./contracts/interfaces/src/providers/redis/contracts/interfaces/redis.factory.interface";
import { IRedisHashProvider } from "./contracts/interfaces/src/providers/redis/contracts/interfaces/redis.hash.provider.interface";
import { IRedisProvider } from "./contracts/interfaces/src/providers/redis/contracts/interfaces/redis.provider.interface";
import { IRedisSetProvider } from "./contracts/interfaces/src/providers/redis/contracts/interfaces/redis.set.provider.interface";
import { RedisFactory } from "./providers/redis.factory";
import { RedisHashProvider } from "./providers/redis.hash.provider";
import { RedisProvider } from "./providers/redis.provider";
import { RedisSetProvider } from "./providers/redis.set.provider";

@Module({
	providers: [
		{
			provide: IRedisProvider,
			useClass: RedisProvider,
		},
		{
			provide: IRedisHashProvider,
			useClass: RedisHashProvider,
		},
		{
			provide: IRedisSetProvider,
			useClass: RedisSetProvider,
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
			},
		},
		Logger,
	],
	exports: [IRedisProvider, IRedisFactory, IRedisHashProvider, IRedisSetProvider],
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
