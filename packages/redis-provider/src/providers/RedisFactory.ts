import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";
import { IRedisFactory } from "../contracts/interfaces/IRedisFactory";
// TODO research how to use config-provider as package here?
import { IConfigProvider } from "config-provider/src/contracts/interfaces/IConfigProvider";
import { RedisConfig } from "../models/RedisConfig";

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
