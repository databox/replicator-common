import { Inject, Injectable, Logger } from "@nestjs/common";
import { RedisClientType } from "redis";
import { IRedisSetProvider, IRedisFactory } from "../contracts/interfaces";

@Injectable()
export class RedisSetProvider implements IRedisSetProvider {
	private readonly client: RedisClientType;

	constructor(
		@Inject(Logger) private readonly logger: Logger,
		@Inject(IRedisFactory) redisFactory: IRedisFactory
	) {
		this.client = redisFactory.getClient();
	}

	add(setName: string, key: string): Promise<number> {
		return this.client.sAdd(setName, key);
	}
	remove(setName: string, key: string): Promise<number> {
		return this.client.sRem(setName, key);
	}

	exists(hashName: string, key: string): Promise<boolean> {
		return this.client.sIsMember(hashName, key);
	}

	getAll(hashName: string): Promise<string[]> {
		return this.client.sMembers(hashName);
	}
}
