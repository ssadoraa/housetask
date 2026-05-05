'use server'

import { createClient } from "@/lib/supabase/server"
import { Task } from "@/types/task"
import { revalidatePath } from "next/cache"

export async function createTask(formData: FormData) {
	const supabase = await createClient()

	const title = formData.get('title')
	const user = formData.get('user')

	if (typeof title !== 'string' || typeof user !== 'string') {
		throw new Error('Campos inválidos')
	}

	const task: Task = {title, user, created_at: new Date().toISOString(),}

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