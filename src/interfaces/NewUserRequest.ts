export interface NewUserRequest {
    firstName: string,
	lastName: string,
	email: string,
	age: number,
	password: string,
	roles: number[]
}