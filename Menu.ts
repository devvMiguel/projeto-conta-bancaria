import read from 'readline-sync'
import { colors } from './src/util/Colors';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from './src/controller/ContaController';

export function main (){

    let contas: ContaController = new ContaController();

    let option, numero, agencia, tipo, saldo, limite, aniversary, valor, numeroDestino: number;
    let titular: string;
    const tiposContas = ["Conta Corrente", "Conta Poupanca"];

    console.log("\nCriar Contas\n");

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();

    while (true){

        // keyPress()
        // console.clear();
        console.log(colors.fg.greenstrong +
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");

        console.log("Entre com a opção desejada: ",colors.reset);
        option = read.questionInt("");

        if(option === 9){
            console.log(colors.fg.yellow,
                "\nBanco do Brazil com Z - O seu futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0)
        }

        console.log(colors.fg.whitestrong,"");
        switch (option){
            case 1:
                console.log("\n\nCriar Conta\n\n");

                console.log("Digite o Número da Agência: ");
                agencia = read.questionInt("");

                console.log("Digite o Nome do Titular da conta: ");
                titular = read.question("");

                console.log("\nDigite o Digite o tipo da Conta: ");
                tipo = read.keyInSelect(tiposContas, "", {cancel: false}) + 1;

                console.log("Digite o Saldo da Conta (R$: ");
                saldo = read.questionFloat("");

                switch(tipo){
                    case 1:
                        console.log("Digite o Limite da Conta (R$): ");
                        limite = read.questionFloat("");
                        contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia,
                                        tipo, titular,saldo, limite));
                        break;
                    case 2:
                        console.log("Digite o Dia do aniversário da Conta Poupança: ");
                        aniversary = read.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia,
                                        tipo, titular, saldo, aniversary));
                        break;
                }

                keyPress();
                break;
            case 2:
                console.log("\n\nListar todas as Contas\n\n");

                contas.listarTodas();

                keyPress();
                break;
            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n");

                console.log("Digite o número da Conta: ");
                numero = read.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress();
                break;
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n");

                console.log("Digite o número da Conta: ");
                numero = read.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if (conta != null){
            
                    console.log("\n\nCriar Conta\n\n");

                    console.log("Digite o Número da Agência: ");
                    agencia = read.questionInt("");

                    console.log("Digite o Nome do Titular da conta: ");
                    titular = read.question("");

                    tipo = conta.tipo;

                    console.log("Digite o Saldo da Conta (R$:) ");
                    saldo = read.questionFloat("");

                    switch(tipo){
                        case 1:
                            console.log("Digite o Limite de Crédito (R$): ");
                            limite = read.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular,saldo, limite));
                            break;
                        case 2:
                            console.log("Digite o Dia do aniversário da Conta Poupança: ");
                            aniversary = read.questionInt("");
                            contas.atualizar(
                                new ContaPoupanca(numero, agencia,tipo, titular, saldo, aniversary));
                            break;
                    }
                }else{
                    console.log(colors.fg.red + "\nA Conta numero: "+numero+
                        "não foi encontrada!" +colors.reset);
                }

                keyPress();
                break;
            case 5:
                console.log("\n\nApagar uma Conta\n\n");

                console.log("Digite  o número da Conta: ");
                numero = read.questionInt("");
                contas.deletar(numero);

                keyPress();
                break;
            case 6:
                console.log("\n\nSaque\n\n");

                console.log("Digite o número da Conta: ");
                numero = read.questionInt("");

                console.log("Digite o valor do Saque (R$): ");
                valor = read.questionInt("");

                contas.sacar(numero, valor);

                keyPress();
                break;
            case 7:
                console.log("\n\nDepósito\n\n");

                console.log("Digite o número da Conta: ");
                numero = read.questionInt("");

                console.log("Digite o valor do Depósito (R$): ");
                valor = read.questionInt("");

                contas.depositar(numero, valor);

                keyPress();
                break;
            case 8:
                console.log("\n\nTransferência entre Contas\n\n");

                console.log("Digite o número da Conta de Origem: ");
                numero = read.questionInt("");

                console.log("Digite o número da Conta de Destino: ");
                numeroDestino = read.questionInt("");

                console.log("Digite o valor do Depósito (R$): ");
                valor = read.questionFloat("");

                contas.transferir(numero, numeroDestino, valor);

                keyPress();
                break;
            default:
                console.log("\nOpção Inválida!");

                keyPress();
                break;
        }

        console.log(colors.reset, "");
    }
    
}

function sobre(): void{
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Miguel Ferreira");
    console.log("Generation Brasil - miguelgalvao_galvao@hotmail.com");
    console.log("github.com/devvMiguel/projeto-conta-bancaria"); 
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione ENTER para continuar...\n");
    read.prompt();
}

main();