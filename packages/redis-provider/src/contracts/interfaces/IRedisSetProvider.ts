export interface IRedisSetProvider {
	add(setName: string, key: string): Promise<number>;
	remove(setName: string, key: string): Promise<number>;
	getAll(setName: string): Promise<string[]>;
	exists(setName: string, key: string): Promise<boolean>;
}

export const IRedisSetProvider = Symbol("IRedisSetProvider");
