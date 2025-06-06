import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if(buscaConta != null){
            buscaConta.visualizar();
        }else{
            console.log(colors.fg.red + "\nA Conta numero: " + numero
                        + " não foi encontrada!",colors.reset);
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(`\nA conta número: ${conta.numero} foi criada com sucesso!`);
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if(buscaConta != null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log("\nA Conta numero: "+ conta.numero +
                    " foi atualizada com sucesso!");
        }else{
            console.log(colors.fg.red, "\nA Conta numero: "+ conta.numero +
                    " não foi encontrada!"+ colors.reset);
        }
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if(buscaConta != null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(`\nA Conta numero: ${numero} foi apagada com sucesso!`);
        }else {
            console.log(colors.fg.red,"\nA Conta numero: "+numero+
                    " não foi encontrada!" + colors.reset);
        }
    }

    sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if(conta !== null){

            if (conta.sacar(valor) === true){
                console.log("\nO Saque na Conta numero: " + numero +
                            " foi efetuado com sucesso!");
            }
        }
        else {
            console.log(colors.fg.red +"\nA Conta numero: "+numero+
                        " não foi encontrada!" + colors.reset);

        }
    }

    depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if(conta !== null){
            conta.depositar(valor)
            console.log("\nO Depósito na Conta numero: " + numero +
                        " foi efetuado com sucesso!");
            
        }
        else {
            console.log(colors.fg.red +"\nA Conta numero: "+numero+
                        " não foi encontrada ou a Conta destino não é uma conta corrente!" +
                        colors.reset);

        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem !== null && contaDestino !== null) {
            if(contaOrigem.sacar(valor) === true){
                contaDestino.depositar(valor);
                console.log("\nA Transferência da Conta numero: "+numeroOrigem+
                            " para a conta numero: "+numeroDestino+" foi efetuada com sucesso!");
            }
        }
        else{
            console.log(colors.fg.red+"\n A Conta numero: "+numeroOrigem+
                        " e/ou a Conta numero: "+numeroDestino+" não foram encontradas!"+
                        colors.reset);
        }
    }

    //Gerar número da Conta
    public gerarNumero(): number {
        return ++ this.numero;
    }

    //Checa se a Conta Existe
    public buscarNoArray(numero: number): Conta | null {

        for (let conta of this.listaContas){
            if (conta.numero === numero){
                return conta;
            }
        }
        return null;
    }

}