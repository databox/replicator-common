import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";
import { IConfigProvider } from "../../ConfigProvider/Contracts/Interfaces/ConfigProvider.interface";
import { IRedisFactory } from "../contracts/interfaces/src/providers/redis/contracts/interfaces/redis.factory.interface";
import { RedisConfig } from "../models/redis.config.model";

@Injectable()
export class RedisFactory implements IRedisFactory {
	private readonly client: RedisClientType;

	constructor(configProvider: IConfigProvider) {
		const config = configProvider.getOrThrow<RedisConfig>("redis");

		this.client = createClient({ url: config.url });
	}

	async connect(onError?: (err: string) => void) {
		if (typeof onError !== "undefined") {
			this.client.on("error", onError);
		}

		await this.client.connect();
	}

	getClient(): RedisClientType {
		return this.client;
	}
}
