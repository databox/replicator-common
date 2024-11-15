import { Inject, Injectable, Logger } from "@nestjs/common";
import { RedisClientType } from "redis";
import { IRedisFactory, IRedisHashProvider } from "../contracts/interfaces";

@Injectable()
export class RedisHashProvider implements IRedisHashProvider {
	private readonly client: RedisClientType;

	constructor(
		@Inject(Logger) private readonly logger: Logger,
		@Inject(IRedisFactory) redisFactory: IRedisFactory
	) {
		this.client = redisFactory.getClient();
	}

	exists(hashName: string, key: string): Promise<boolean> {
		return this.client.hExists(hashName, key);
	}

	delete(hashName: string, key: string): Promise<number> {
		return this.client.hDel(hashName, key);
	}

	getAll(hashName: string): Promise<Record<string, string>> {
		return this.client.hGetAll(hashName);
	}

	set(hashName: string, key: string, value: string): Promise<number> {
		return this.client.hSet(hashName, key, value);
	}

	get(hashName: string, key: string): Promise<string | undefined> {
		return this.client.hGet(hashName, key);
	}
}
