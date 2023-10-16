import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from '../../assets/logo.svg'
import * as Dialog from "@radix-ui/react-dialog";

import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />

                <Dialog.Root>
               <Dialog.Trigger asChild>
               <NewTransactionButton>Nova transação</NewTransactionButton>
               </Dialog.Trigger>

               <NewTransactionModal/>
                </Dialog.Root>

            </HeaderContent>
        </HeaderContainer>

    )
}

//as child é necessário pois o trigger é um botão, e utilizando a prop asChild aproveita o elemento, o botão que ja está na tela(NewTransactionButton) como sendo o trigger do modal.

//Dialog>>> radix-ui biblioteca externa para modal.