export interface IRedisProvider {
	set(key: string, value: string, ttl?: number): Promise<string | null>;
	get(key: string): Promise<string | null>;
	delete(key: string): Promise<number>;
	exists(key: string): Promise<boolean>;
	setTtl(key: string, ttl: number): Promise<boolean>;
	getTtl(key: string): Promise<number>;
}

export const IRedisProvider = Symbol("IRedisProvider");
