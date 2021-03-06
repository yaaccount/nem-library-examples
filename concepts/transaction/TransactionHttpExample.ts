import {
    AccountHttp, NEMLibrary, NetworkTypes, Address, Account, TransferTransaction, TimeWindow,
    EmptyMessage, MultisigTransaction, PublicAccount, TransactionHttp, SignedTransaction
} from "nem-library";
import {XEM} from "nem-library/dist/src/models/asset/XEM";
declare let process: any;

// Initialize NEMLibrary for TEST_NET Network
NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

const privateKey: string = process.env.PRIVATE_KEY;
const multisigAccountPublicKey: string = process.env.MULTISIG_PUBLIC_KEY;

const cosignerAccount = Account.createWithPrivateKey(privateKey);

const transferTransaction = TransferTransaction.create(
    TimeWindow.createWithDeadline(),
    new Address("TCFFOM-Q2SBX7-7E2FZC-3VX43Z-TRV4ZN-TXTCGW-BM5J"),
    new XEM(2),
    EmptyMessage
);

const multisigTransaction = MultisigTransaction.create(
    TimeWindow.createWithDeadline(),
    transferTransaction,
    PublicAccount.createWithPublicKey(multisigAccountPublicKey)
);

const transactionHttp = new TransactionHttp();

const signedTransaction: SignedTransaction = cosignerAccount.signTransaction(multisigTransaction);

transactionHttp.announceTransaction(signedTransaction).subscribe( x => console.log(x));