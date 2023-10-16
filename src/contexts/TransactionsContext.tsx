import {ReactNode, useEffect, useState, useCallback} from 'react'
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

interface Transaction{
    id: number;
    description:string;
    type:'income' | 'outcome';
    price:number;
    category: string;
    createdAt:string;
    }

    interface CreateTransactionInput {
        description: string,
        price:number,
        category: string,
        type:'income' | 'outcome'
    }

interface TransactionContextType{
transactions: Transaction[]
fetchTransactions:(query?:string)=> Promise<void>;
createTransaction:(data:CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps{
    children: ReactNode;
}



 export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions]= useState<Transaction[]>([])

    //utilizando a api, temos que utilizar o useEffect para a api ser renderizada apenas uma vez na aplicação (array de dependecias vazio => a função do useEffect renderiza apenas uma vez) FETCH é uma promise

   const fetchTransactions= useCallback(async (query?:string)=>{
    const response = await api.get('/transactions',{
    params:{
        _sort: 'createdAt',
        _order: 'desc',
        q:query,
    }
    })

     setTransactions(response.data)
      },[])

      const createTransaction = useCallback(async(data:CreateTransactionInput )=>{
        const{description, price, category, type} = data;

        const response = await api.post('/transactions',{description, price, category, type, createdAt: new Date(),

            //a mesma coisa de:
          // description:data.description,
          // categoty: data.category,
          // price:data.price,
          // type:data.type,
           })
          setTransactions(state=>[response.data,...state ])
      },[])

useEffect(()=>{
fetchTransactions()
},[fetchTransactions])

    return(
        <TransactionsContext.Provider value ={{transactions, fetchTransactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}