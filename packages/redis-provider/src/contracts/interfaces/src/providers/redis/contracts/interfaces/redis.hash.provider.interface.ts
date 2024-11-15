export interface IRedisHashProvider {
	set(hashName: string, key: string, value: string): Promise<number>;
	get(hashName: string, key: string): Promise<string | undefined>;
	delete(hashName: string, key: string): Promise<number>;
	getAll(hashName: string): Promise<Record<string, string>>;
	exists(hashName: string, key: string): Promise<boolean>;
}

export const IRedisHashProvider = Symbol("IRedisHashProvider");
