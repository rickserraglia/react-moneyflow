import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	CloseButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton
} from './styles';
import { TransactionsContext } from '../../contexts/TransactionContext';
import { useContext } from 'react';

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	type: z.enum(['income', 'outcome'])
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
	const { createTransaction } = useContext(TransactionsContext);

	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset
	} = useForm<NewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema)
	});

	const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
		const { description, price, category, type } = data;

		await createTransaction({
			description,
			price,
			category,
			type
		});

		reset();
	};

	return (
		<Dialog.Portal>
			<Overlay />
			<Content>
				<Dialog.Title>Nova Transação</Dialog.Title>

				<CloseButton>
					<X size={24} />
				</CloseButton>

				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register('description')}
					/>
					<input
						type="number"
						placeholder="Valor"
						required
						{...register('price', { valueAsNumber: true })}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register('category')}
					/>

					<Controller
						control={control}
						name="type"
						render={({ field }) => {
							return (
								<TransactionType
									onValueChange={field.onChange}
									value={field.value}
								>
									<TransactionTypeButton variant="income" value="income">
										<ArrowCircleUp size={24} /> Entrada
									</TransactionTypeButton>
									<TransactionTypeButton variant="outcome" value="outcome">
										<ArrowCircleDown size={24} /> Saída
									</TransactionTypeButton>
								</TransactionType>
							);
						}}
					/>

					<button type="submit" disabled={isSubmitting}>
						Cadastrar
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	);
};
