export interface IValue {
	Id: number;
	SomeText: string;
}

export class Value implements IValue{
	Id: number;
	SomeText: string;
	
	constructor(value: string, id: number){
		this.SomeText = value;
		this.Id = id;
	}
}