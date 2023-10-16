import { useForm } from "react-hook-form";
import { SerchFormContainer } from "./styles";

import {MagnifyingGlass} from 'phosphor-react'

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {useContextSelector} from 'use-context-selector'
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
    query: z.string(),
})

//retorna qual a tipagem dos campos do form
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm(){
const fetchTransactions = useContextSelector(TransactionsContext,(context)=>{
    return context.fetchTransactions
})

const {register, handleSubmit, formState:{ isSubmitting }} = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
})

async function handleSearchTransactions(data: SearchFormInputs){

await fetchTransactions(data.query)
}

    return(
        <SerchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input type="text" placeholder="Busque por transações" 
            {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SerchFormContainer>
    )
}