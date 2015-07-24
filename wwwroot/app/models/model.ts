export interface IValue {
	Id: number;
	Value: string;
}

export class Value implements IValue{
	Id: number;
	Value: string;
	
	constructor(value: string, id: number){
		this.Value = value;
		this.Id = id;
	}
}