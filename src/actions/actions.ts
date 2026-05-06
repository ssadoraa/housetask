'use server'

import { createClient } from "@/lib/supabase/server"
import { Task } from "@/types/task"
import { revalidatePath } from "next/cache"

export async function createTask(formData: FormData) {
	const supabase = await createClient()

	const title = formData.get('title')
	const user = formData.get('user')
	const currentDateTime = open 
		? new Date().toLocaleString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}) 
		: "";

	if (typeof title !== 'string' || typeof user !== 'string') {
		throw new Error('Campos inválidos')
	}

	const task: Task = {title, user, created_at: currentDateTime }

	const { error } = await supabase
		.from('tasks')
		.insert([task])

	if (error) {
		throw new Error(error.message)
	}

	revalidatePath('/')
}

export async function deleteTask(id: string) {
	const supabase = await createClient()

	if (!id) {
		throw new Error('ID inválido')
	}

	const { error } = await supabase
		.from('tasks')
		.delete()
		.eq('id', id)

	if (error) {
		throw new Error(error.message)
	}

	revalidatePath('/')
}