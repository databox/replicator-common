import { Inject, Injectable, Logger } from "@nestjs/common";
import { RedisClientType } from "redis";
import { IRedisFactory, IRedisProvider } from "../contracts/interfaces";

@Injectable()
export class RedisProvider implements IRedisProvider {
	private readonly client: RedisClientType;

	constructor(
		@Inject(Logger) private readonly logger: Logger,
		@Inject(IRedisFactory) redisFactory: IRedisFactory
	) {
		this.client = redisFactory.getClient();
	}

	async exists(key: string): Promise<boolean> {
		return (await this.client.exists(key)) === 1;
	}

	delete(key: string): Promise<number> {
		return this.client.del(key);
	}

	get(key: string): Promise<string | null> {
		return this.client.get(key);
	}

	getTtl(key: string): Promise<number> {
		return this.client.ttl(key);
	}

	async set(key: string, value: string, ttl?: number): Promise<string | null> {
		const response = await this.client.set(key, value);
		if (ttl) {
			await this.client.expire(key, ttl);
		}
		return response;
	}

	setTtl(key: string, ttl: number): Promise<boolean> {
		return this.client.expire(key, ttl);
	}
}
