import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { IRedisFactory, IRedisHashProvider, IRedisProvider, IRedisSetProvider } from "./contracts/interfaces";
import { RedisFactory, RedisHashProvider, RedisProvider, RedisSetProvider } from "./providers";
import { IConfigProvider } from "config-provider/src/contracts/interfaces/IConfigProvider";

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
