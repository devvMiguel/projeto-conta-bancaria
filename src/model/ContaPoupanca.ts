import { Conta } from "./Conta";

export class ContaPoupanca extends Conta{

    private _aniversary: number;

    constructor(numero: number, agencia: number, tipo: number, titular: string, saldo: number, aniversary: number){
        super(numero, agencia, tipo, titular, saldo);
        this._aniversary = aniversary;
    }

    public get aniversary(){
        return this._aniversary;
    }

    public set aniversary (aniversary: number){
        this._aniversary = aniversary;
    }

    public visualizar(): void{
        super.visualizar();
        console.log(`Dia do aniversário: ${this._aniversary}`);
    }
}